var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var box2d = {
    b2Vec2: Box2D.Common.Math.b2Vec2,
    b2BodyDef: Box2D.Dynamics.b2BodyDef,
    b2Body: Box2D.Dynamics.b2Body,
    b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
    b2Fixture: Box2D.Dynamics.b2Fixture,
    b2World: Box2D.Dynamics.b2World,
    b2MassData: Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
    b2RevoluteJointDef: Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2DebugDraw: Box2D.Dynamics.b2DebugDraw,
    b2Contact: Box2D.Dynamics.Contacts,
    b2ContactListener: Box2D.Dynamics.b2ContactListener
};
var SCALE = 30;
var Vec2 = box2d.b2Vec2;
function clone_nnm(nn) {
    return {
        weights: nn.weights,
        biases: nn.biases,
        layer_sizes: nn.layer_sizes,
        layers: nn.layers,
        non_activated_layers: nn.non_activated_layers,
        identity_biases: nn.identity_biases
    };
}
function clone_sm(model) {
    return {
        generations: model.generations,
        current_generation_index: model.current_generation_index,
        population_size: model.population_size,
        layer_sizes: model.layer_sizes,
        world: model.world,
        scene: model.scene
    };
}
function range(size, startAt) {
    if (startAt === void 0) { startAt = 0; }
    return __spread(Array(size).keys()).map(function (i) { return i + startAt; });
}
function len(array) {
    return array.length;
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}
function rad_to_deg(value) {
    // 1 pi rad = 180 deg
    // x rad = (180 / pi) * x
    return value * (180 / Math.PI);
}
function deg_to_rad(value) {
    // 180 deg = 1 pi rad
    // x deg = (1 pi / 180) * x
    return (Math.PI / 180) * value;
}
function prepare_world(scene) {
    // world
    var world = new box2d.b2World(new Vec2(0, 0), true);
    // debug draw
    var debug_draw = new box2d.b2DebugDraw();
    debug_draw.SetSprite(document.getElementById("debug").getContext('2d'));
    debug_draw.SetDrawScale(SCALE);
    debug_draw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debug_draw);
    // contact listener
    var contact_listener = new box2d.b2ContactListener();
    contact_listener.BeginContact = function (c) {
        var a = JSON.parse(c.GetFixtureA().GetUserData());
        var b = JSON.parse(c.GetFixtureB().GetUserData());
        if (a["type"] == "car" && b["type"] == "track") {
            var car = sm.generations[a["generation_index"]].cars[a["car_index"]];
            // console.log(a["generation_index"], a["car_index"]);
            mark_car_for_destruction(car);
        }
        // if ()
        // 	remove_car_from_world(sm, c);
    };
    // contact_listener.EndContact = function(c) {
    // };
    world.SetContactListener(contact_listener);
    // road track
    var road_tracks_left = {
        h: 70,
        w: 2,
        relative_position: [0, 0],
        scene: scene,
        world: world
    };
    road_tracks_left = add_road_track_segment(road_tracks_left, [100, 415], deg_to_rad(0));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-7, 2], deg_to_rad(-10));
    road_tracks_left = add_road_track_segment(road_tracks_left, [5, 2], deg_to_rad(10));
    road_tracks_left = add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(20));
    road_tracks_left = add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(10));
    road_tracks_left = add_road_track_segment(road_tracks_left, [5, 5], deg_to_rad(-10));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-33, 7], deg_to_rad(-20));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-63, 20], deg_to_rad(-40));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-94, 41], deg_to_rad(-50));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-75, 30], deg_to_rad(-20));
    road_tracks_left = add_road_track_segment(road_tracks_left, [-19, 7], deg_to_rad(0));
    road_tracks_left = add_road_track_segment(road_tracks_left, [28, 7], deg_to_rad(20));
    road_tracks_left = add_road_track_segment(road_tracks_left, [63, 15], deg_to_rad(30));
    road_tracks_left = add_road_track_segment(road_tracks_left, [88, 31], deg_to_rad(45));
    road_tracks_left = add_road_track_segment(road_tracks_left, [105, 55], deg_to_rad(55));
    var road_tracks_right = {
        h: 70,
        w: 2,
        relative_position: [0, 0],
        scene: scene,
        world: world
    };
    road_tracks_right = add_road_track_segment(road_tracks_right, [270, 415], deg_to_rad(0));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-7, 2], deg_to_rad(-10));
    road_tracks_right = add_road_track_segment(road_tracks_right, [5, 2], deg_to_rad(10));
    road_tracks_right = add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(20));
    road_tracks_right = add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(10));
    road_tracks_right = add_road_track_segment(road_tracks_right, [5, 5], deg_to_rad(-10));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-33, 7], deg_to_rad(-20));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-63, 20], deg_to_rad(-40));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-94, 41], deg_to_rad(-50));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-75, 30], deg_to_rad(-20));
    road_tracks_right = add_road_track_segment(road_tracks_right, [-19, 7], deg_to_rad(0));
    road_tracks_right = add_road_track_segment(road_tracks_right, [28, 7], deg_to_rad(20));
    road_tracks_right = add_road_track_segment(road_tracks_right, [73, 21], deg_to_rad(40));
    road_tracks_right = add_road_track_segment(road_tracks_right, [105, 47], deg_to_rad(55));
    return world;
}
function tan_h(x) {
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
function tan_h_prime(x) {
    return 1 - Math.pow(sigmoid(x), 2);
}
function relu(x) {
    return nj.log(1 + Math.exp(x));
}
function relu_prime(x) {
    return Math.exp(x) / (1 + Math.exp(x));
}
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function sigmoid_prime(x) {
    return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}
// imperative
function random_weights(layer_sizes) {
    var weights = [];
    var i;
    for (i in range(len(layer_sizes))) {
        // skip the first layer, as it has no previous layer
        if (i != 0) {
            weights.push(nj.random(layer_sizes[i - 1], layer_sizes[i]).tolist());
        }
    }
    return weights;
}
function random_biases(layer_sizes) {
    var biases = [];
    var i;
    for (i in range(len(layer_sizes))) {
        // skip the first layer, as it has no previous layer
        if (i != 0)
            biases.push(nj.random(1, layer_sizes[i]).tolist());
    }
    return biases;
}
// functional
function activate(x) {
    for (var i = 0; i < x.selection.data.length; i++) {
        x.selection.data[i] = sigmoid(x.selection.data[i]);
    }
    return x;
}
function activate_prime(x) {
    return sigmoid_prime(x);
}
// get a specific layer
function layer(i, model) {
    return nj.array(model.layers[i]).tolist();
}
// get weights between i and i + 1 layer
function layer_weights(i, model) {
    return nj.array(model.weights[i]).tolist();
}
// get biases of i layer
function layer_biases(i, model) {
    // offset of -1 since there is no bias for index layer
    return nj.array(model.biases[i - 1]).tolist();
}
// get a specific non-activated version of a layer with index i
function non_activated_layer(i, model) {
    // since there's no input layer, index has offset of -1
    return nj.array(model.non_activated_layers[i - 1]).tolist();
}
// simply get the last layer
function last_layer(model) {
    var output_layer_index = number_of_layers(model) - 1;
    return nj.array(layer(output_layer_index, model)).tolist();
}
// simply get the last non-activated layer
function last_non_activated_layer(model) {
    var output_layer_index = number_of_layers(model) - 1;
    var last_non_activated_layer = [];
    var i;
    for (i in range(number_of_layers(model)))
        last_non_activated_layer.push(layer(i, model));
    return nj.array(non_activated_layer(output_layer_index, model)).tolist();
}
// imperative
function identity(n, m) {
    var matrix = [];
    // generate row
    var row = [];
    var j;
    for (j in range(m))
        row.push(1);
    // add the rows to the matrix
    var i;
    for (i in range(n))
        matrix.push(row);
    return nj.array(matrix).tolist();
}
function previous_layer(i, model) {
    layer(i - 1, model);
}
function number_of_layers(model) {
    return len(model.layer_sizes);
}
function number_of_input_layers(model) {
    return len(model.layers[0]);
}
// get output layer from input layer
function output_layer(input_layer, model) {
    var new_model = clone_nnm(model);
    new_model.layers = [input_layer];
    return last_layer(forward_propagate(new_model));
}
// function insert_input_layer(input_layer, model) {
//     var new_model = model;
//     new_model.layers = [ input_layer ];
//     return new_model;
// }
// forward propagation to a new layer of index i based on the previous layer
function forward_propagate_step(i, model) {
    var output_layer_index = number_of_layers(model) - 1;
    var previous_layer = layer(i - 1, model);
    // weights between previous layer and current layer
    var weights = layer_weights(i - 1, model);
    // biases of current layer
    var biases = layer_biases(i, model);
    var non_activated_new_layer = nj.add(nj.dot(previous_layer, weights), nj.dot(nj.array(model.identity_biases).T, biases));
    var new_layer = activate(non_activated_new_layer);
    var new_model = clone_nnm(model);
    new_model.layers.push(new_layer);
    new_model.non_activated_layers.push(non_activated_new_layer);
    if (i != output_layer_index)
        return forward_propagate_step(i + 1, new_model);
    else
        return new_model;
}
function forward_propagate(model) {
    var new_model = clone_nnm(model);
    new_model.layers = [model.layers[0]];
    new_model.non_activated_layers = [];
    if (new_model.identity_biases === undefined)
        new_model.identity_biases = identity(1, number_of_input_layers(new_model));
    return forward_propagate_step(1, new_model);
}
// randomly mutate the weights and biases of a NN based on the amount
function mutate(nn, amount) {
    // weights
    var new_weights = [];
    // i -> matrix representing weights between 2 layers
    for (var i in range(len(nn.weights))) {
        new_weights.push([]);
        var size_y = len(nn.weights[i]);
        var size_x = len(nn.weights[i][0]);
        for (var j in range(size_y)) {
            new_weights[i].push([]);
            for (var k in range(size_x)) {
                new_weights[i][j].push([]);
                var random_variation = nn.weights[i][j][k] * amount;
                var r = random(-random_variation, random_variation);
                new_weights[i][j][k] = nn.weights[i][j][k] + r;
            }
        }
    }
    var new_biases = [];
    for (var i in range(len(nn.biases))) {
        new_biases.push([[]]);
        var size = len(nn.biases[i][0]);
        for (var j in range(size)) {
            var random_variation = nn.biases[i][0][j] * amount;
            var r = random(-random_variation, random_variation);
            new_biases[i][0].push(nn.biases[i][0][j] + r);
        }
    }
    var new_nn = clone_nnm(nn);
    new_nn.weights = new_weights;
    new_nn.biases = new_biases;
    return new_nn;
}
// spawn the first generation randomly
function initialize_evolution(model) {
    var new_model = clone_sm(model);
    var first_gen = {
        cars: []
    };
    new_model.generations.push(first_gen);
    // populate the generation
    for (var i in range(model.population_size)) {
        first_gen.cars.push(create_car(model));
    }
    return new_model;
}
function fitness(distance, avg_speed) {
    return distance * avg_speed;
}
function last_generation(model) {
    return model.generations[len(model.generations) - 1];
}
// function breed_generation(model: SimulationModel): SimulationModel {
// 	const selection_count: number = 6;
// 	const mutation_rate: number = 0.2;
// 	// natural selection
// 	model = best_fit_select(model, selection_count);
// 	// cross over to fill the vacant spots
// 	let lg = last_generation(model);
// 	while (len(lg) != model.population_size) {
// 		var random_nn_a = lg[
// 			Math.floor(
// 				Math.random() * lg.length)];
// 		var random_nn_b = lg[
// 			Math.floor(
// 				Math.random() * lg.length)];
// 		lg.push(
// 			crossover(
// 				random_nn_a, random_nn_b));
// 	}
// 	model.generations[len(model.generations)] = lg;
// 	// mutate the neural networks
// 	for (var i = 0; i < len(lg); i++) {
// 		model.generations[len(model.generations) - 1][i] = mutate(model.generations[len(model.generations) - 1][i], mutation_rate);
// 	}
// 	return model;
// }
function get_car(model, index) {
    return model.generations[index[0]][index[1]];
}
// function increment(model: SimulationModel, index: number) {
// 	let current_generation_index = index[0];
// 	let current_individual_index = index[1];
// 	let new_generation_index = current_generation_index;
// 	let new_individual_index = current_individual_index;
// 	if (current_individual_index == model.population_size - 1) {
// 		new_generation_index = current_generation_index + 1;
// 		new_individual_index = 0;
// 	} else {
// 		new_individual_index++;
// 	}
// 	return [new_generation_index, new_individual_index];
// }
// function set_fitness(model: SimulationModel, index: number[], value: number): SimulationModel {
// 	let new_model = clone_sm(model);
// 	new_model.generations[index[0]][index[1]].fitness = value;
// 	return new_model;
// }
// takes two parents and generates a child
// function crossover(parent_a, parent_b) {
// 	// weights
// 	new_weights = [];
// 	// i -> matrix representing weights between 2 layers
// 	for (var i in range(len(parent_a.weights))) {
// 		new_weights.push([]);
// 		let size_y = len(parent_a.weights[i]);
// 		let size_x = len(parent_a.weights[i][0]);
// 		for (var j in range(size_y)) {
// 			new_weights[i].push([]);
// 			for (var k in range(size_x)) {
// 				new_weights[i][j].push([]);
// 				if (Math.round(random(0, 0)) == 0)
// 					new_weights[i][j][k] = parent_a.weights[i][j][k];
// 				else
// 					new_weights[i][j][k] = parent_b.weights[i][j][k];
// 			}
// 		}
// 	}
// 	// TODO: Biases
// 	// child
// 	let child = new NeuralNetwork(
// 		weights = new_weights,
// 		biases = parent_a.biases,
// 		layer_sizes = parent_a.layer_sizes,
// 		layers = []
// 		);
// 	child.fitness = undefined;
// 	return child;
// }
// function best_fit_select(model, quantity) {
// 	let individuals = last_generation(model);
// 	individuals.sort(function(a, b){
// 		return b.fitness - a.fitness;
// 	});
// 	let selected_individuals = individuals.splice(0, quantity);
// 	model.generations[len(model.generations) - 1] = selected_individuals;
// 	return model;
// }
// function test_result(value, fail_message) {
// 	if (value == 1)
// 		return ".";
// 	else
// 		return fail_message;
// }
// // zero cost
// function test_cost_is_zero(value) {
// 	if (value == 0)
// 		return 1;
// 	else
// 		return 0;
// }
// // non-zero cost
// function test_cost_is_x(value, x) {
// 	if (value == x)
// 		return 1;
// 	else
// 		return 0;
// }
// function test_random_weights_is_5_by_6(result) {
// 	var n = len(result[0]);
// 	var m = len(result[0][0]);
// 	if (n == 5 && m == 6)
// 		return 1;
// 	else
// 		return 0;
// }
// function test_random_biases_is_1_by_6(result) {
// 	var n = len(result[0]);
// 	var m = len(result[0][0]);
// 	if (n == 1 && m == 6)
// 		return 1;
// 	else
// 		return 0;
// }
// function test_output_layer_is_1_by_3(result) {
// 	var n = len(result);
// 	var m = len(result[0]);
// 	if (n == 1 && m == 3)
// 		return 1;
// 	else
// 		return 0;
// }
// function test_mutation(init_model, mutated) {
// 	let difference =
// 		nj.sum(
// 			nj.subtract(
// 				init_model.weights, mutated.weights));
// 	if (difference == 0)
// 		return 0;
// 	else
// 		return 1;
// }
// // zero cost
// // var ZERO_COST = cost(
// // 	nj.array([1, 0]).tolist(), nj.array([1, 0]).tolist());
// // console.log(
// // 	test_result(
// // 		test_cost_is_zero(ZERO_COST), "Cost should have been zero."));
// // // non-zero cost = 0.6348
// // var NON_ZERO_COST = cost(
// // 	nj.array([0.9, 0.64, 0.6, 0.3]).tolist(), nj.array([1, 0, 0, 1]).tolist());
// // console.log(
// // 	test_result(
// // 		test_cost_is_x(NON_ZERO_COST, 0.6348), "Cost should have been 0.6348."));
// // random_weights generate n x m matrix
// var weights =
// 	random_weights([5, 6]);
// console.log(
// 	test_result(
// 		test_random_weights_is_5_by_6(weights), "Random weights should be 5 x 6"));
// // random_biases generate 1 x n matrix
// var biases =
// 	random_biases([5, 6]);
// console.log(
// 	test_result(
// 		test_random_biases_is_1_by_6(biases), "Random biases be 1 x 6"));
// // output_layer generate 1 x n matrix
// var input_layer =
// 	nj.array(
// 		[[1, 1]]);
// var layer_sizes = [2, 3];
// var init_model =
//     new NeuralNetwork(
//         weights = random_weights(layer_sizes),
//         biases = random_biases(layer_sizes),
//         layer_sizes = layer_sizes);
// var output_layer =
// 	output_layer(input_layer, init_model);
// console.log(
// 	test_result(
// 		test_output_layer_is_1_by_3(output_layer), "Output layer be 1 x 3"));
// // mutation at least changing values
// var mutated = mutate(init_model, 0.1);
// console.log(
// 	test_result(
// 		test_mutation(init_model, mutated),
// 		"Mutation isn't changing anything!"));
// // cross over
// // var parent_a =
// //     new NeuralNetwork(
// //         weights = random_weights(layer_sizes),
// //         biases = random_biases(layer_sizes),
// //         layer_sizes = layer_sizes);
// // var parent_b =
// //     new NeuralNetwork(
// //         weights = random_weights(layer_sizes),
// //         biases = random_biases(layer_sizes),
// //         layer_sizes = layer_sizes);
// // console.log(parent_a.weights);
// // console.log(parent_b.weights);
// // console.log(crossover(parent_a, parent_b).weights);
// // best fit select
// evolution_model = initialize_evolution(
// 	new Evolution(
// 		generations = [],
// 		population_size = 10,
// 		layer_sizes = [3, 10, 10, 3]));
// // let fitness_values = [
// // 	1,
// // 	5,
// // 	9
// // 	1,
// // 	10,
// // 	7,
// // 	6,
// // 	6,
// // 	8,
// // 	2];
// // console.log(
// // 	best_fit_select(last_generation(evolution_model), fitness_values, 3));
// // console.log(clone(evolution_model));
function create() {
    var starting_time = this.time.now;
    // setup input
    cursors = this.input.keyboard.createCursorKeys();
    // let distance_text: any = this.add.text(5, 20, "Distance: 0");
    // let speed_text: any = this.add.text(5, 50, "Speed: 0");
    // let current_generation_text: any = this.add.text(5, 70, "Generation: 0");
    // let current_individual_text: any = this.add.text(5, 70, "Individual: 0");
    // let sensors_text: any = this.add.text(5, 70, "Sensors: 0");
    // let steering_text: any = this.add.text(5, 70, "Steering: ");
    // TODO: add initial generation
    sm = initialize_evolution(sm);
    // let car: Car = sm.generations[0].cars[0];
    // let car2: Car = sm.generations[0].cars[1];
    var lg = last_generation(sm);
    lg.cars.forEach(function (car) {
        add_car_to_world(sm, car);
        add_car_to_scene(sm, car);
    });
    // add_car_to_world(sm, car2);
    // add_car_to_scene(sm, car2);
}
var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: 30
};
var PVec2 = Phaser.Math.Vector2;
var sm;
var game = new Phaser.Game(config);
var cursors;
var category = {
    car: 0x0001,
    track: 0x0002
};
var mask = {
    car: category.track,
    track: category.car
};
var dq = {
    queue: []
};
// var ground_width = 700, ground_height = 15;
// var ball_view, car_view;
// var world, ball, ground, car_body, front_axle, rear_axle, right_sensor;
// var current_individual_index = [0, 0];
// var starting_time;
function gameover(scene, time) {
    scene.scene.restart();
    // 	let average_speed = total_distance / ((scene.time.now - starting_time) / 1000);
    // 	let fitness_value = total_distance * average_speed;
    // 	console.log(fitness_value);
    // 	model = set_fitness(fitness_value, current_individual_index, model);
    // 	current_individual_index = increment(current_individual_index, model);
    // 	// next individual is the first one from new generation
    // 	if (current_individual_index[0] != 0 && current_individual_index[1] == 0) {
    // 		model = new_generation(model);
    // 		console.log("New generation!");
    // 		console.log(model);
    // 		// scene.scene.stop();
    // 		return;
    // 	}
    // 	current_individual = get_individual(current_individual_index, model);
}
function preload() {
    // images
    this.load.image('car', 'assets/car.png');
    this.load.image('ball', 'assets/ball.png');
    // create the simulation model
    sm = {
        generations: [],
        current_generation_index: 0,
        population_size: 1,
        layer_sizes: [3, 5, 3, 2],
        world: prepare_world(this),
        scene: this
    };
}
function update(time, delta) {
    // process destruction queue
    if (len(dq.queue) != 0) {
        dq.queue.forEach(function (car) {
            remove_car_from_world(sm, car);
        });
        dq.queue = [];
    }
    sm.world.Step(1 / 30, delta, delta);
    sm.world.DrawDebugData();
    sm.world.ClearForces();
    var lg = last_generation(sm);
    lg.cars.forEach(function (car) {
        step_car(sm, car, delta);
    });
    // 	lsv = 0, csv = 0, rsv = 0;
    // 	let ray_left_p1 =
    // 		new Vec2(
    // 			(left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
    // 			(left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    // 	let ray_left_p2 =
    // 		new Vec2(
    // 			(left_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
    // 			(left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    // 	let ray_right_p1 =
    // 		new Vec2(
    // 			(right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
    // 			(right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    // 	let ray_right_p2 =
    // 		new Vec2(
    // 			(right_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
    // 			(right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    // 	let ray_center_p1 =
    // 		new Vec2(
    // 			(center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
    // 			(center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    // 	let ray_center_p2 =
    // 		new Vec2(
    // 			(center_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
    // 			(center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    // 	ray_left_view.setTo(
    // 		ray_left_p1.x * SCALE,
    // 		ray_left_p1.y * SCALE,
    // 		ray_left_p2.x * SCALE,
    // 		ray_left_p2.y * SCALE);
    // 	ray_right_view.setTo(
    // 		ray_right_p1.x * SCALE,
    // 		ray_right_p1.y * SCALE,
    // 		ray_right_p2.x * SCALE,
    // 		ray_right_p2.y * SCALE);
    // 	ray_center_view.setTo(
    // 		ray_center_p1.x * SCALE,
    // 		ray_center_p1.y * SCALE,
    // 		ray_center_p2.x * SCALE,
    // 		ray_center_p2.y * SCALE);
    // 	// raycast
    // 	world.RayCast(
    // 		function(f, p, n, fr){
    // 			// console.log(f.GetUserData(), fr);
    // 			if (f.GetUserData() == "track") {
    // 				lsv = Math.round((1 - fr) * 100) / 100;
    // 			}
    // 			return 0;
    // 		},
    // 		ray_left_p1,
    // 		ray_left_p2);
    // 	world.RayCast(
    // 		function(f, p, n, fr){
    // 			if (f.GetUserData() == "track") {
    // 				rsv = Math.round((1 - fr) * 100) / 100;
    // 			}
    // 			return 0;
    // 		},
    // 		ray_right_p1,
    // 		ray_right_p2);
    // 	world.RayCast(
    // 		function(f, p, n, fr){
    // 			// console.log(f.GetUserData(), fr);
    // 			if (f.GetUserData() == "track") {
    // 				csv = Math.round((1 - fr) * 100) / 100;
    // 			}
    // 			return 0;
    // 		},
    // 		ray_center_p1,
    // 		ray_center_p2);
    // 	if (lsv == 0)
    // 		ray_left_view.strokeColor = 0x00ff00;
    // 	else
    // 		ray_left_view.strokeColor = 0xff0000;
    // 	if (rsv == 0)
    // 		ray_right_view.strokeColor = 0x00ff00;
    // 	else
    // 		ray_right_view.strokeColor = 0xff0000;
    // 	if (csv == 0)
    // 		ray_center_view.strokeColor = 0x00ff00;
    // 	else
    // 		ray_center_view.strokeColor = 0xff0000;
    // 	let speed =
    // 		Math.round(
    // 			((Phaser.Math.Distance.Between(
    // 				previous_position[0],
    // 				previous_position[1],
    // 				car.x,
    // 				car.y) / (delta / 1000)) / SCALE) * 10) / 10;
    // 	total_distance += Phaser.Math.Distance.Between(
    // 		previous_position[0],
    // 		previous_position[1],
    // 		car.x,
    // 		car.y) / SCALE;
    // 	speed_text.setText("Speed: " + speed + " m/s");
    // 	distance_text.setText("Distance: " + Math.round(total_distance) + " m");
    // 	current_generation_text.setText("Generation: " + current_individual_index[0]);
    // 	current_individual_text.setText("Individual: " + current_individual_index[1]);
    // 	previous_position = [car.x, car.y];
    // 	// camera
    // this.cameras.main.setScroll(car_body.GetPosition().x * SCALE - 300, car_body.GetPosition().y * SCALE - 300);
    // 	// keep text position fixed
    // 	speed_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 20);
    // 	distance_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 50);
    // 	current_generation_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 70);
    // 	current_individual_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 90);
    // 	// neural network
    // 	// var lsv = 0, rsv = 0, csv = 0;
    // 	// if (left_sensor_intersections >= 1)
    // 	// 	lsv = 1;
    // 	// if (right_sensor_intersections >= 1)
    // 	// 	rsv = 1;
    // 	// if (center_sensor_intersections >= 1)
    // 	// 	csv = 1;
    // 	sensors_text.setText("Sensors: " + lsv + ", " + csv + ", " + rsv);
    // 	sensors_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 110);
    // 	var input_layer = [
    // 		[lsv, csv, rsv]
    // 	];
    // 	var output = output_layer(input_layer, current_individual);
    // 	var output_non_activated =
    // 		last_non_activated_layer(
    // 			forward_propagate(current_individual));
    // 	let steering: number = (0.8 - output_non_activated[0][1]);
    // 	// var steering = 0;
    // 	// var acceleration = 1;
    // 	// if (output[0][0] - output[0][1] >= 0.01) {
    // 	// 	steering = -1;
    // 	// 	// steering_text.setText("Steering: Left");
    // 	// } else if (output[0][1] - output[0][0] >= 0.01) {
    // 	// 	steering = 1;
    // 	// 	// steering_text.setText("Steering: Right");
    // 	// }
    // 	steering_text.setText("Output: " + Math.round(output[0][0] * 100) / 100 + ", " + Math.round(steering * 100) / 100);
    // 	steering_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 130);
    // 	// if (output[0][2] >= 0.5)
    // 	// 	acceleration = 1;
    // 	// console.log(output[0][0]);
    // 	// console.log(output[0][1]);
    // 	// console.log(output[0][2]);
    // 	// physics
    // 	world.Step(1 / 30, delta, delta);
    // 	world.DrawDebugData();
    // 	world.ClearForces();
    // 	// wheel views
    // 	front_axle_view.rotation = front_axle.GetAngle() - car_body.GetAngle();
    // 	// ball view
    // 	ball_view.x = ball.GetPosition().x * SCALE;
    // 	ball_view.y = ball.GetPosition().y * SCALE;
    // 	ball_view.setAngle(rad_to_deg(ball.GetAngle()));
    // 	// car view
    // 	car.x = car_body.GetPosition().x * SCALE;
    // 	car.y = car_body.GetPosition().y * SCALE;
    // 	car.setRotation(car_body.GetAngle());
    // 	// setup input
    // 	cursors = this.input.keyboard.createCursorKeys();
    // 	// movement
    // 	acceration_force = 30;
    // 	// if (cursors.up.isDown) {
    // 	// 	front_axle.ApplyForce(
    // 	// 		new Vec2(
    // 	// 			Math.sin(front_axle.GetAngle()) * acceration_force,
    // 	// 			-Math.cos(front_axle.GetAngle()) * acceration_force
    // 	// 		),
    // 	// 		front_axle.GetWorldCenter()
    // 	// 	);
    // 	// } else if (cursors.down.isDown) {
    // 	// 	front_axle.ApplyForce(
    // 	// 		new Vec2(
    // 	// 			-Math.sin(front_axle.GetAngle()) * acceration_force,
    // 	// 			Math.cos(front_axle.GetAngle()) * acceration_force
    // 	// 		),
    // 	// 		front_axle.GetWorldCenter()
    // 	// 	);
    // 	// } else {
    // 	// }
    // 	front_axle.ApplyForce(
    // 			new Vec2(
    // 				Math.sin(front_axle.GetAngle()) * output[0][0] * acceration_force,
    // 				-Math.cos(front_axle.GetAngle()) * output[0][0] * acceration_force
    // 			),
    // 			front_axle.GetWorldCenter()
    // 		);
    // 	// steering
    // 	torque = 0.3;
    // 	// if (cursors.left.isDown) {
    // 	// 	front_axle_joint.SetMotorSpeed(-torque);
    // 	// } else if (cursors.right.isDown) {
    // 	// 	front_axle_joint.SetMotorSpeed(torque);
    // 	// } else if (output_non_activated[0][1] == 0) {
    // 	// 	if (front_axle_joint.GetJointAngle() != 0) {
    // 	// 		if (front_axle_joint.GetJointAngle() > 0)
    // 	// 			front_axle_joint.SetMotorSpeed(-torque);
    // 	// 		else
    // 	// 			front_axle_joint.SetMotorSpeed(torque);
    // 	// 	}
    // 	// }
    // 	front_axle_joint.SetMotorSpeed(steering);
}
function add_car_to_world(model, car) {
    // car body
    var car_body_shape = new box2d.b2PolygonShape();
    car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);
    var car_body_fix_def = new box2d.b2FixtureDef();
    car_body_fix_def.shape = car_body_shape;
    car_body_fix_def.density = 10;
    car_body_fix_def.userData = car.user_data;
    car_body_fix_def.filter.categoryBits = category.car;
    car_body_fix_def.filter.maskBits = mask.car;
    var car_body_def = new box2d.b2BodyDef();
    car_body_def.position = new Vec2(180 / SCALE, 300 / SCALE);
    car_body_def.type = box2d.b2Body.b2_dynamicBody;
    car_body_def.linearDamping = 10;
    car_body_def.angularDamping = 10;
    var car_body = model.world.CreateBody(car_body_def);
    car_body.CreateFixture(car_body_fix_def);
    // front axle
    var front_axle_shape = new box2d.b2PolygonShape();
    front_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);
    var front_axle_fix_def = new box2d.b2FixtureDef();
    front_axle_fix_def.shape = front_axle_shape;
    front_axle_fix_def.density = 1;
    front_axle_fix_def.userData = car.user_data;
    front_axle_fix_def.filter.categoryBits = category.car;
    front_axle_fix_def.filter.maskBits = mask.car;
    var front_axle_wheel_left_shape = new box2d.b2PolygonShape();
    front_axle_wheel_left_shape.SetAsOrientedBox(2 / SCALE, 10 / SCALE, new Vec2(-27 / SCALE, 0 / SCALE));
    var front_axle_wheel_right_shape = new box2d.b2PolygonShape();
    front_axle_wheel_right_shape.SetAsOrientedBox(2 / SCALE, 10 / SCALE, new Vec2(27 / SCALE, 0 / SCALE));
    var front_axle_wheel_left_fix_def = new box2d.b2FixtureDef();
    front_axle_wheel_left_fix_def.shape = front_axle_wheel_left_shape;
    front_axle_wheel_left_fix_def.density = 1;
    front_axle_wheel_left_fix_def.userData = car.user_data;
    front_axle_wheel_left_fix_def.filter.categoryBits = category.car;
    front_axle_wheel_left_fix_def.filter.maskBits = mask.car;
    var front_axle_wheel_right_fix_def = new box2d.b2FixtureDef();
    front_axle_wheel_right_fix_def.shape = front_axle_wheel_right_shape;
    front_axle_wheel_right_fix_def.density = 1;
    front_axle_wheel_right_fix_def.userData = car.user_data;
    front_axle_wheel_right_fix_def.filter.categoryBits = category.car;
    front_axle_wheel_right_fix_def.filter.maskBits = mask.car;
    var front_axle_def = new box2d.b2BodyDef();
    front_axle_def.position = new Vec2(180 / SCALE, 270 / SCALE);
    front_axle_def.type = box2d.b2Body.b2_dynamicBody;
    var front_axle = model.world.CreateBody(front_axle_def);
    front_axle.CreateFixture(front_axle_fix_def);
    front_axle.CreateFixture(front_axle_wheel_left_fix_def);
    front_axle.CreateFixture(front_axle_wheel_right_fix_def);
    // rear axle
    var rear_axle_shape = new box2d.b2PolygonShape();
    rear_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);
    var rear_axle_fix_def = new box2d.b2FixtureDef();
    rear_axle_fix_def.shape = rear_axle_shape;
    rear_axle_fix_def.density = 1;
    rear_axle_fix_def.userData = car.user_data;
    rear_axle_fix_def.filter.categoryBits = category.car;
    rear_axle_fix_def.filter.maskBits = mask.car;
    var rear_axle_wheel_left_shape = new box2d.b2PolygonShape();
    rear_axle_wheel_left_shape.SetAsOrientedBox(2 / SCALE, 10 / SCALE, new Vec2(-27 / SCALE, 0 / SCALE));
    var rear_axle_wheel_right_shape = new box2d.b2PolygonShape();
    rear_axle_wheel_right_shape.SetAsOrientedBox(2 / SCALE, 10 / SCALE, new Vec2(27 / SCALE, 0 / SCALE));
    var rear_axle_wheel_left_fix_def = new box2d.b2FixtureDef();
    rear_axle_wheel_left_fix_def.shape = rear_axle_wheel_left_shape;
    rear_axle_wheel_left_fix_def.density = 1;
    rear_axle_wheel_left_fix_def.userData = car.user_data;
    rear_axle_wheel_left_fix_def.filter.categoryBits = category.car;
    rear_axle_wheel_left_fix_def.filter.maskBits = mask.car;
    var rear_axle_wheel_right_fix_def = new box2d.b2FixtureDef();
    rear_axle_wheel_right_fix_def.shape = rear_axle_wheel_right_shape;
    rear_axle_wheel_right_fix_def.density = 1;
    rear_axle_wheel_right_fix_def.userData = car.user_data;
    rear_axle_wheel_right_fix_def.filter.categoryBits = category.car;
    rear_axle_wheel_right_fix_def.filter.maskBits = mask.car;
    var rear_axle_def = new box2d.b2BodyDef();
    rear_axle_def.position = new Vec2(180 / SCALE, 330 / SCALE);
    rear_axle_def.type = box2d.b2Body.b2_dynamicBody;
    var rear_axle = model.world.CreateBody(rear_axle_def);
    rear_axle.CreateFixture(rear_axle_fix_def);
    rear_axle.CreateFixture(rear_axle_wheel_left_fix_def);
    rear_axle.CreateFixture(rear_axle_wheel_right_fix_def);
    // front axle and car body joint
    var front_axle_and_car_joint_def = new box2d.b2RevoluteJointDef();
    front_axle_and_car_joint_def.Initialize(car_body, front_axle, front_axle.GetPosition());
    front_axle_and_car_joint_def.motorSpeed = 0;
    front_axle_and_car_joint_def.maxMotorTorque = 50;
    front_axle_and_car_joint_def.enableMotor = true;
    front_axle_and_car_joint_def.upperAngle = deg_to_rad(15);
    front_axle_and_car_joint_def.lowerAngle = deg_to_rad(-15);
    front_axle_and_car_joint_def.enableLimit = true;
    var front_axle_joint = model.world.CreateJoint(front_axle_and_car_joint_def);
    // rear axle and car body joint
    var rear_axle_and_car_joint_def = new box2d.b2RevoluteJointDef();
    rear_axle_and_car_joint_def.Initialize(car_body, rear_axle, rear_axle.GetPosition());
    rear_axle_and_car_joint_def.motorSpeed = 2;
    rear_axle_and_car_joint_def.maxMotorTorque = 20;
    rear_axle_and_car_joint_def.enableMotor = false;
    rear_axle_and_car_joint_def.upperAngle = deg_to_rad(0);
    rear_axle_and_car_joint_def.lowerAngle = deg_to_rad(0);
    rear_axle_and_car_joint_def.enableLimit = true;
    var rear_axle_joint = model.world.CreateJoint(rear_axle_and_car_joint_def);
    car.car_body = car_body;
    car.front_axle = front_axle;
    car.rear_axle = rear_axle;
    car.front_axle_joint = front_axle_joint;
}
function add_car_to_scene(model, car) {
    // views
    var car_container = model.scene.add.container(200, 300);
    var front_axle_view = model.scene.add.container(0, -30);
    front_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, 0, 0, 50, 5, 0x00ff00));
    front_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, -27, 0, 5, 20, 0x00ff00));
    front_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, 27, 0, 5, 20, 0x00ff00));
    car_container.add(front_axle_view);
    var rear_axle_view = model.scene.add.container(0, 30);
    rear_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, 0, 0, 50, 5, 0x00ff00));
    rear_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, -27, 0, 5, 20, 0x00ff00));
    rear_axle_view.add(new Phaser.GameObjects.Rectangle(model.scene, 25, 0, 5, 20, 0x00ff00));
    car_container.add(rear_axle_view);
    var car_view = new Phaser.GameObjects.Image(model.scene, 0, 0, 'car');
    car_view.setScale(0.5);
    car_container.add(car_view);
    var ray_left_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
    var ray_right_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
    var ray_center_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
    var left_sensor_bottom_view = new Phaser.GameObjects.Rectangle(model.scene, -20, -57, 0, 0, 0x0000ff);
    left_sensor_bottom_view.setAngle(-32);
    car_container.add(left_sensor_bottom_view);
    var left_sensor_top_view = new Phaser.GameObjects.Rectangle(model.scene, -70, -133, 0, 0, 0x0000ff);
    left_sensor_top_view.setAngle(-32);
    car_container.add(left_sensor_top_view);
    var right_sensor_bottom_view = new Phaser.GameObjects.Rectangle(model.scene, 20, -57, 0, 0, 0x0000ff);
    right_sensor_bottom_view.setAngle(32);
    car_container.add(right_sensor_bottom_view);
    var right_sensor_top_view = new Phaser.GameObjects.Rectangle(model.scene, 70, -133, 0, 0, 0x0000ff);
    right_sensor_top_view.setAngle(32);
    car_container.add(right_sensor_top_view);
    var center_sensor_bottom_view = new Phaser.GameObjects.Rectangle(model.scene, 0, -60, 0, 0, 0x0000ff);
    center_sensor_bottom_view.setAngle(0);
    car_container.add(center_sensor_bottom_view);
    var center_sensor_top_view = new Phaser.GameObjects.Rectangle(model.scene, 0, -170, 0, 0, 0x0000ff);
    center_sensor_top_view.setAngle(0);
    car_container.add(center_sensor_top_view);
    car.car_container = car_container;
    car.front_axle_view = front_axle_view;
    car.rear_axle_view = rear_axle_view;
    car.ray_left_view = ray_left_view;
    car.ray_center_view = ray_center_view;
    car.ray_right_view = ray_right_view;
    car.previous_position = [car_container.x, car_container.y];
    car.total_distance = 0;
    car.left_sensor_bottom_view = left_sensor_bottom_view;
    car.left_sensor_top_view = left_sensor_top_view;
    car.center_sensor_bottom_view = center_sensor_bottom_view;
    car.center_sensor_top_view = center_sensor_top_view;
    car.right_sensor_bottom_view = right_sensor_bottom_view;
    car.right_sensor_top_view = right_sensor_top_view;
}
// @functional
// create bodies, joints, views and add them to the world, and the model.scene
function create_car(model) {
    return {
        nn: {
            weights: random_weights(model.layer_sizes),
            biases: random_biases(model.layer_sizes),
            layer_sizes: model.layer_sizes,
            layers: [],
            non_activated_layers: [],
            identity_biases: undefined
        },
        lsv: 0,
        csv: 0,
        rsv: 0,
        user_data: '{ "type": "car", "generation_index": '
            + (len(model.generations) - 1)
            + ', "car_index": '
            + len(model.generations[(len(model.generations) - 1)].cars) + ' }'
    };
}
function step_car(model, car, delta) {
    car.lsv, car.csv, car.rsv = 0, 0, 0;
    var ray_left_p1 = new Vec2((car.left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_left_p2 = new Vec2((car.left_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    var ray_right_p1 = new Vec2((car.right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_right_p2 = new Vec2((car.right_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    var ray_center_p1 = new Vec2((car.center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_center_p2 = new Vec2((car.center_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    car.ray_left_view.setTo(ray_left_p1.x * SCALE, ray_left_p1.y * SCALE, ray_left_p2.x * SCALE, ray_left_p2.y * SCALE);
    car.ray_right_view.setTo(ray_right_p1.x * SCALE, ray_right_p1.y * SCALE, ray_right_p2.x * SCALE, ray_right_p2.y * SCALE);
    car.ray_center_view.setTo(ray_center_p1.x * SCALE, ray_center_p1.y * SCALE, ray_center_p2.x * SCALE, ray_center_p2.y * SCALE);
    // raycast
    model.world.RayCast(function (f, p, n, fr) {
        // console.log(f.GetUserData(), fr);
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.lsv = Math.round((1 - fr) * 100) / 100;
        }
        return 0;
    }, ray_left_p1, ray_left_p2);
    model.world.RayCast(function (f, p, n, fr) {
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.rsv = Math.round((1 - fr) * 100) / 100;
        }
        return 0;
    }, ray_right_p1, ray_right_p2);
    model.world.RayCast(function (f, p, n, fr) {
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.csv = Math.round((1 - fr) * 100) / 100;
        }
        return 0;
    }, ray_center_p1, ray_center_p2);
    if (car.lsv == 0)
        car.ray_left_view.strokeColor = 0x00ff00;
    else
        car.ray_left_view.strokeColor = 0xff0000;
    if (car.rsv == 0)
        car.ray_right_view.strokeColor = 0x00ff00;
    else
        car.ray_right_view.strokeColor = 0xff0000;
    if (car.csv == 0)
        car.ray_center_view.strokeColor = 0x00ff00;
    else
        car.ray_center_view.strokeColor = 0xff0000;
    var speed = Math.round(((Phaser.Math.Distance.Between(car.previous_position[0], car.previous_position[1], car.car_container.x, car.car_container.y) / (delta / 1000)) / SCALE) * 10) / 10;
    car.total_distance += Phaser.Math.Distance.Between(car.previous_position[0], car.previous_position[1], car.car_container.x, car.car_container.y) / SCALE;
    car.previous_position = [car.car_container.x, car.car_container.y];
    var input_layer = [
        [car.lsv, car.csv, car.rsv]
    ];
    car.nn.layers = [input_layer];
    var forward_propagated_nn = forward_propagate(car.nn);
    var output = last_layer(forward_propagated_nn);
    var output_non_activated = last_non_activated_layer(forward_propagated_nn);
    var steering = (0.8 - output_non_activated[0][1]);
    // steering_text.setText("Output: " + Math.round(output[0][0] * 100) / 100 + ", " + Math.round(steering * 100) / 100);
    // steering_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 130);
    // if (output[0][2] >= 0.5)
    // 	acceleration = 1;
    // console.log(output[0][0]);
    // console.log(output[0][1]);
    // console.log(output[0][2]);
    // wheel views
    car.front_axle_view.rotation = car.front_axle.GetAngle() - car.car_body.GetAngle();
    // car view
    car.car_container.x = car.car_body.GetPosition().x * SCALE;
    car.car_container.y = car.car_body.GetPosition().y * SCALE;
    car.car_container.setRotation(car.car_body.GetAngle());
    // movement
    var acceration_force = 150;
    // if (cursors.up.isDown) {
    // 	front_axle.ApplyForce(
    // 		new Vec2(
    // 			Math.sin(front_axle.GetAngle()) * acceration_force,
    // 			-Math.cos(front_axle.GetAngle()) * acceration_force
    // 		),
    // 		front_axle.GetWorldCenter()
    // 	);
    // } else if (cursors.down.isDown) {
    // 	front_axle.ApplyForce(
    // 		new Vec2(
    // 			-Math.sin(front_axle.GetAngle()) * acceration_force,
    // 			Math.cos(front_axle.GetAngle()) * acceration_force
    // 		),
    // 		front_axle.GetWorldCenter()
    // 	);
    // } else {
    // }
    car.front_axle.ApplyForce(new Vec2(Math.sin(car.front_axle.GetAngle()) * output[0][0] * acceration_force, -Math.cos(car.front_axle.GetAngle()) * output[0][0] * acceration_force), car.front_axle.GetWorldCenter());
    // steering
    var torque = 0.3;
    // if (cursors.left.isDown) {
    // 	front_axle_joint.SetMotorSpeed(-torque);
    // } else if (cursors.right.isDown) {
    // 	front_axle_joint.SetMotorSpeed(torque);
    // } else if (output_non_activated[0][1] == 0) {
    // 	if (front_axle_joint.GetJointAngle() != 0) {
    // 		if (front_axle_joint.GetJointAngle() > 0)
    // 			front_axle_joint.SetMotorSpeed(-torque);
    // 		else
    // 			front_axle_joint.SetMotorSpeed(torque);
    // 	}
    // }
    car.front_axle_joint.SetMotorSpeed(steering);
    return car;
}
function add_car_to_simulation(model, car) {
    var new_model = clone_sm(model);
    new_model.generations[new_model.current_generation_index].cars.push(car);
    return new_model;
}
function remove_car_from_world(model, car) {
    model.world.DestroyBody(car.car_body);
}
function mark_car_for_destruction(car) {
    dq.queue.push(car);
}
function clone_road_track_model(model) {
    return {
        h: model.h,
        w: model.w,
        relative_position: model.relative_position,
        scene: model.scene,
        world: model.world
    };
}
function add_road_track_segment(model, position, angle) {
    var new_model = clone_road_track_model(model);
    new_model.relative_position[0] += position[0];
    new_model.relative_position[1] += position[1];
    var segment_def = new box2d.b2BodyDef();
    segment_def.position = new Vec2(new_model.relative_position[0] / SCALE, new_model.relative_position[1] / SCALE);
    segment_def.angle = angle;
    var segment = model.world.CreateBody(segment_def);
    var segment_fix_def = new box2d.b2FixtureDef();
    segment_fix_def.shape = new box2d.b2PolygonShape();
    segment_fix_def.shape.SetAsBox(new_model.w / SCALE, new_model.h / SCALE);
    segment_fix_def.density = 1;
    segment_fix_def.userData = '{ "type": "track" }';
    segment_fix_def.filter.categoryBits = category.track;
    segment_fix_def.filter.maskBits = mask.track;
    segment.CreateFixture(segment_fix_def);
    var rectangle = new_model.scene.add.rectangle(new_model.relative_position[0], new_model.relative_position[1], new_model.w * 2, new_model.h * 2, 0x007bff);
    rectangle.angle = angle * (180 / Math.PI);
    new_model.relative_position[0] -= new_model.w * 2;
    new_model.relative_position[1] -= new_model.h * 2;
    return new_model;
}

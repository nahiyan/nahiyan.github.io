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
        scene: model.scene,
        paused: model.paused,
        human_controlled_car: model.human_controlled_car,
        show_sensors: model.show_sensors
    };
}
function range(size, startAt) {
    if (startAt === void 0) { startAt = 0; }
    return __spread(Array(size).keys()).map(function (i) { return i + startAt; });
}
function len(array) {
    return array.length;
}
function rand_int(min, max) {
    return Math.floor(Math.random() * max) + min;
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
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function () {
        var y1;
        if (use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }
        var retval = mean + stdev * y1;
        if (retval > 0)
            return retval;
        return -retval;
    };
}
function convert_number(old_value, old_range, new_range) {
    return ((old_value - old_range[0]) / (old_range[1] - old_range[0])) * (new_range[1] - new_range[0]) + new_range[0];
}
function prepare_world(scene) {
    // world
    var world = new box2d.b2World(new Vec2(0, 0), true);
    // debug draw
    // var debug_draw = new box2d.b2DebugDraw();
    // debug_draw.SetSprite((document.getElementById("debug") as HTMLCanvasElement).getContext('2d'));
    // debug_draw.SetDrawScale(SCALE);
    // debug_draw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    // world.SetDebugDraw(debug_draw);
    // contact listener
    var contact_listener = new box2d.b2ContactListener();
    contact_listener.BeginContact = function (c) {
        var a = JSON.parse(c.GetFixtureA().GetUserData());
        var b = JSON.parse(c.GetFixtureB().GetUserData());
        if (a["type"] == "car" && b["type"] == "track") {
            var car = sm.generations[a["generation_index"]].cars[a["car_index"]];
            mark_car_for_destruction(car);
        }
    };
    world.SetContactListener(contact_listener);
    // road track
    var road_tracks_left = {
        h: 70,
        w: 2,
        relative_position: [110, 300],
        scene: scene,
        world: world
    };
    var road_tracks_right = {
        h: 70,
        w: 2,
        relative_position: [
            road_tracks_left.relative_position[0] + 130,
            road_tracks_left.relative_position[1]
        ],
        scene: scene,
        world: world
    };
    add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [-18, 5], deg_to_rad(-15));
    add_road_track_segment(road_tracks_right, [-18, 5], deg_to_rad(-15));
    add_road_track_segment(road_tracks_left, [-18 * 2, 5 * 2], deg_to_rad(-15));
    add_road_track_segment(road_tracks_right, [-18 * 2, 5 * 2], deg_to_rad(-15));
    add_road_track_segment(road_tracks_left, [-18 * 2, 5 * 2], deg_to_rad(-15));
    add_road_track_segment(road_tracks_right, [-18 * 2, 5 * 2], deg_to_rad(-15));
    add_road_track_segment(road_tracks_left, [-18, 5], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [-18, 5], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [18, 5], deg_to_rad(15));
    add_road_track_segment(road_tracks_right, [18, 5], deg_to_rad(15));
    add_road_track_segment(road_tracks_left, [16 * 3, 5 * 2], deg_to_rad(25));
    add_road_track_segment(road_tracks_right, [16 * 3, 5 * 2], deg_to_rad(25));
    add_road_track_segment(road_tracks_left, [17 * 4, 5 * 4], deg_to_rad(35));
    add_road_track_segment(road_tracks_right, [15 * 5 + 2, 5 * 6], deg_to_rad(45));
    add_road_track_segment(road_tracks_left, [18 * 5 - 2, 5 * 7], deg_to_rad(45));
    add_road_track_segment(road_tracks_right, [19 * 6, 5 * 14 + 3], deg_to_rad(75));
    add_road_track_segment(road_tracks_left, [18 * 7 - 10, 5 * 15 - 2], deg_to_rad(75));
    add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 25 - 2], deg_to_rad(90));
    add_road_track_segment(road_tracks_right, [19 * 7, 5 * 24 + 1], deg_to_rad(90));
    add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 28], deg_to_rad(90));
    add_road_track_segment(road_tracks_right, [19 * 7, 5 * 27 + 5], deg_to_rad(90));
    add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 28], deg_to_rad(90));
    add_road_track_segment(road_tracks_right, [19 * 7, 5 * 27 + 5], deg_to_rad(90));
    add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 31 + 2], deg_to_rad(105));
    add_road_track_segment(road_tracks_left, [18 * 8 - 15, 5 * 37 + 3], deg_to_rad(115));
    add_road_track_segment(road_tracks_right, [19 * 7, 5 * 33 + 7], deg_to_rad(115));
    add_road_track_segment(road_tracks_left, [110, 220], deg_to_rad(135));
    add_road_track_segment(road_tracks_right, [110, 220], deg_to_rad(135));
    add_road_track_segment(road_tracks_left, [65, 255], deg_to_rad(165));
    add_road_track_segment(road_tracks_right, [65, 255], deg_to_rad(165));
    add_road_track_segment(road_tracks_left, [25, 275], deg_to_rad(175));
    add_road_track_segment(road_tracks_right, [17, 275], deg_to_rad(180));
    add_road_track_segment(road_tracks_left, [28, 275], deg_to_rad(160));
    add_road_track_segment(road_tracks_right, [22, 275], deg_to_rad(160));
    add_road_track_segment(road_tracks_left, [75, 250], deg_to_rad(130));
    add_road_track_segment(road_tracks_right, [74, 250], deg_to_rad(130));
    add_road_track_segment(road_tracks_left, [95, 130], deg_to_rad(40));
    add_road_track_segment(road_tracks_right, [120, 210], deg_to_rad(110));
    add_road_track_segment(road_tracks_right, [125, 130], deg_to_rad(60));
    add_road_track_segment(road_tracks_right, [95, 45], deg_to_rad(30));
    add_road_track_segment(road_tracks_left, [65, 25], deg_to_rad(20));
    add_road_track_segment(road_tracks_right, [60, 13], deg_to_rad(20));
    add_road_track_segment(road_tracks_left, [22, 5], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [30, 5], deg_to_rad(5));
    // 2nd part
    road_tracks_left.relative_position[0] = 1500;
    road_tracks_left.relative_position[1] = -980;
    road_tracks_right.relative_position[0] = road_tracks_left.relative_position[0] + 130;
    road_tracks_right.relative_position[1] = road_tracks_left.relative_position[1];
    add_road_track_segment(road_tracks_left, [-7, 2 + 2], deg_to_rad(-10));
    add_road_track_segment(road_tracks_right, [-7, 2], deg_to_rad(-10));
    add_road_track_segment(road_tracks_left, [5 - 4, 2 + 2 * 2], deg_to_rad(10));
    add_road_track_segment(road_tracks_right, [5 - 4, 2], deg_to_rad(10));
    add_road_track_segment(road_tracks_left, [40 - 2 * 3, 5 + 2], deg_to_rad(20));
    add_road_track_segment(road_tracks_right, [40 - 2 * 3, 5], deg_to_rad(20));
    add_road_track_segment(road_tracks_left, [40 - 2 * 3, 5 + 2], deg_to_rad(10));
    add_road_track_segment(road_tracks_right, [40 - 2 * 3, 5], deg_to_rad(10));
    add_road_track_segment(road_tracks_left, [5 - 2 * 3, 5 + 2], deg_to_rad(-10));
    add_road_track_segment(road_tracks_right, [5 - 2 * 3, 5], deg_to_rad(-10));
    add_road_track_segment(road_tracks_left, [-33 - 2 * 2, 7 + 2], deg_to_rad(-20));
    add_road_track_segment(road_tracks_right, [-33 - 2 * 2, 7], deg_to_rad(-20));
    add_road_track_segment(road_tracks_left, [-63 - 2 * 3, 20 + 2], deg_to_rad(-40));
    add_road_track_segment(road_tracks_right, [-63 - 2 * 3, 20], deg_to_rad(-40));
    add_road_track_segment(road_tracks_left, [-94 - 2 * 3, 41 + 2], deg_to_rad(-50));
    add_road_track_segment(road_tracks_right, [-94 - 2 * 2, 41 + 2], deg_to_rad(-50));
    add_road_track_segment(road_tracks_left, [-75 + 2 * 1, 30 + 2], deg_to_rad(-20));
    add_road_track_segment(road_tracks_right, [-75 - 2, 30], deg_to_rad(-20));
    add_road_track_segment(road_tracks_left, [-19 - 2 * 2, 7 + 2], deg_to_rad(0));
    add_road_track_segment(road_tracks_right, [-19 - 2 * 3, 7], deg_to_rad(0));
    add_road_track_segment(road_tracks_left, [28 - 2 * 3, 7 + 2], deg_to_rad(20));
    add_road_track_segment(road_tracks_right, [28 - 2 * 3, 7], deg_to_rad(20));
    add_road_track_segment(road_tracks_left, [63 - 2 * 3, 15 + 2], deg_to_rad(30));
    add_road_track_segment(road_tracks_right, [73 - 2 * 3, 21], deg_to_rad(40));
    add_road_track_segment(road_tracks_left, [88 - 2 * 3, 31 + 2], deg_to_rad(45));
    add_road_track_segment(road_tracks_left, [105 - 2, 55], deg_to_rad(55));
    add_road_track_segment(road_tracks_right, [105 - 2, 47], deg_to_rad(55));
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
// function random_weights(layer_sizes: number[]): any {
//     let weights: any = [];
//     let i: any;
//     for (i in range(len(layer_sizes))) {
//         // skip the first layer, as it has no previous layer
//         if(i != 0) {
//             weights.push(
//                 nj.random(
//                     layer_sizes[i - 1], layer_sizes[i]).tolist());
//         }
//     }
//     return weights;
// }
function random_weights(layer_sizes) {
    var weights = [];
    // const normal_dist = gaussian(0, 1);
    var i;
    var _loop_1 = function () {
        // skip the first layer, as it has no previous layer
        if (i != 0) {
            var r = range(layer_sizes[i - 1]);
            var c_1 = range(layer_sizes[i]);
            weights.push([]);
            r.forEach(function (i) {
                var rows = [];
                c_1.forEach(function (j) {
                    rows.push(random(-1, 1));
                });
                weights[len(weights) - 1].push(rows);
            });
        }
    };
    for (i in range(len(layer_sizes))) {
        _loop_1();
    }
    return weights;
}
function random_biases(layer_sizes) {
    var biases = [];
    // const normal_dist = gaussian(0, 1);
    var i;
    var _loop_2 = function () {
        // skip the first layer, as it has no previous layer
        if (i != 0) {
            var r = range(1);
            var c_2 = range(layer_sizes[i]);
            biases.push([]);
            r.forEach(function (i) {
                var rows = [];
                c_2.forEach(function (j) {
                    rows.push(random(-1, 1));
                });
                biases[len(biases) - 1].push(rows);
            });
        }
    };
    for (i in range(len(layer_sizes))) {
        _loop_2();
    }
    return biases;
}
// function random_biases(layer_sizes: number[]): any {
//     let biases: any = [];
//     let i: any;
//     for (i in range(len(layer_sizes))) {
//         // skip the first layer, as it has no previous layer
//         if(i != 0)
//             biases.push(
//                 nj.random(1, layer_sizes[i]).tolist());
//     }
//     return biases;
// }
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
        last_non_activated_layer.push(non_activated_layer(i, model));
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
        cars: [],
        time: Date.now()
    };
    new_model.generations.push(first_gen);
    // populate the generation
    for (var i in range(model.population_size)) {
        first_gen.cars.push(create_car(model));
    }
    furthest_car = first_gen.cars[0];
    return new_model;
}
function fitness(distance, avg_speed) {
    return distance * avg_speed;
}
function last_generation(model) {
    return model.generations[len(model.generations) - 1];
}
function breed_generation(model) {
    var selection_count = 4;
    // const selection_count: number = Math.ceil(0.1 * model.population_size);
    var mutation_rate = 0.02;
    // natural selection
    var fittest_individuals = best_fit_select(model, selection_count);
    // cross over to fill the vacant spots
    var new_gen = {
        cars: [],
        time: Date.now()
    };
    model.generations.push(new_gen);
    // fill the new generation by crossovers
    while (len(new_gen.cars) != model.population_size) {
        new_gen.cars.push(crossover(model, fittest_individuals));
    }
    // mutate the newly formed generation
    new_gen.cars.forEach(function (car) {
        car.nn = mutate(car.nn, mutation_rate);
    });
    return model;
}
function get_car(model, index) {
    return model.generations[index[0]][index[1]];
}
// takes random genes from the best fit individuals and generates a child
function crossover(model, individuals) {
    var new_car = create_car(model);
    var x = 0;
    var individuals_count = len(individuals);
    // weights
    new_car.nn.weights.forEach(function (weight_layer) {
        var y = 0;
        weight_layer.forEach(function (weight_row) {
            var z = 0;
            weight_row.forEach(function (weight_col) {
                new_car.nn.weights[x][y][z] =
                    individuals[rand_int(0, individuals_count - 1)].nn.weights[x][y][z];
                z++;
            });
            y++;
        });
        x++;
    });
    // biases
    x = 0;
    new_car.nn.biases.forEach(function (weight_layer) {
        var y = 0;
        weight_layer.forEach(function (weight_row) {
            var z = 0;
            weight_row.forEach(function (weight_col) {
                new_car.nn.biases[x][y][z] =
                    individuals[rand_int(0, individuals_count - 1)].nn.biases[x][y][z];
                z++;
            });
            y++;
        });
        x++;
    });
    return new_car;
}
function best_fit_select(model, quantity) {
    var individuals = last_generation(model);
    individuals.cars.sort(function (a, b) {
        return b.fitness - a.fitness;
    });
    var selected_individuals = individuals.cars.splice(0, quantity);
    return selected_individuals;
}
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
    // text
    distance_text = this.add.text(5, 20, "Distance: 0");
    speed_text = this.add.text(5, 50, "Speed: 0");
    current_generation_text = this.add.text(5, 70, "Generation: 0");
    best_fit_car_sensors_text = this.add.text(5, 90, "Sensors: 0");
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
    if (sm.paused)
        sm.scene.scene.pause();
    else
        sm.scene.scene.resume();
    // this.cameras.main.setZoom(0.5);
    // this.cameras.main.setScroll(1000, -1000);
}
var fps = 30;
var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: fps
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
var furthest_car;
var distance_text;
var speed_text;
var current_generation_text;
var best_fit_car_sensors_text;
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 32)
        if (sm.paused) {
            sm.scene.scene.resume();
            sm.paused = false;
        }
        else {
            sm.scene.scene.pause();
            sm.paused = true;
        }
    else if (e.key == 'h' || e.key == 'H')
        if (sm.human_controlled_car === undefined || sm.human_controlled_car.destroyed) {
            sm.human_controlled_car = furthest_car;
        }
        else {
            sm.human_controlled_car = undefined;
        }
});
function preload() {
    // images
    this.load.image('car', 'assets/car.png');
    // create the simulation model
    sm = {
        generations: [],
        current_generation_index: 0,
        population_size: 1,
        layer_sizes: [3, 5, 3, 2],
        world: prepare_world(this),
        scene: this,
        paused: false,
        human_controlled_car: undefined,
        show_sensors: false
    };
}
function update(time, delta) {
    if (furthest_car.destroyed)
        furthest_car.total_distance = 0;
    var lg = last_generation(sm);
    // get rid of really slow cars
    if ((Date.now() - lg.time) / 1000 > 2) {
        lg.cars.forEach(function (car) {
            if (car.speed < 0.2 && !car.destroyed && sm.human_controlled_car !== undefined && car.user_data != sm.human_controlled_car.user_data)
                mark_car_for_destruction(car);
        });
    }
    // process destruction queue
    if (len(dq.queue) != 0) {
        dq.queue.forEach(function (car) {
            if (!car.destroyed) {
                remove_car_from_world(sm, car);
                remove_car_from_scene(car);
                var time_1 = (Date.now() - car.creation_timestamp) / 1000;
                car.fitness = fitness(car.total_distance, car.total_distance / time_1);
            }
        });
        dq.queue = [];
    }
    // breed new generation if all cars are tested
    var number_of_cars_alive = 0;
    lg = last_generation(sm);
    lg.cars.forEach(function (car) {
        if (!car.destroyed)
            number_of_cars_alive++;
    });
    if (number_of_cars_alive == 0) {
        // new generation
        sm = breed_generation(sm);
        lg = last_generation(sm);
        lg.cars.forEach(function (car) {
            add_car_to_world(sm, car);
            add_car_to_scene(sm, car);
        });
        sm.current_generation_index++;
        furthest_car = lg.cars[0];
    }
    // box2d step
    sm.world.Step(1 / fps, 10, 10);
    // sm.world.DrawDebugData();
    sm.world.ClearForces();
    // cars step
    lg.cars.forEach(function (car) {
        if (!car.destroyed) {
            step_car(sm, car, delta);
            if (car.total_distance > furthest_car.total_distance)
                furthest_car = car;
        }
    });
    // camera
    this.cameras.main.setScroll(furthest_car.car_body.GetPosition().x * SCALE - 300, furthest_car.car_body.GetPosition().y * SCALE - 300);
    // text
    distance_text.setText("Distance: " + Math.round(furthest_car.total_distance * 100) / 100);
    distance_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 20);
    speed_text.setText("Speed: " + Math.round(furthest_car.speed * 100) / 100);
    speed_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 40);
    current_generation_text.setText("Generation: " + (sm.current_generation_index + 1));
    current_generation_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 60);
    best_fit_car_sensors_text.setText("Sensors: " + Math.round(furthest_car.lsv * 100) / 100 + ", " + Math.round(furthest_car.csv * 100) / 100 + ", " + Math.round(furthest_car.rsv * 100) / 100);
    best_fit_car_sensors_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 80);
    // keyboard controls
    var acceration_force = 10;
    if (sm.human_controlled_car !== undefined) {
        if (cursors.up.isDown) {
            sm.human_controlled_car.front_axle.ApplyForce(new Vec2(Math.sin(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force, -Math.cos(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force), sm.human_controlled_car.front_axle.GetWorldCenter());
        }
        else if (cursors.down.isDown) {
            sm.human_controlled_car.front_axle.ApplyForce(new Vec2(-Math.sin(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force, Math.cos(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force), sm.human_controlled_car.front_axle.GetWorldCenter());
        }
        var torque = 0.3;
        if (cursors.left.isDown) {
            sm.human_controlled_car.front_axle_joint.SetMotorSpeed(-torque);
        }
        else if (cursors.right.isDown) {
            sm.human_controlled_car.front_axle_joint.SetMotorSpeed(torque);
        }
        else {
            if (sm.human_controlled_car.front_axle_joint.GetJointAngle() != 0) {
                if (sm.human_controlled_car.front_axle_joint.GetJointAngle() > 0)
                    sm.human_controlled_car.front_axle_joint.SetMotorSpeed(-torque);
                else
                    sm.human_controlled_car.front_axle_joint.SetMotorSpeed(torque);
            }
        }
    }
}
function add_car_to_world(model, car) {
    car.creation_timestamp = Date.now();
    // car body
    var car_body_shape = new box2d.b2PolygonShape();
    car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);
    var car_body_fix_def = new box2d.b2FixtureDef();
    car_body_fix_def.shape = car_body_shape;
    car_body_fix_def.density = 1;
    car_body_fix_def.userData = car.user_data;
    car_body_fix_def.filter.categoryBits = category.car;
    car_body_fix_def.filter.maskBits = mask.car;
    var car_body_def = new box2d.b2BodyDef();
    car_body_def.position = new Vec2(180 / SCALE, 300 / SCALE);
    car_body_def.type = box2d.b2Body.b2_dynamicBody;
    car_body_def.linearDamping = 1;
    car_body_def.angularDamping = 3;
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
    rear_axle_and_car_joint_def.motorSpeed = 0;
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
    var ray_left_view;
    var ray_right_view;
    var ray_center_view;
    if (sm.show_sensors) {
        ray_left_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
        ray_right_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
        ray_center_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
    }
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
    if (sm.show_sensors) {
        car.ray_left_view = ray_left_view;
        car.ray_center_view = ray_center_view;
        car.ray_right_view = ray_right_view;
    }
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
    car.lsv = 0, car.csv = 0, car.rsv = 0;
    var ray_left_p1 = new Vec2((car.left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_left_p2 = new Vec2((car.left_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    var ray_right_p1 = new Vec2((car.right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_right_p2 = new Vec2((car.right_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    var ray_center_p1 = new Vec2((car.center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE, (car.center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
    var ray_center_p2 = new Vec2((car.center_sensor_top_view.getWorldTransformMatrix().e) / SCALE, (car.center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);
    if (sm.show_sensors) {
        car.ray_left_view.setTo(ray_left_p1.x * SCALE, ray_left_p1.y * SCALE, ray_left_p2.x * SCALE, ray_left_p2.y * SCALE);
        car.ray_right_view.setTo(ray_right_p1.x * SCALE, ray_right_p1.y * SCALE, ray_right_p2.x * SCALE, ray_right_p2.y * SCALE);
        car.ray_center_view.setTo(ray_center_p1.x * SCALE, ray_center_p1.y * SCALE, ray_center_p2.x * SCALE, ray_center_p2.y * SCALE);
    }
    // raycast
    model.world.RayCast(function (f, p, n, fr) {
        // console.log(f.GetUserData(), fr);
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.lsv = 1 - fr;
        }
        return 0;
    }, ray_left_p1, ray_left_p2);
    model.world.RayCast(function (f, p, n, fr) {
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.rsv = 1 - fr;
        }
        return 0;
    }, ray_right_p1, ray_right_p2);
    model.world.RayCast(function (f, p, n, fr) {
        var type = JSON.parse(f.GetUserData())["type"];
        if (type == "track") {
            car.csv = 1 - fr;
        }
        return 0;
    }, ray_center_p1, ray_center_p2);
    if (sm.show_sensors) {
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
    }
    car.speed =
        Math.round(((Phaser.Math.Distance.Between(car.previous_position[0], car.previous_position[1], car.car_container.x, car.car_container.y) / (delta / 1000)) / SCALE) * 10) / 10;
    car.total_distance += Phaser.Math.Distance.Between(car.previous_position[0], car.previous_position[1], car.car_container.x, car.car_container.y) / SCALE;
    car.previous_position = [car.car_container.x, car.car_container.y];
    var input_layer = [
        [car.lsv, car.csv, car.rsv]
    ];
    car.nn.layers = [input_layer];
    var forward_propagated_nn = forward_propagate(car.nn);
    var output = last_layer(forward_propagated_nn);
    var output_non_activated = last_non_activated_layer(forward_propagated_nn);
    // wheel views
    car.front_axle_view.rotation = car.front_axle.GetAngle() - car.car_body.GetAngle();
    // car view
    car.car_container.x = car.car_body.GetPosition().x * SCALE;
    car.car_container.y = car.car_body.GetPosition().y * SCALE;
    car.car_container.setRotation(car.car_body.GetAngle());
    // movement
    var acceration_force = 1;
    if (model.human_controlled_car === undefined || model.human_controlled_car.user_data != car.user_data) {
        // aceleration
        car.front_axle.ApplyForce(new Vec2(Math.sin(car.front_axle.GetAngle()) * output[0][0] * acceration_force * delta, -Math.cos(car.front_axle.GetAngle()) * output[0][0] * acceration_force * delta), car.front_axle.GetWorldCenter());
        // steering
        var steering = (0.7 - output_non_activated[0][1]);
        var torque = 30;
        car.front_axle_joint.SetMotorSpeed(torque * steering * delta);
        // car.front_axle.SetAngle(
        // 	car.car_body.GetAngle() + deg_to_rad(
        // 		convert_number(
        // 			output_non_activated[0][1], [0, 1], [-90, 90])));
    }
    return car;
}
function add_car_to_simulation(model, car) {
    var new_model = clone_sm(model);
    new_model.generations[new_model.current_generation_index].cars.push(car);
    return new_model;
}
function remove_car_from_world(model, car) {
    model.world.DestroyBody(car.car_body);
    model.world.DestroyBody(car.front_axle);
    model.world.DestroyBody(car.rear_axle);
}
function remove_car_from_scene(car) {
    car.car_container.destroy();
    if (sm.show_sensors) {
        car.ray_left_view.destroy();
        car.ray_center_view.destroy();
        car.ray_right_view.destroy();
    }
    car.destroyed = true;
}
function mark_car_for_destruction(car) {
    var already_marked = false;
    dq.queue.forEach(function (subject) {
        if (subject.user_data == car.user_data) {
            already_marked = true;
            return;
        }
    });
    if (!already_marked) {
        dq.queue.push(car);
    }
}
// function clone_road_track_model(model: RoadTrackModel): RoadTrackModel {
// 	return {
// 		h: model.h,
// 		w: model.w,
// 		relative_position: model.relative_position,
// 		scene: model.scene,
// 		world: model.world
// 	};
// }
function add_road_track_segment(model, position, angle) {
    model.relative_position[0] += position[0];
    model.relative_position[1] += position[1];
    var segment_def = new box2d.b2BodyDef();
    segment_def.position = new Vec2(model.relative_position[0] / SCALE, model.relative_position[1] / SCALE);
    segment_def.angle = angle;
    var segment = model.world.CreateBody(segment_def);
    var segment_fix_def = new box2d.b2FixtureDef();
    segment_fix_def.shape = new box2d.b2PolygonShape();
    segment_fix_def.shape.SetAsBox(model.w / SCALE, model.h / SCALE);
    segment_fix_def.density = 1;
    segment_fix_def.userData = '{ "type": "track" }';
    segment_fix_def.filter.categoryBits = category.track;
    segment_fix_def.filter.maskBits = mask.track;
    segment.CreateFixture(segment_fix_def);
    var rectangle = model.scene.add.rectangle(model.relative_position[0], model.relative_position[1], model.w * 2, model.h * 2, 0x007bff);
    rectangle.rotation = angle;
    // model.relative_position[0] -= model.w;
    model.relative_position[1] -= model.h * 2;
    return model;
}

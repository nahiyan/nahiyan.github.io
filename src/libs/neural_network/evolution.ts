// randomly mutate the weights and biases of a NN based on the amount

function mutate(nn, amount: number): NeuralNetworkModel {
	// weights

	var new_weights = [];

	// i -> matrix representing weights between 2 layers

	for (var i in range(len(nn.weights))) {
		new_weights.push([]);

		let size_y = len(nn.weights[i]);
		let size_x = len(nn.weights[i][0]);

		for (var j in range(size_y)) {
			new_weights[i].push([]);

			for (var k in range(size_x)) {
				new_weights[i][j].push([]);

				let random_variation = nn.weights[i][j][k] * amount;
				let r = random(-random_variation, random_variation);

				new_weights[i][j][k] = nn.weights[i][j][k] + r;
			}
		}
	}

	var new_biases = [];

	for (var i in range(len(nn.biases))) {
		new_biases.push([[]]);

		let size = len(nn.biases[i][0]);

		for (var j in range(size)) {
			let random_variation = nn.biases[i][0][j] * amount;
			let r = random(-random_variation, random_variation);

			new_biases[i][0].push(nn.biases[i][0][j] + r);
		}
	}

	let new_nn = clone_nnm(nn);

	new_nn.weights = new_weights;
	new_nn.biases = new_biases;

	return new_nn;
}

// spawn the first generation randomly
function initialize_evolution(model: SimulationModel): SimulationModel {
	var new_model = clone_sm(model);

	let first_gen: Generation = {
		cars: []
	};

	new_model.generations.push(first_gen);

	// populate the generation
	for (var i in range(model.population_size)) {
		first_gen.cars.push(create_car(model));
	}

	furthest_car = first_gen.cars[0];

	return new_model;
}

function fitness(distance: number, avg_speed: number): number {
	return distance * avg_speed;
}

function last_generation(model: SimulationModel): Generation {
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

function get_car(model: SimulationModel, index: number[]): Car {
	return model.generations
		[index[0]]
		[index[1]];
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
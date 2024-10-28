// randomly mutate the weights and biases of a NN based on the amount

function mutate(nn: NeuralNetworkModel, amount: number): NeuralNetworkModel {
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

function fitness(distance: number, avg_speed: number): number {
	return distance * avg_speed;
}

function last_generation(model: SimulationModel): Generation {
	return model.generations[len(model.generations) - 1];
}

function breed_generation(model: SimulationModel): SimulationModel {
	const selection_count: number = 4;

	// const selection_count: number = Math.ceil(0.1 * model.population_size);
	const mutation_rate: number = 0.02;

	// natural selection

	let fittest_individuals: Car[] =
		best_fit_select(model, selection_count);

	// cross over to fill the vacant spots

	let new_gen: Generation = {
		cars: [],
		time: Date.now()
	};

	model.generations.push(new_gen);

	// fill the new generation by crossovers

	while (len(new_gen.cars) != model.population_size) {
		new_gen.cars.push(
			crossover(model, fittest_individuals));
	}

	// mutate the newly formed generation

	new_gen.cars.forEach(function(car: Car) {
		car.nn = mutate(car.nn, mutation_rate);
	});

	return model;
}

function get_car(model: SimulationModel, index: number[]): Car {
	return model.generations
		[index[0]]
		[index[1]];
}

// takes random genes from the best fit individuals and generates a child

function crossover(model: SimulationModel, individuals: Car[]): Car {
	let new_car: Car = create_car(model);

	let x: number = 0;

	let individuals_count: number = len(individuals);

	// weights

	new_car.nn.weights.forEach(function(weight_layer){
		let y: number = 0;

		weight_layer.forEach(function(weight_row){
			let z: number = 0;

			weight_row.forEach(function(weight_col) {
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

	new_car.nn.biases.forEach(function(weight_layer){
		let y: number = 0;

		weight_layer.forEach(function(weight_row){
			let z: number = 0;

			weight_row.forEach(function(weight_col) {
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

function best_fit_select(model: SimulationModel, quantity: number): Car[] {
	let individuals: Generation = last_generation(model);

	individuals.cars.sort(function(a, b){
		return b.fitness - a.fitness;
	});

	let selected_individuals: Car[] = individuals.cars.splice(0, quantity);

	return selected_individuals;
}
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
function setup_neural_network() {
	// var layer_sizes = [3, 10, 10, 3];

	model = initialize_evolution(
		new Evolution(
			generations = [],
			population_size = 10,
			layer_sizes = [3, 5, 2]));

	current_individual = get_individual(current_individual_index, model);
}
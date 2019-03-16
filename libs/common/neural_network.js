function create_neural_network() {
	return initialize_evolution(
		new Evolution(
			generations = [],
			population_size = 10,
			layer_sizes = [3, 2, 2, 2]));

	// current_individual = get_individual(current_individual_index, model);
}
function preload() {
	// images

	this.load.image('car', 'assets/car.png');

	// create the simulation model

	sm = {
	    generations: [],
	    current_generation_index: 0,
	    population_size: 100,
	    layer_sizes: [3, 5, 3, 2],
	    world: prepare_world(this),
	    scene: this,
	    paused: false,
	    human_controlled_car: undefined
	};
}
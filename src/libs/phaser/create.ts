function create() {
	let starting_time: number = this.time.now;

	// setup input

	cursors = this.input.keyboard.createCursorKeys();

	// text

	distance_text = this.add.text(5, 20, "Distance: 0");
	speed_text = this.add.text(5, 50, "Speed: 0");
	current_generation_text = this.add.text(5, 70, "Generation: 0");

	// TODO: add initial generation

	sm = initialize_evolution(sm);

	// let car: Car = sm.generations[0].cars[0];
	// let car2: Car = sm.generations[0].cars[1];


	let lg: Generation = last_generation(sm);

	lg.cars.forEach(function(car: Car) {
		add_car_to_world(sm, car);
		add_car_to_scene(sm, car);
	});

	// add_car_to_world(sm, car2);
	// add_car_to_scene(sm, car2);
}
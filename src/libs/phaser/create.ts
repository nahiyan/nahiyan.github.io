function create() {
	let starting_time: number = this.time.now;

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


	let lg: Generation = last_generation(sm);

	lg.cars.forEach(function(car: Car) {
		add_car_to_world(sm, car);
		add_car_to_scene(sm, car);
	});

	// add_car_to_world(sm, car2);
	// add_car_to_scene(sm, car2);

	if (sm.paused)
        sm.scene.scene.pause();
    else
        sm.scene.scene.resume();

    // this.cameras.main.setZoom(0.2);

    // this.cameras.main.setScroll(1000, -1000);
}
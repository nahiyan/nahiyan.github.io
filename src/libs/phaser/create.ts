function create() {
	let starting_time: number = this.time.now;

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


	let lg: Generation = last_generation(sm);

	lg.cars.forEach(function(car: Car) {
		add_car_to_world(sm, car);
		add_car_to_scene(sm, car);
	});

	// add_car_to_world(sm, car2);
	// add_car_to_scene(sm, car2);
}
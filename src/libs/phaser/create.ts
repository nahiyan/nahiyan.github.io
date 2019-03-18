function create() {
	let starting_time: number = this.time.now;

	// let distance_text: any = this.add.text(5, 20, "Distance: 0");
	// let speed_text: any = this.add.text(5, 50, "Speed: 0");
	// let current_generation_text: any = this.add.text(5, 70, "Generation: 0");
	// let current_individual_text: any = this.add.text(5, 70, "Individual: 0");
	// let sensors_text: any = this.add.text(5, 70, "Sensors: 0");
	// let steering_text: any = this.add.text(5, 70, "Steering: ");

	// TODO: add initial generation

	sm = add_car_to_simulation(sm, create_car(sm));
}
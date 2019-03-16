function create () {
// 	starting_time = this.time.now;

// 	distance_text = this.add.text(5, 20, "Distance: 0");
// 	speed_text = this.add.text(5, 50, "Speed: 0");
// 	current_generation_text = this.add.text(5, 70, "Generation: 0");
// 	current_individual_text = this.add.text(5, 70, "Individual: 0");
// 	sensors_text = this.add.text(5, 70, "Sensors: 0");
// 	steering_text = this.add.text(5, 70, "Steering: ");

// 	// adjust position of the car

// 	// new_relative_position = new Vec2(-200 / SCALE, -1200 / SCALE);

// 	// car_body.SetPosition(add(car_body.GetPosition(), new_relative_position));
// 	// front_axle.SetPosition(add(car_body.GetPosition(), new_relative_position));
// 	// rear_axle.SetPosition(add(car_body.GetPosition(), new_relative_position));
	
// 	// views

// 	car = this.add.container(
// 		200,
// 		300
// 	);

// 	ball_view = this.add.sprite(200, 300, 'ball').setScale(0.5);

// 	// frontl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, -30, 5, 20, 0x00ff00);
// 	// frontr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, -30, 5, 20, 0x00ff00);
// 	// rearr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, 30, 5, 20, 0x00ff00);
// 	// rearl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, 30, 5, 20, 0x00ff00);

// 	// car.add(frontl_wheel_view);
// 	// car.add(frontr_wheel_view);
// 	// car.add(rearr_wheel_view);
// 	// car.add(rearl_wheel_view);

// 	front_axle_view = this.add.container(
// 		0,
// 		-30
// 	);

// 	front_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			0,
// 			0,
// 			50,
// 			5,
// 			0x00ff00
// 			));

// 	front_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			-27,
// 			0,
// 			5,
// 			20,
// 			0x00ff00
// 			));

// 	front_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			27,
// 			0,
// 			5,
// 			20,
// 			0x00ff00
// 			));

// 	car.add(front_axle_view);

// 	rear_axle_view = this.add.container(
// 		0,
// 		30
// 	);

// 	rear_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			0,
// 			0,
// 			50,
// 			5,
// 			0x00ff00
// 			));

// 	rear_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			-27,
// 			0,
// 			5,
// 			20,
// 			0x00ff00
// 			));

// 	rear_axle_view.add(
// 		new Phaser.GameObjects.Rectangle(
// 			this,
// 			25,
// 			0,
// 			5,
// 			20,
// 			0x00ff00
// 			));

// 	// rear_axle_view.setDepth(100);

// 	car.add(rear_axle_view);


// 	right_sensor_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		45,
// 		-93,
// 		3,
// 		100,
// 		0x00ff00
// 	);
// 	right_sensor_view.setDepth(-1);
// 	right_sensor_view.setAlpha(0.7);
// 	right_sensor_view.setAngle(32);

// 	left_sensor_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		-45,
// 		-93,
// 		3,
// 		100,
// 		0x00ff00
// 	);
// 	left_sensor_view.setDepth(-1);
// 	left_sensor_view.setAlpha(0.7);
// 	left_sensor_view.setAngle(-32);

// 	center_sensor_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		0,
// 		-112,
// 		3,
// 		117,
// 		0x00ff00
// 	);
// 	center_sensor_view.setDepth(-1);
// 	center_sensor_view.setAlpha(0.7);

// 	ground_view = this.add.rectangle(200, 300, ground_width, ground_height, 0x007bff);
// 	ground_view.x = ground.GetWorldCenter().x * SCALE;
// 	ground_view.y = ground.GetWorldCenter().y * SCALE;

// 	car_view = new Phaser.GameObjects.Image(this, 0, 0, 'car');
// 	car_view.setScale(0.5);

// 	car.add(car_view);

// 	previous_position = [car.x, car.y];
// 	total_distance = 0;

// 	ray_left_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
// 	ray_right_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
// 	ray_center_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);

// 	left_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		-20,
// 		-57,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	left_sensor_bottom_view.setAngle(-32);
// 	car.add(left_sensor_bottom_view);

// 	left_sensor_top_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		-70,
// 		-133,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	left_sensor_top_view.setAngle(-32);
// 	car.add(left_sensor_top_view);

// 	right_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		20,
// 		-57,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	right_sensor_bottom_view.setAngle(32);
// 	car.add(right_sensor_bottom_view);
	

// 	right_sensor_top_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		70,
// 		-133,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	right_sensor_top_view.setAngle(32);
// 	car.add(right_sensor_top_view);

// 	center_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		0,
// 		-60,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	center_sensor_bottom_view.setAngle(0);
// 	car.add(center_sensor_bottom_view);
	

// 	center_sensor_top_view = new Phaser.GameObjects.Rectangle(
// 		this,
// 		0,
// 		-170,
// 		0,
// 		0,
// 		0x0000ff
// 	);
// 	center_sensor_top_view.setAngle(0);
// 	car.add(center_sensor_top_view);
}
function update (time, delta) {
	// process destruction queue

	if (len(dq.queue) != 0) {
		dq.queue.forEach(function(car: Car) {
			remove_car_from_world(sm, car);
		});
		dq.queue = [];
	}

	sm.world.Step(1 / 30, delta, delta);
	sm.world.DrawDebugData();
	sm.world.ClearForces();

	let lg: Generation = last_generation(sm);

	lg.cars.forEach(function(car: Car) {
		step_car(sm, car, delta);
	});

// 	lsv = 0, csv = 0, rsv = 0;

// 	let ray_left_p1 =
// 		new Vec2(
// 			(left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
// 			(left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
// 	let ray_left_p2 =
// 		new Vec2(
// 			(left_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
// 			(left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

// 	let ray_right_p1 =
// 		new Vec2(
// 			(right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
// 			(right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
// 	let ray_right_p2 =
// 		new Vec2(
// 			(right_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
// 			(right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

// 	let ray_center_p1 =
// 		new Vec2(
// 			(center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
// 			(center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
// 	let ray_center_p2 =
// 		new Vec2(
// 			(center_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
// 			(center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

// 	ray_left_view.setTo(
// 		ray_left_p1.x * SCALE,
// 		ray_left_p1.y * SCALE,
// 		ray_left_p2.x * SCALE,
// 		ray_left_p2.y * SCALE);

// 	ray_right_view.setTo(
// 		ray_right_p1.x * SCALE,
// 		ray_right_p1.y * SCALE,
// 		ray_right_p2.x * SCALE,
// 		ray_right_p2.y * SCALE);

// 	ray_center_view.setTo(
// 		ray_center_p1.x * SCALE,
// 		ray_center_p1.y * SCALE,
// 		ray_center_p2.x * SCALE,
// 		ray_center_p2.y * SCALE);

// 	// raycast
// 	world.RayCast(
// 		function(f, p, n, fr){
// 			// console.log(f.GetUserData(), fr);
// 			if (f.GetUserData() == "track") {
// 				lsv = Math.round((1 - fr) * 100) / 100;
// 			}
			
// 			return 0;
// 		},
// 		ray_left_p1,
// 		ray_left_p2);

// 	world.RayCast(
// 		function(f, p, n, fr){
// 			if (f.GetUserData() == "track") {
// 				rsv = Math.round((1 - fr) * 100) / 100;
// 			}
			
// 			return 0;
// 		},
// 		ray_right_p1,
// 		ray_right_p2);

// 	world.RayCast(
// 		function(f, p, n, fr){
// 			// console.log(f.GetUserData(), fr);
// 			if (f.GetUserData() == "track") {
// 				csv = Math.round((1 - fr) * 100) / 100;
// 			}
			
// 			return 0;
// 		},
// 		ray_center_p1,
// 		ray_center_p2);

// 	if (lsv == 0)
// 		ray_left_view.strokeColor = 0x00ff00;
// 	else
// 		ray_left_view.strokeColor = 0xff0000;

// 	if (rsv == 0)
// 		ray_right_view.strokeColor = 0x00ff00;
// 	else
// 		ray_right_view.strokeColor = 0xff0000;

// 	if (csv == 0)
// 		ray_center_view.strokeColor = 0x00ff00;
// 	else
// 		ray_center_view.strokeColor = 0xff0000;


// 	let speed =
// 		Math.round(
// 			((Phaser.Math.Distance.Between(
// 				previous_position[0],
// 				previous_position[1],
// 				car.x,
// 				car.y) / (delta / 1000)) / SCALE) * 10) / 10;

// 	total_distance += Phaser.Math.Distance.Between(
// 		previous_position[0],
// 		previous_position[1],
// 		car.x,
// 		car.y) / SCALE;

// 	speed_text.setText("Speed: " + speed + " m/s");
// 	distance_text.setText("Distance: " + Math.round(total_distance) + " m");
	
// 	current_generation_text.setText("Generation: " + current_individual_index[0]);
// 	current_individual_text.setText("Individual: " + current_individual_index[1]);

// 	previous_position = [car.x, car.y];
	
// 	// camera

	// this.cameras.main.setScroll(car_body.GetPosition().x * SCALE - 300, car_body.GetPosition().y * SCALE - 300);

// 	// keep text position fixed

// 	speed_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 20);
// 	distance_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 50);
// 	current_generation_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 70);
// 	current_individual_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 90);


// 	// neural network

// 	// var lsv = 0, rsv = 0, csv = 0;

// 	// if (left_sensor_intersections >= 1)
// 	// 	lsv = 1;
// 	// if (right_sensor_intersections >= 1)
// 	// 	rsv = 1;
// 	// if (center_sensor_intersections >= 1)
// 	// 	csv = 1;

// 	sensors_text.setText("Sensors: " + lsv + ", " + csv + ", " + rsv);
// 	sensors_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 110);

// 	var input_layer = [
// 		[lsv, csv, rsv]
// 	];

// 	var output = output_layer(input_layer, current_individual);
// 	var output_non_activated =
// 		last_non_activated_layer(
// 			forward_propagate(current_individual));

// 	let steering: number = (0.8 - output_non_activated[0][1]);

// 	// var steering = 0;
// 	// var acceleration = 1;

// 	// if (output[0][0] - output[0][1] >= 0.01) {
// 	// 	steering = -1;
// 	// 	// steering_text.setText("Steering: Left");
// 	// } else if (output[0][1] - output[0][0] >= 0.01) {
// 	// 	steering = 1;
// 	// 	// steering_text.setText("Steering: Right");
// 	// }

// 	steering_text.setText("Output: " + Math.round(output[0][0] * 100) / 100 + ", " + Math.round(steering * 100) / 100);
// 	steering_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 130);

// 	// if (output[0][2] >= 0.5)
// 	// 	acceleration = 1;

// 	// console.log(output[0][0]);
// 	// console.log(output[0][1]);
// 	// console.log(output[0][2]);

// 	// physics

// 	world.Step(1 / 30, delta, delta);
// 	world.DrawDebugData();
// 	world.ClearForces();

// 	// wheel views

// 	front_axle_view.rotation = front_axle.GetAngle() - car_body.GetAngle();

// 	// ball view

// 	ball_view.x = ball.GetPosition().x * SCALE;
// 	ball_view.y = ball.GetPosition().y * SCALE;
// 	ball_view.setAngle(rad_to_deg(ball.GetAngle()));

// 	// car view

// 	car.x = car_body.GetPosition().x * SCALE;
// 	car.y = car_body.GetPosition().y * SCALE;
// 	car.setRotation(car_body.GetAngle());

// 	// setup input

// 	cursors = this.input.keyboard.createCursorKeys();

// 	// movement

// 	acceration_force = 30;

// 	// if (cursors.up.isDown) {
// 	// 	front_axle.ApplyForce(
// 	// 		new Vec2(
// 	// 			Math.sin(front_axle.GetAngle()) * acceration_force,
// 	// 			-Math.cos(front_axle.GetAngle()) * acceration_force
// 	// 		),
// 	// 		front_axle.GetWorldCenter()
// 	// 	);
// 	// } else if (cursors.down.isDown) {
// 	// 	front_axle.ApplyForce(
// 	// 		new Vec2(
// 	// 			-Math.sin(front_axle.GetAngle()) * acceration_force,
// 	// 			Math.cos(front_axle.GetAngle()) * acceration_force
// 	// 		),
// 	// 		front_axle.GetWorldCenter()
// 	// 	);
// 	// } else {
		
// 	// }

// 	front_axle.ApplyForce(
// 			new Vec2(
// 				Math.sin(front_axle.GetAngle()) * output[0][0] * acceration_force,
// 				-Math.cos(front_axle.GetAngle()) * output[0][0] * acceration_force
// 			),
// 			front_axle.GetWorldCenter()
// 		);

// 	// steering

// 	torque = 0.3;

// 	// if (cursors.left.isDown) {
// 	// 	front_axle_joint.SetMotorSpeed(-torque);
// 	// } else if (cursors.right.isDown) {
// 	// 	front_axle_joint.SetMotorSpeed(torque);
// 	// } else if (output_non_activated[0][1] == 0) {
// 	// 	if (front_axle_joint.GetJointAngle() != 0) {
// 	// 		if (front_axle_joint.GetJointAngle() > 0)
// 	// 			front_axle_joint.SetMotorSpeed(-torque);
// 	// 		else
// 	// 			front_axle_joint.SetMotorSpeed(torque);
// 	// 	}
// 	// }

// 	front_axle_joint.SetMotorSpeed(steering);
}
function update (time, delta) {
	if (furthest_car.destroyed)
		furthest_car.total_distance = 0;

	let lg: Generation = last_generation(sm);

	// get rid of really slow cars

	if ((Date.now() - lg.time) / 1000 > 2) {
		lg.cars.forEach(function(car: Car) {
			if (car.speed < 0.2 && !car.destroyed && sm.human_controlled_car !== undefined && car.user_data != sm.human_controlled_car.user_data)
				mark_car_for_destruction(car);
		});
	}


	// process destruction queue

	if (len(dq.queue) != 0) {
		dq.queue.forEach(function(car: Car) {
			if (!car.destroyed) {
				remove_car_from_world(sm, car);
				remove_car_from_scene(car);

				const time: number = (Date.now() - car.creation_timestamp) / 1000;

				car.fitness = fitness(car.total_distance, car.total_distance / time);
			}
		});
		dq.queue = [];
	}

	// breed new generation if all cars are tested

	let number_of_cars_alive: number = 0;
	lg = last_generation(sm);

	lg.cars.forEach(function(car: Car) {
		if (!car.destroyed)
			number_of_cars_alive++;
	});

	if (number_of_cars_alive == 0) {
		// new generation

		sm = breed_generation(sm);

		lg = last_generation(sm);

		lg.cars.forEach(function(car: Car){
			add_car_to_world(sm, car);
			add_car_to_scene(sm, car);
		});

		sm.current_generation_index++;

		furthest_car = lg.cars[0];
	}

	// box2d step

	sm.world.Step(1 / 30, 10, 10);
	// sm.world.DrawDebugData();
	sm.world.ClearForces();

	// cars step

	lg.cars.forEach(function(car: Car) {
		if (!car.destroyed) {
			step_car(sm, car, delta);

			if (car.total_distance > furthest_car.total_distance)
				furthest_car = car;
		}
	});

	// camera

	this.cameras.main.setScroll(furthest_car.car_body.GetPosition().x * SCALE - 300, furthest_car.car_body.GetPosition().y * SCALE - 300);

	// text

	distance_text.setText("Distance: " + Math.round(furthest_car.total_distance * 100) / 100);
	distance_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 20);

	speed_text.setText("Speed: " + Math.round(furthest_car.speed * 100) / 100);
	speed_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 40);

	current_generation_text.setText("Generation: " + (sm.current_generation_index + 1));
	current_generation_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 60);

	best_fit_car_sensors_text.setText("Sensors: " + Math.round(furthest_car.lsv * 100) / 100 + ", " + Math.round(furthest_car.csv * 100) / 100 + ", " + Math.round(furthest_car.rsv * 100) / 100);
	best_fit_car_sensors_text.setPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 80);

	// keyboard controls

	const acceration_force: number = 1000;

	if (sm.human_controlled_car !== undefined) {
		if (cursors.up.isDown) {
			sm.human_controlled_car.front_axle.ApplyForce(
				new Vec2(
					Math.sin(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force,
					-Math.cos(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force
				),
				sm.human_controlled_car.front_axle.GetWorldCenter()
			);
		} else if (cursors.down.isDown) {
			sm.human_controlled_car.front_axle.ApplyForce(
				new Vec2(
					-Math.sin(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force,
					Math.cos(sm.human_controlled_car.front_axle.GetAngle()) * acceration_force
				),
				sm.human_controlled_car.front_axle.GetWorldCenter()
			);
		}

		let torque: number = 0.3;

		if (cursors.left.isDown) {
			sm.human_controlled_car.front_axle_joint.SetMotorSpeed(-torque);
		} else if (cursors.right.isDown) {
			sm.human_controlled_car.front_axle_joint.SetMotorSpeed(torque);
		} else {
			if (sm.human_controlled_car.front_axle_joint.GetJointAngle() != 0) {
				if (sm.human_controlled_car.front_axle_joint.GetJointAngle() > 0)
					sm.human_controlled_car.front_axle_joint.SetMotorSpeed(-torque);
				else
					sm.human_controlled_car.front_axle_joint.SetMotorSpeed(torque);
			}
		}
	}
}
interface Car {
	nn: NeuralNetworkModel;
	fitness?: number;

	previous_position?: number[];
	total_distance?: number;

	// box2d world
	car_body?: any;
	front_axle?: any;
	rear_axle?: any;
	front_axle_joint?: any;

	// phaser scene
	car_container?: any;
	front_axle_view?: any;
	rear_axle_view?: any;

	ray_right_view?: any;
	ray_left_view?: any;
	ray_center_view?: any;

	// sensors
	lsv: number;
	csv: number;
	rsv: number;

	left_sensor_top_view?: any;
	left_sensor_bottom_view?: any;
	center_sensor_top_view?: any;
	center_sensor_bottom_view?: any;
	right_sensor_top_view?: any;
	right_sensor_bottom_view?: any;

	user_data: string;

	destroyed?: boolean;

	creation_timestamp?: number;

	speed?: number;
}

function add_car_to_world(model: SimulationModel, car: Car): void {
	car.creation_timestamp = Date.now();

	// car body

	let car_body_shape: any = new box2d.b2PolygonShape();
	car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);

	let car_body_fix_def: any = new box2d.b2FixtureDef();
	car_body_fix_def.shape = car_body_shape;
	car_body_fix_def.density = 1;
	car_body_fix_def.userData = car.user_data;
	car_body_fix_def.filter.categoryBits = category.car;
	car_body_fix_def.filter.maskBits = mask.car;

	let car_body_def: any = new box2d.b2BodyDef();
	car_body_def.position = new Vec2(180 / SCALE, 300 / SCALE);
	car_body_def.type = box2d.b2Body.b2_dynamicBody;
	car_body_def.linearDamping = 1;
	car_body_def.angularDamping = 3;

	let car_body: any = model.world.CreateBody(car_body_def);
	car_body.CreateFixture(car_body_fix_def);

	// front axle

	let front_axle_shape: any = new box2d.b2PolygonShape();
	front_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);

	let front_axle_fix_def: any = new box2d.b2FixtureDef();
	front_axle_fix_def.shape = front_axle_shape;
	front_axle_fix_def.density = 1;
	front_axle_fix_def.userData = car.user_data;
	front_axle_fix_def.filter.categoryBits = category.car;
	front_axle_fix_def.filter.maskBits = mask.car;

	let front_axle_wheel_left_shape: any = new box2d.b2PolygonShape();
	front_axle_wheel_left_shape.SetAsOrientedBox(
		2 / SCALE,
		10 / SCALE,
		new Vec2(-27 / SCALE, 0 / SCALE)
	);

	let front_axle_wheel_right_shape: any = new box2d.b2PolygonShape();
	front_axle_wheel_right_shape.SetAsOrientedBox(
		2 / SCALE,
		10 / SCALE,
		new Vec2(27 / SCALE, 0 / SCALE)
	);

	let front_axle_wheel_left_fix_def: any = new box2d.b2FixtureDef();
	front_axle_wheel_left_fix_def.shape = front_axle_wheel_left_shape;
	front_axle_wheel_left_fix_def.density = 1;
	front_axle_wheel_left_fix_def.userData = car.user_data;
	front_axle_wheel_left_fix_def.filter.categoryBits = category.car;
	front_axle_wheel_left_fix_def.filter.maskBits = mask.car;

	let front_axle_wheel_right_fix_def: any = new box2d.b2FixtureDef();
	front_axle_wheel_right_fix_def.shape = front_axle_wheel_right_shape;
	front_axle_wheel_right_fix_def.density = 1;
	front_axle_wheel_right_fix_def.userData = car.user_data;
	front_axle_wheel_right_fix_def.filter.categoryBits = category.car;
	front_axle_wheel_right_fix_def.filter.maskBits = mask.car;

	let front_axle_def: any = new box2d.b2BodyDef();
	front_axle_def.position = new Vec2(180 / SCALE, 270 / SCALE);
	front_axle_def.type = box2d.b2Body.b2_dynamicBody;

	let front_axle: any = model.world.CreateBody(front_axle_def);
	front_axle.CreateFixture(front_axle_fix_def);
	front_axle.CreateFixture(front_axle_wheel_left_fix_def);
	front_axle.CreateFixture(front_axle_wheel_right_fix_def);

	// rear axle

	let rear_axle_shape: any = new box2d.b2PolygonShape();
	rear_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);

	let rear_axle_fix_def: any = new box2d.b2FixtureDef();
	rear_axle_fix_def.shape = rear_axle_shape;
	rear_axle_fix_def.density = 1;
	rear_axle_fix_def.userData = car.user_data;
	rear_axle_fix_def.filter.categoryBits = category.car;
	rear_axle_fix_def.filter.maskBits = mask.car;

	let rear_axle_wheel_left_shape: any = new box2d.b2PolygonShape();
	rear_axle_wheel_left_shape.SetAsOrientedBox(
		2 / SCALE,
		10 / SCALE,
		new Vec2(-27 / SCALE, 0 / SCALE)
	);

	let rear_axle_wheel_right_shape: any = new box2d.b2PolygonShape();
	rear_axle_wheel_right_shape.SetAsOrientedBox(
		2 / SCALE,
		10 / SCALE,
		new Vec2(27 / SCALE, 0 / SCALE));

	let rear_axle_wheel_left_fix_def: any = new box2d.b2FixtureDef();
	rear_axle_wheel_left_fix_def.shape = rear_axle_wheel_left_shape;
	rear_axle_wheel_left_fix_def.density = 1;
	rear_axle_wheel_left_fix_def.userData = car.user_data;
	rear_axle_wheel_left_fix_def.filter.categoryBits = category.car;
	rear_axle_wheel_left_fix_def.filter.maskBits = mask.car;

	let rear_axle_wheel_right_fix_def: any = new box2d.b2FixtureDef();
	rear_axle_wheel_right_fix_def.shape = rear_axle_wheel_right_shape;
	rear_axle_wheel_right_fix_def.density = 1;
	rear_axle_wheel_right_fix_def.userData = car.user_data;
	rear_axle_wheel_right_fix_def.filter.categoryBits = category.car;
	rear_axle_wheel_right_fix_def.filter.maskBits = mask.car;

	let rear_axle_def: any = new box2d.b2BodyDef();
	rear_axle_def.position = new Vec2(180 / SCALE, 330 / SCALE);
	rear_axle_def.type = box2d.b2Body.b2_dynamicBody;

	let rear_axle: any = model.world.CreateBody(rear_axle_def);
	rear_axle.CreateFixture(rear_axle_fix_def);
	rear_axle.CreateFixture(rear_axle_wheel_left_fix_def);
	rear_axle.CreateFixture(rear_axle_wheel_right_fix_def);

	// front axle and car body joint

	let front_axle_and_car_joint_def: any = new box2d.b2RevoluteJointDef();
	front_axle_and_car_joint_def.Initialize(
		car_body, front_axle, front_axle.GetPosition());

	front_axle_and_car_joint_def.motorSpeed = 0;
	front_axle_and_car_joint_def.maxMotorTorque = 50;
	front_axle_and_car_joint_def.enableMotor = true;
	front_axle_and_car_joint_def.upperAngle = deg_to_rad(15);
	front_axle_and_car_joint_def.lowerAngle = deg_to_rad(-15);
	front_axle_and_car_joint_def.enableLimit = true;

	let front_axle_joint: any = model.world.CreateJoint(front_axle_and_car_joint_def);

	// rear axle and car body joint

	let rear_axle_and_car_joint_def: any = new box2d.b2RevoluteJointDef();
	rear_axle_and_car_joint_def.Initialize(
		car_body, rear_axle, rear_axle.GetPosition());

	rear_axle_and_car_joint_def.motorSpeed = 0;
	rear_axle_and_car_joint_def.maxMotorTorque = 20;
	rear_axle_and_car_joint_def.enableMotor = false;
	rear_axle_and_car_joint_def.upperAngle = deg_to_rad(0);
	rear_axle_and_car_joint_def.lowerAngle = deg_to_rad(0);
	rear_axle_and_car_joint_def.enableLimit = true;

	var rear_axle_joint = model.world.CreateJoint(rear_axle_and_car_joint_def);

	car.car_body = car_body;
	car.front_axle = front_axle;
	car.rear_axle = rear_axle;
	car.front_axle_joint = front_axle_joint;
}

function add_car_to_scene(model: SimulationModel, car: Car): void {
	// views

	let car_container: any = model.scene.add.container(
		200,
		300
	);

	let front_axle_view: any = model.scene.add.container(
		0,
		-30
	);

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			0,
			0,
			50,
			5,
			0x00ff00
			));

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			-27,
			0,
			5,
			20,
			0x00ff00
			));

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			27,
			0,
			5,
			20,
			0x00ff00
			));

	car_container.add(front_axle_view);

	let rear_axle_view: any = model.scene.add.container(
		0,
		30
	);

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			0,
			0,
			50,
			5,
			0x00ff00
			));

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			-27,
			0,
			5,
			20,
			0x00ff00
			));

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			model.scene,
			25,
			0,
			5,
			20,
			0x00ff00
			));

	car_container.add(rear_axle_view);

	let car_view: any = new Phaser.GameObjects.Image(model.scene, 0, 0, 'car');
	car_view.setScale(0.5);

	car_container.add(car_view);

	let ray_left_view: any;
	let ray_right_view: any;
	let ray_center_view: any;
	
	if (sm.show_sensors) {
		ray_left_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
		ray_right_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
		ray_center_view = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
	}

	let left_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		-20,
		-57,
		0,
		0,
		0x0000ff
	);
	left_sensor_bottom_view.setAngle(-32);
	car_container.add(left_sensor_bottom_view);

	let left_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		-70,
		-133,
		0,
		0,
		0x0000ff
	);
	left_sensor_top_view.setAngle(-32);
	car_container.add(left_sensor_top_view);

	let right_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		20,
		-57,
		0,
		0,
		0x0000ff
	);
	right_sensor_bottom_view.setAngle(32);
	car_container.add(right_sensor_bottom_view);
	

	let right_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		70,
		-133,
		0,
		0,
		0x0000ff
	);
	right_sensor_top_view.setAngle(32);
	car_container.add(right_sensor_top_view);

	let center_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		0,
		-60,
		0,
		0,
		0x0000ff
	);
	center_sensor_bottom_view.setAngle(0);
	car_container.add(center_sensor_bottom_view);
	

	let center_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		0,
		-170,
		0,
		0,
		0x0000ff
	);
	center_sensor_top_view.setAngle(0);
	car_container.add(center_sensor_top_view);

	car.car_container = car_container;
	car.front_axle_view = front_axle_view;
	car.rear_axle_view = rear_axle_view;

	if (sm.show_sensors) {
		car.ray_left_view = ray_left_view;
		car.ray_center_view = ray_center_view;
		car.ray_right_view = ray_right_view;
	}

	car.previous_position = [car_container.x, car_container.y];
	car.total_distance = 0;

	car.left_sensor_bottom_view = left_sensor_bottom_view;
	car.left_sensor_top_view = left_sensor_top_view;
	car.center_sensor_bottom_view = center_sensor_bottom_view;
	car.center_sensor_top_view = center_sensor_top_view;
	car.right_sensor_bottom_view = right_sensor_bottom_view;
	car.right_sensor_top_view = right_sensor_top_view;
}

// @functional
// create bodies, joints, views and add them to the world, and the model.scene
function create_car(model: SimulationModel): Car {
	return {
		nn: {
			weights: random_weights(model.layer_sizes),
			biases: random_biases(model.layer_sizes),
			layer_sizes: model.layer_sizes,
			layers: [],
			non_activated_layers: [],
			identity_biases: undefined
		},
		lsv: 0,
		csv: 0,
		rsv: 0,
		user_data:
			'{ "type": "car", "generation_index": '
			+ (len(model.generations) - 1)
			+ ', "car_index": '
			+ len(model.generations[(len(model.generations) - 1)].cars) + ' }'
	};
}

function step_car(model: SimulationModel, car: Car, delta: number): Car {
	car.lsv = 0, car.csv = 0, car.rsv = 0;

	let ray_left_p1 =
		new Vec2(
			(car.left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(car.left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_left_p2 =
		new Vec2(
			(car.left_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(car.left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	let ray_right_p1 =
		new Vec2(
			(car.right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(car.right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_right_p2 =
		new Vec2(
			(car.right_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(car.right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	let ray_center_p1 =
		new Vec2(
			(car.center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(car.center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_center_p2 =
		new Vec2(
			(car.center_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(car.center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	if (sm.show_sensors) {
		car.ray_left_view.setTo(
			ray_left_p1.x * SCALE,
			ray_left_p1.y * SCALE,
			ray_left_p2.x * SCALE,
			ray_left_p2.y * SCALE);

		car.ray_right_view.setTo(
			ray_right_p1.x * SCALE,
			ray_right_p1.y * SCALE,
			ray_right_p2.x * SCALE,
			ray_right_p2.y * SCALE);

		car.ray_center_view.setTo(
			ray_center_p1.x * SCALE,
			ray_center_p1.y * SCALE,
			ray_center_p2.x * SCALE,
			ray_center_p2.y * SCALE);
	}

	// raycast
	model.world.RayCast(
		function(f, p, n, fr){
			// console.log(f.GetUserData(), fr);
			const type: string = JSON.parse(f.GetUserData())["type"];

			if (type == "track") {
					car.lsv = 1 - fr;
			}
			
			return 0;
		},
		ray_left_p1,
		ray_left_p2);

	model.world.RayCast(
		function(f, p, n, fr){
			const type: string = JSON.parse(f.GetUserData())["type"];

			if (type == "track") {
				car.rsv = 1 - fr;
			}
			
			return 0;
		},
		ray_right_p1,
		ray_right_p2);

	model.world.RayCast(
		function(f, p, n, fr){
			const type: string = JSON.parse(f.GetUserData())["type"];

			if (type == "track") {
				car.csv = 1 - fr;
			}
			
			return 0;
		},
		ray_center_p1,
		ray_center_p2);

	if (sm.show_sensors) {
		if (car.lsv == 0)
			car.ray_left_view.strokeColor = 0x00ff00;
		else
			car.ray_left_view.strokeColor = 0xff0000;

		if (car.rsv == 0)
			car.ray_right_view.strokeColor = 0x00ff00;
		else
			car.ray_right_view.strokeColor = 0xff0000;

		if (car.csv == 0)
			car.ray_center_view.strokeColor = 0x00ff00;
		else
			car.ray_center_view.strokeColor = 0xff0000;
	}

	car.speed =
		Math.round(
			((Phaser.Math.Distance.Between(
				car.previous_position[0],
				car.previous_position[1],
				car.car_container.x,
				car.car_container.y) / (delta / 1000)) / SCALE) * 10) / 10;

	car.total_distance += Phaser.Math.Distance.Between(
		car.previous_position[0],
		car.previous_position[1],
		car.car_container.x,
		car.car_container.y) / SCALE;

	car.previous_position = [car.car_container.x, car.car_container.y];

	const input_layer: number[][] = [
		[car.lsv, car.csv, car.rsv]
	];

	car.nn.layers = [ input_layer ];
	let forward_propagated_nn: NeuralNetworkModel = forward_propagate(car.nn);

	let output: any = last_layer(forward_propagated_nn);
	let output_non_activated: any = last_non_activated_layer(forward_propagated_nn);

	// wheel views

	car.front_axle_view.rotation = car.front_axle.GetAngle() - car.car_body.GetAngle();

	// car view

	car.car_container.x = car.car_body.GetPosition().x * SCALE;
	car.car_container.y = car.car_body.GetPosition().y * SCALE;
	car.car_container.setRotation(car.car_body.GetAngle());

	// movement

	let acceration_force: number = 1;

	if (model.human_controlled_car === undefined || model.human_controlled_car.user_data != car.user_data) {
		// aceleration

		car.front_axle.ApplyForce(
				new Vec2(
					Math.sin(car.front_axle.GetAngle()) * output[0][0] * acceration_force * delta,
					-Math.cos(car.front_axle.GetAngle()) * output[0][0] * acceration_force * delta
				),
				car.front_axle.GetWorldCenter()
			);

		// steering

		let steering: number = (0.7 - output_non_activated[0][1]);

		let torque: number = 30;

		car.front_axle_joint.SetMotorSpeed(torque * steering * delta);
		// car.front_axle.SetAngle(
		// 	car.car_body.GetAngle() + deg_to_rad(
		// 		convert_number(
		// 			output_non_activated[0][1], [0, 1], [-90, 90])));
	}

	return car;
}

function add_car_to_simulation(model: SimulationModel, car: Car): SimulationModel {
	let new_model: SimulationModel = clone_sm(model);
	new_model.generations[new_model.current_generation_index].cars.push(car);

	return new_model;
}

function remove_car_from_world(model: SimulationModel, car: Car): void {
	model.world.DestroyBody(car.car_body);
	model.world.DestroyBody(car.front_axle);
	model.world.DestroyBody(car.rear_axle);
}

function remove_car_from_scene(car: Car): void {
	car.car_container.destroy();

	if (sm.show_sensors) {
		car.ray_left_view.destroy();
		car.ray_center_view.destroy();
		car.ray_right_view.destroy();
	}

	car.destroyed = true;
}

function mark_car_for_destruction(car: Car): void {
	let already_marked: boolean = false;

	dq.queue.forEach(function(subject: Car) {
		if (subject.user_data == car.user_data) {
			already_marked = true;
			return;
		}
	});

	if (!already_marked) {
		dq.queue.push(car);
	}
}
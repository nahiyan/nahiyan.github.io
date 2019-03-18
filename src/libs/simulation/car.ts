interface Car {
	nn: NeuralNetworkModel;
	fitness?: number;
	car_body: any;
	front_axle: any;
	rear_axle: any;
}

function add_car_to_world(model: SimulationModel): void {
	// car body

	let car_body_shape: any = new box2d.b2PolygonShape();
	car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);

	let car_body_fix_def: any = new box2d.b2FixtureDef();
	car_body_fix_def.shape = car_body_shape;
	car_body_fix_def.density = 10;
	car_body_fix_def.userData = "car";

	let car_body_def: any = new box2d.b2BodyDef();
	car_body_def.position = new Vec2(180 / SCALE, 300 / SCALE);
	car_body_def.type = box2d.b2Body.b2_dynamicBody;
	car_body_def.linearDamping = 10;
	car_body_def.angularDamping = 10;

	let car_body: any = model.world.CreateBody(car_body_def);
	car_body.CreateFixture(car_body_fix_def);

	// front axle

	let front_axle_shape: any = new box2d.b2PolygonShape();
	front_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);

	let front_axle_fix_def: any = new box2d.b2FixtureDef();
	front_axle_fix_def.shape = front_axle_shape;
	front_axle_fix_def.density = 1;
	front_axle_fix_def.userData = "car";

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
	front_axle_wheel_left_fix_def.userData = "car";

	let front_axle_wheel_right_fix_def: any = new box2d.b2FixtureDef();
	front_axle_wheel_right_fix_def.shape = front_axle_wheel_right_shape;
	front_axle_wheel_right_fix_def.density = 1;
	front_axle_wheel_right_fix_def.userData = "car";

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
	rear_axle_fix_def.userData = "car";

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
	rear_axle_wheel_left_fix_def.userData = "car";

	let rear_axle_wheel_right_fix_def: any = new box2d.b2FixtureDef();
	rear_axle_wheel_right_fix_def.shape = rear_axle_wheel_right_shape;
	rear_axle_wheel_right_fix_def.density = 1;
	rear_axle_wheel_right_fix_def.userData = "car";

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

	rear_axle_and_car_joint_def.motorSpeed = 2;
	rear_axle_and_car_joint_def.maxMotorTorque = 20;
	rear_axle_and_car_joint_def.enableMotor = false;
	rear_axle_and_car_joint_def.upperAngle = deg_to_rad(0);
	rear_axle_and_car_joint_def.lowerAngle = deg_to_rad(0);
	rear_axle_and_car_joint_def.enableLimit = true;

	var rear_axle_joint = model.world.CreateJoint(rear_axle_and_car_joint_def);
}

function add_car_to_scene(model: SimulationModel): void {
	// views

	let car: any = model.scene.add.container(
		200,
		300
	);

	let ball_view: any = model.scene.add.sprite(200, 300, 'ball').setScale(0.5);

	// frontl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, -30, 5, 20, 0x00ff00);
	// frontr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, -30, 5, 20, 0x00ff00);
	// rearr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, 30, 5, 20, 0x00ff00);
	// rearl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, 30, 5, 20, 0x00ff00);

	// car.add(frontl_wheel_view);
	// car.add(frontr_wheel_view);
	// car.add(rearr_wheel_view);
	// car.add(rearl_wheel_view);

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

	car.add(front_axle_view);

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

	// rear_axle_view.setDepth(100);

	car.add(rear_axle_view);

	let right_sensor_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		45,
		-93,
		3,
		100,
		0x00ff00
	);
	right_sensor_view.setDepth(-1);
	right_sensor_view.setAlpha(0.7);
	right_sensor_view.setAngle(32);

	let left_sensor_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		-45,
		-93,
		3,
		100,
		0x00ff00
	);
	left_sensor_view.setDepth(-1);
	left_sensor_view.setAlpha(0.7);
	left_sensor_view.setAngle(-32);

	let center_sensor_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		0,
		-112,
		3,
		117,
		0x00ff00
	);
	center_sensor_view.setDepth(-1);
	center_sensor_view.setAlpha(0.7);

	// let ground_view: any = model.scene.add.rectangle(200, 300, ground_width, ground_height, 0x007bff);
	// ground_view.x = ground.GetWorldCenter().x * SCALE;
	// ground_view.y = ground.GetWorldCenter().y * SCALE;

	let car_view: any = new Phaser.GameObjects.Image(model.scene, 0, 0, 'car');
	car_view.setScale(0.5);

	car.add(car_view);

	let ray_left_view: any = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
	let ray_right_view: any = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
	let ray_center_view: any = model.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff);

	let left_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		-20,
		-57,
		0,
		0,
		0x0000ff
	);
	left_sensor_bottom_view.setAngle(-32);
	car.add(left_sensor_bottom_view);

	let left_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		-70,
		-133,
		0,
		0,
		0x0000ff
	);
	left_sensor_top_view.setAngle(-32);
	car.add(left_sensor_top_view);

	let right_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		20,
		-57,
		0,
		0,
		0x0000ff
	);
	right_sensor_bottom_view.setAngle(32);
	car.add(right_sensor_bottom_view);
	

	let right_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		70,
		-133,
		0,
		0,
		0x0000ff
	);
	right_sensor_top_view.setAngle(32);
	car.add(right_sensor_top_view);

	let center_sensor_bottom_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		0,
		-60,
		0,
		0,
		0x0000ff
	);
	center_sensor_bottom_view.setAngle(0);
	car.add(center_sensor_bottom_view);
	

	let center_sensor_top_view: any = new Phaser.GameObjects.Rectangle(
		model.scene,
		0,
		-170,
		0,
		0,
		0x0000ff
	);
	center_sensor_top_view.setAngle(0);
	car.add(center_sensor_top_view);
}

// create bodies, joints, views and add them to the world, and the model.scene
function create_car(model: SimulationModel): Car {
	let previous_position: number[] = [car.x, car.y];
	let total_distance: number = 0;

	return {
		nn: {
			weights: random_weights(model.layer_sizes),
			biases: random_weights(model.layer_sizes),
			layer_sizes: model.layer_sizes,
			layers: [],
			non_activated_layers: [],
			identity_biases: []
		},
		fitness: undefined,
		car_body: car_body,
		front_axle: front_axle,
		rear_axle: rear_axle
	};
}

function step_car(car:Car): Car {
	return car;
}

function add_car_to_simulation(model: SimulationModel, car: Car): SimulationModel {
	let new_model: SimulationModel = clone_sm(model);
	new_model.generations[new_model.current_generation_index].cars.push(car);

	return new_model;
}
// jshint esversion: 6

var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: 30
};

var game = new Phaser.Game(config);
var PVec2 = Phaser.Math.Vector2;
var model;

var ground_width = 700, ground_height = 15;
var ball_view, car_view;
var cursors;
// var left_sensor_intersections = 0,
// 	right_sensor_intersections = 0,
// 	center_sensor_intersections = 0;

var world, ball, ground, car_body, front_axle, rear_axle, right_sensor;

var current_individual_index = [0, 0];
var starting_time;

function add(a, b) {
	return new Vec2(a.x + b.x, a.y + b.y);
}

function rad_to_deg(value) {
	// 1 pi rad = 180 deg
	// x rad = (180 / pi) * x

	return value * (180 / Math.PI);
}

function deg_to_rad(value) {
	// 180 deg = 1 pi rad
	// x deg = (1 pi / 180) * x
	return (Math.PI / 180) * value;
}

function preload ()
{
	// images

	this.load.image('car', 'assets/car.png');
	this.load.image('ball', 'assets/ball.png');

	// physics - box2d

	setup_physics(this);

	// neural network

	if (model === undefined)
		setup_neural_network();
}

function create ()
{
	starting_time = this.time.now;

	left_sensor_intersections = 0;
	center_sensor_intersections = 0;
	right_sensor_intersections = 0;

	distance_text = this.add.text(5, 20, "Distance: 0");
	speed_text = this.add.text(5, 50, "Speed: 0");
	current_generation_text = this.add.text(5, 70, "Generation: 0");
	current_individual_text = this.add.text(5, 70, "Individual: 0");
	sensors_text = this.add.text(5, 70, "Sensors: 0");
	steering_text = this.add.text(5, 70, "Steering: ");

	// adjust position of the car

	// new_relative_position = new Vec2(-200 / SCALE, -1200 / SCALE);

	// car_body.SetPosition(add(car_body.GetPosition(), new_relative_position));
	// front_axle.SetPosition(add(car_body.GetPosition(), new_relative_position));
	// rear_axle.SetPosition(add(car_body.GetPosition(), new_relative_position));
	
	// views

	car = this.add.container(
		200,
		300
	);

	ball_view = this.add.sprite(200, 300, 'ball').setScale(0.5);

	// frontl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, -30, 5, 20, 0x00ff00);
	// frontr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, -30, 5, 20, 0x00ff00);
	// rearr_wheel_view = new Phaser.GameObjects.Rectangle(this, 25, 30, 5, 20, 0x00ff00);
	// rearl_wheel_view = new Phaser.GameObjects.Rectangle(this, -25, 30, 5, 20, 0x00ff00);

	// car.add(frontl_wheel_view);
	// car.add(frontr_wheel_view);
	// car.add(rearr_wheel_view);
	// car.add(rearl_wheel_view);

	front_axle_view = this.add.container(
		0,
		-30
	);

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			0,
			0,
			50,
			5,
			0x00ff00
			));

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			-27,
			0,
			5,
			20,
			0x00ff00
			));

	front_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			27,
			0,
			5,
			20,
			0x00ff00
			));

	car.add(front_axle_view);

	rear_axle_view = this.add.container(
		0,
		30
	);

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			0,
			0,
			50,
			5,
			0x00ff00
			));

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			-27,
			0,
			5,
			20,
			0x00ff00
			));

	rear_axle_view.add(
		new Phaser.GameObjects.Rectangle(
			this,
			25,
			0,
			5,
			20,
			0x00ff00
			));

	// rear_axle_view.setDepth(100);

	car.add(rear_axle_view);


	right_sensor_view = new Phaser.GameObjects.Rectangle(
		this,
		45,
		-93,
		3,
		100,
		0x00ff00
	);
	right_sensor_view.setDepth(-1);
	right_sensor_view.setAlpha(0.7);
	right_sensor_view.setAngle(32);

	left_sensor_view = new Phaser.GameObjects.Rectangle(
		this,
		-45,
		-93,
		3,
		100,
		0x00ff00
	);
	left_sensor_view.setDepth(-1);
	left_sensor_view.setAlpha(0.7);
	left_sensor_view.setAngle(-32);

	center_sensor_view = new Phaser.GameObjects.Rectangle(
		this,
		0,
		-112,
		3,
		117,
		0x00ff00
	);
	center_sensor_view.setDepth(-1);
	center_sensor_view.setAlpha(0.7);

	// car.add(left_sensor_view);
	// car.add(center_sensor_view);
	// car.add(right_sensor_view);

	ground_view = this.add.rectangle(200, 300, ground_width, ground_height, 0x007bff);
	ground_view.x = ground.GetWorldCenter().x * SCALE;
	ground_view.y = ground.GetWorldCenter().y * SCALE;

	car_view = new Phaser.GameObjects.Image(this, 0, 0, 'car');
	car_view.setScale(0.5);

	car.add(car_view);

	previous_position = [car.x, car.y];
	total_distance = 0;

	ray_left_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
	ray_right_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);
	ray_center_view = this.add.line(0, 0, 0, 0, 0, 0, 0xffffff);

	// debug_draw.DrawSegment(
	// 	new Vec2(0 / SCALE, 0 / SCALE),
	// 	new Vec2(100 / SCALE, 100 / SCALE),
	// 	new Box2D.Common.b2Color(255, 255, 255));

	left_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
		this,
		-20,
		-57,
		0,
		0,
		0x0000ff
	);
	left_sensor_bottom_view.setAngle(-32);
	car.add(left_sensor_bottom_view);

	left_sensor_top_view = new Phaser.GameObjects.Rectangle(
		this,
		-70,
		-133,
		0,
		0,
		0x0000ff
	);
	left_sensor_top_view.setAngle(-32);
	car.add(left_sensor_top_view);

	right_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
		this,
		20,
		-57,
		0,
		0,
		0x0000ff
	);
	right_sensor_bottom_view.setAngle(32);
	car.add(right_sensor_bottom_view);
	

	right_sensor_top_view = new Phaser.GameObjects.Rectangle(
		this,
		70,
		-133,
		0,
		0,
		0x0000ff
	);
	right_sensor_top_view.setAngle(32);
	car.add(right_sensor_top_view);

	center_sensor_bottom_view = new Phaser.GameObjects.Rectangle(
		this,
		0,
		-60,
		0,
		0,
		0x0000ff
	);
	center_sensor_bottom_view.setAngle(0);
	car.add(center_sensor_bottom_view);
	

	center_sensor_top_view = new Phaser.GameObjects.Rectangle(
		this,
		0,
		-170,
		0,
		0,
		0x0000ff
	);
	center_sensor_top_view.setAngle(0);
	car.add(center_sensor_top_view);
}

function update (time, delta)
{
	let ray_left_p1 =
		new Vec2(
			(left_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(left_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_left_p2 =
		new Vec2(
			(left_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(left_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	let ray_right_p1 =
		new Vec2(
			(right_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(right_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_right_p2 =
		new Vec2(
			(right_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(right_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	let ray_center_p1 =
		new Vec2(
			(center_sensor_bottom_view.getWorldTransformMatrix().e) / SCALE,
			(center_sensor_bottom_view.getWorldTransformMatrix().f) / SCALE);
	let ray_center_p2 =
		new Vec2(
			(center_sensor_top_view.getWorldTransformMatrix().e) / SCALE,
			(center_sensor_top_view.getWorldTransformMatrix().f) / SCALE);

	ray_left_view.setTo(
		ray_left_p1.x * SCALE,
		ray_left_p1.y * SCALE,
		ray_left_p2.x * SCALE,
		ray_left_p2.y * SCALE);

	ray_right_view.setTo(
		ray_right_p1.x * SCALE,
		ray_right_p1.y * SCALE,
		ray_right_p2.x * SCALE,
		ray_right_p2.y * SCALE);

	ray_center_view.setTo(
		ray_center_p1.x * SCALE,
		ray_center_p1.y * SCALE,
		ray_center_p2.x * SCALE,
		ray_center_p2.y * SCALE);

	var lsv = 0, csv = 0, rsv = 0;

	// raycast
	world.RayCast(
		function(f, p, n, fr){
			// console.log(f.GetUserData(), fr);
			if (f.GetUserData() == "track") {
				lsv = Math.round(fr * 100) / 100;
			}
			
			return 0;
		},
		ray_left_p1,
		ray_left_p2);

	world.RayCast(
		function(f, p, n, fr){
			if (f.GetUserData() == "track") {
				rsv = Math.round(fr * 100) / 100;
			}
			
			return 0;
		},
		ray_right_p1,
		ray_right_p2);

	world.RayCast(
		function(f, p, n, fr){
			// console.log(f.GetUserData(), fr);
			if (f.GetUserData() == "track") {
				csv = Math.round(fr * 100) / 100;
			}
			
			return 0;
		},
		ray_center_p1,
		ray_center_p2);

	// car_body.GetFixtureList()[0].RayCast(
	// 	function(f, p, d, e) {
	// 		console.log(f);
	// 	},
	// 	Vec2(car_body.GetPosition().x, car_body.GetPosition().y),
	// 	Vec2(car_body.GetPosition().x - 100 / SCALE, car_body.GetPosition().y - 100 / SCALE));

	let speed =
		Math.round(
			((Phaser.Math.Distance.Between(
				previous_position[0],
				previous_position[1],
				car.x,
				car.y) / (delta / 1000)) / SCALE) * 10) / 10;

	total_distance += Phaser.Math.Distance.Between(
		previous_position[0],
		previous_position[1],
		car.x,
		car.y) / SCALE;

	speed_text.setText("Speed: " + speed + " m/s");
	distance_text.setText("Distance: " + Math.round(total_distance) + " m");
	
	current_generation_text.setText("Generation: " + current_individual_index[0]);
	current_individual_text.setText("Individual: " + current_individual_index[1]);

	previous_position = [car.x, car.y];
	
	// camera

	this.cameras.main.setScroll(car_body.GetPosition().x * SCALE - 300, car_body.GetPosition().y * SCALE - 300);

	// keep text position fixed

	speed_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 20);
	distance_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 50);
	current_generation_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 70);
	current_individual_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 90);


	// neural network

	// var lsv = 0, rsv = 0, csv = 0;

	// if (left_sensor_intersections >= 1)
	// 	lsv = 1;
	// if (right_sensor_intersections >= 1)
	// 	rsv = 1;
	// if (center_sensor_intersections >= 1)
	// 	csv = 1;

	sensors_text.setText("Sensors: " + lsv + ", " + csv + ", " + rsv);
	sensors_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 110);

	var input_layer = [
		[lsv, csv, rsv]
	];

	var output = output_layer(input_layer, current_individual);
	var steering = 0;
	var acceleration = 0;

	// if (output[0][0] >= 0.5 && output[0][1] < 0.5) {
	// 	steering = -1;
	// 	// steering_text.setText("Steering: Left");
	// } else if (output[0][1] >= 0.5 && output[0][0] < 0.5) {
	// 	steering = 1;
	// 	// steering_text.setText("Steering: Right");
	// } else {
	// 	// steering_text.setText("Steering: Straight");
	// }

	steering_text.setText("Steering: " + Math.round(output[0][0] * 100) / 100 + ", " + Math.round(output[0][1] * 100) / 100);
	
	steering_text.setPosition(this.cameras.main.scrollX + 5, this.cameras.main.scrollY + 130);

	// if (output[0][2] >= 0.5)
	// 	acceleration = 1;

	// console.log(output[0][0]);
	// console.log(output[0][1]);
	// console.log(output[0][2]);

	// physics

	world.Step(1 / 30, delta, delta);
	world.DrawDebugData();
	world.ClearForces();

	// wheel views

	front_axle_view.rotation = front_axle.GetAngle() - car_body.GetAngle();

	// ball view

	ball_view.x = ball.GetPosition().x * SCALE;
	ball_view.y = ball.GetPosition().y * SCALE;
	ball_view.setAngle(rad_to_deg(ball.GetAngle()));

	// car view

	car.x = car_body.GetPosition().x * SCALE;
	car.y = car_body.GetPosition().y * SCALE;
	car.setRotation(car_body.GetAngle());

	// setup input

	cursors = this.input.keyboard.createCursorKeys();

	// movement

	acceration_force = 30;

	if (cursors.up.isDown || acceleration == 1) {
		front_axle.ApplyForce(
			new Vec2(
				Math.sin(front_axle.GetAngle()) * acceration_force,
				-Math.cos(front_axle.GetAngle()) * acceration_force
			),
			front_axle.GetWorldCenter()
		);
	} else if (cursors.down.isDown) {
		front_axle.ApplyForce(
			new Vec2(
				-Math.sin(front_axle.GetAngle()) * acceration_force,
				Math.cos(front_axle.GetAngle()) * acceration_force
			),
			front_axle.GetWorldCenter()
		);
	} else {
		
	}

	// steering

	torque = 0.3;

	if (cursors.left.isDown || steering == -1) {
		front_axle_joint.SetMotorSpeed(-torque);
	} else if (cursors.right.isDown || steering == 1) {
		front_axle_joint.SetMotorSpeed(torque);
	} else {
		if (front_axle_joint.GetJointAngle() != 0) {
			if (front_axle_joint.GetJointAngle() > 0)
				front_axle_joint.SetMotorSpeed(-torque);
			else
				front_axle_joint.SetMotorSpeed(torque);
		}
	}

	// console.log(speed);
}

function gameover(scene, time) {
	scene.scene.restart();

	let average_speed = total_distance / ((scene.time.now - starting_time) / 1000);
	let fitness_value = total_distance * average_speed;

	console.log(fitness_value);

	model = set_fitness(fitness_value, current_individual_index, model);

	current_individual_index = increment(current_individual_index, model);

	// next individual is the first one from new generation
	if (current_individual_index[0] != 0 && current_individual_index[1] == 0) {
		model = new_generation(model);

		console.log("New generation!");

		console.log(model);

		// scene.scene.stop();

		return;
	}

	current_individual = get_individual(current_individual_index, model);
}
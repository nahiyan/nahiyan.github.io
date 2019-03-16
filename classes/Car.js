// jshint esversion: 6

class Car {
	constructor(world) {
		addToWorld(world);

		this.nn = undefined;
		this.fitness = undefined;
	}

	addToWorld(world) {
		// car body

		var car_body_shape = new box2d.b2PolygonShape();
		car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);

		var car_body_fix_def = new box2d.b2FixtureDef();
		car_body_fix_def.shape = car_body_shape;
		car_body_fix_def.density = 10;
		car_body_fix_def.userData = "car";

		var car_body_def = new box2d.b2BodyDef();
		car_body_def.position = new Vec2(180 / SCALE, 300 / SCALE);
		car_body_def.type = box2d.b2Body.b2_dynamicBody;
		car_body_def.linearDamping = 10;
		car_body_def.angularDamping = 10;

		car_body = world.CreateBody(car_body_def);
		car_body.CreateFixture(car_body_fix_def);

		// front axle

		var front_axle_shape = new box2d.b2PolygonShape();
		front_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);

		var front_axle_fix_def = new box2d.b2FixtureDef();
		front_axle_fix_def.shape = front_axle_shape;
		front_axle_fix_def.density = 1;
		front_axle_fix_def.userData = "car";

		var front_axle_wheel_left_shape = new box2d.b2PolygonShape();
		front_axle_wheel_left_shape.SetAsOrientedBox(
			2 / SCALE,
			10 / SCALE,
			new Vec2(-27 / SCALE, 0 / SCALE)
		);

		var front_axle_wheel_right_shape = new box2d.b2PolygonShape();
		front_axle_wheel_right_shape.SetAsOrientedBox(
			2 / SCALE,
			10 / SCALE,
			new Vec2(27 / SCALE, 0 / SCALE)
		);

		var front_axle_wheel_left_fix_def = new box2d.b2FixtureDef();
		front_axle_wheel_left_fix_def.shape = front_axle_wheel_left_shape;
		front_axle_wheel_left_fix_def.density = 1;
		front_axle_wheel_left_fix_def.userData = "car";

		var front_axle_wheel_right_fix_def = new box2d.b2FixtureDef();
		front_axle_wheel_right_fix_def.shape = front_axle_wheel_right_shape;
		front_axle_wheel_right_fix_def.density = 1;
		front_axle_wheel_right_fix_def.userData = "car";

		var front_axle_def = new box2d.b2BodyDef();
		front_axle_def.position = new Vec2(180 / SCALE, 270 / SCALE);
		front_axle_def.type = box2d.b2Body.b2_dynamicBody;

		front_axle = world.CreateBody(front_axle_def);
		front_axle.CreateFixture(front_axle_fix_def);
		front_axle.CreateFixture(front_axle_wheel_left_fix_def);
		front_axle.CreateFixture(front_axle_wheel_right_fix_def);

		// rear axle

		var rear_axle_shape = new box2d.b2PolygonShape();
		rear_axle_shape.SetAsBox(25 / SCALE, 2 / SCALE);

		var rear_axle_fix_def = new box2d.b2FixtureDef();
		rear_axle_fix_def.shape = rear_axle_shape;
		rear_axle_fix_def.density = 1;
		rear_axle_fix_def.userData = "car";

		var rear_axle_wheel_left_shape = new box2d.b2PolygonShape();
		rear_axle_wheel_left_shape.SetAsOrientedBox(
			2 / SCALE,
			10 / SCALE,
			new Vec2(-27 / SCALE, 0 / SCALE)
		);

		var rear_axle_wheel_right_shape = new box2d.b2PolygonShape();
		rear_axle_wheel_right_shape.SetAsOrientedBox(
			2 / SCALE,
			10 / SCALE,
			new Vec2(27 / SCALE, 0 / SCALE));

		var rear_axle_wheel_left_fix_def = new box2d.b2FixtureDef();
		rear_axle_wheel_left_fix_def.shape = rear_axle_wheel_left_shape;
		rear_axle_wheel_left_fix_def.density = 1;
		rear_axle_wheel_left_fix_def.userData = "car";

		var rear_axle_wheel_right_fix_def = new box2d.b2FixtureDef();
		rear_axle_wheel_right_fix_def.shape = rear_axle_wheel_right_shape;
		rear_axle_wheel_right_fix_def.density = 1;
		rear_axle_wheel_right_fix_def.userData = "car";

		var rear_axle_def = new box2d.b2BodyDef();
		rear_axle_def.position = new Vec2(180 / SCALE, 330 / SCALE);
		rear_axle_def.type = box2d.b2Body.b2_dynamicBody;

		var rear_axle = world.CreateBody(rear_axle_def);
		rear_axle.CreateFixture(rear_axle_fix_def);
		rear_axle.CreateFixture(rear_axle_wheel_left_fix_def);
		rear_axle.CreateFixture(rear_axle_wheel_right_fix_def);


		// front axle and car body joint

		var front_axle_and_car_joint_def = new box2d.b2RevoluteJointDef();
		front_axle_and_car_joint_def.Initialize(
			car_body, front_axle, front_axle.GetPosition());

		front_axle_and_car_joint_def.motorSpeed = 0;
		front_axle_and_car_joint_def.maxMotorTorque = 50;
		front_axle_and_car_joint_def.enableMotor = true;
		front_axle_and_car_joint_def.upperAngle = deg_to_rad(15);
		front_axle_and_car_joint_def.lowerAngle = deg_to_rad(-15);
		front_axle_and_car_joint_def.enableLimit = true;

		front_axle_joint = world.CreateJoint(front_axle_and_car_joint_def);

		// rear axle and car body joint

		var rear_axle_and_car_joint_def = new box2d.b2RevoluteJointDef();
		rear_axle_and_car_joint_def.Initialize(
			car_body, rear_axle, rear_axle.GetPosition());

		rear_axle_and_car_joint_def.motorSpeed = 2;
		rear_axle_and_car_joint_def.maxMotorTorque = 20;
		rear_axle_and_car_joint_def.enableMotor = false;
		rear_axle_and_car_joint_def.upperAngle = deg_to_rad(0);
		rear_axle_and_car_joint_def.lowerAngle = deg_to_rad(0);
		rear_axle_and_car_joint_def.enableLimit = true;

		var rear_axle_joint = world.CreateJoint(rear_axle_and_car_joint_def);
	}

	step() {

	}
}
function setup_physics(scene) {
	// world

	world = new box2d.b2World(new Vec2(0, 0), true);

	// ball

	var ball_body_def = new box2d.b2BodyDef();
	ball_body_def.type = box2d.b2Body.b2_dynamicBody;
	ball_body_def.position = new Vec2(300 / SCALE, 200 / SCALE);

	var ball_shape = new box2d.b2CircleShape(16 / SCALE);

	var ball_fix_def = new box2d.b2FixtureDef();
	ball_fix_def.density = 5;
	ball_fix_def.friction = 0.5;
	ball_fix_def.shape = ball_shape;
	ball_fix_def.restitution = 0.3;
	ball_fix_def.linearDamping = 10;

	ball = world.CreateBody(ball_body_def);
	ball.CreateFixture(ball_fix_def);

	// ground

	var ground_body_def = new box2d.b2BodyDef();
	ground_body_def.type = box2d.b2Body.b2_staticBody;
	ground_body_def.position = new Vec2(250 / SCALE, 490 / SCALE);

	var ground_shape = new box2d.b2PolygonShape();
	ground_shape.SetAsBox((ground_width / 2) / SCALE, (ground_height / 2) / SCALE);

	var ground_fix_def = new box2d.b2FixtureDef();
	ground_fix_def.shape = ground_shape;

	ground = world.CreateBody(ground_body_def);
	ground.CreateFixture(ground_fix_def);

	// car body

	var car_body_shape = new box2d.b2PolygonShape();
	car_body_shape.SetAsBox(23 / SCALE, 50 / SCALE);

	var car_body_fix_def = new box2d.b2FixtureDef();
	car_body_fix_def.shape = car_body_shape;
	car_body_fix_def.density = 10;
	car_body_fix_def.userData = "car";

	var car_body_def = new box2d.b2BodyDef();
	car_body_def.position = new Vec2(200 / SCALE, 300 / SCALE);
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
	front_axle_def.position = new Vec2(200 / SCALE, 270 / SCALE);
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
	rear_axle_def.position = new Vec2(200 / SCALE, 330 / SCALE);
	rear_axle_def.type = box2d.b2Body.b2_dynamicBody;

	var rear_axle = world.CreateBody(rear_axle_def);
	rear_axle.CreateFixture(rear_axle_fix_def);
	rear_axle.CreateFixture(rear_axle_wheel_left_fix_def);
	rear_axle.CreateFixture(rear_axle_wheel_right_fix_def);


	// front axle and car body joint

	var front_axle_and_car_joint_def = new box2d.b2RevoluteJointDef();
	front_axle_and_car_joint_def.Initialize(
		car_body, front_axle, front_axle.GetPosition());

	front_axle_and_car_joint_def.motorSpeed = 5;
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

	// debug draw

	debug_draw = new box2d.b2DebugDraw();
	debug_draw.SetSprite(document.getElementById("debug").getContext('2d'));
	debug_draw.SetDrawScale(SCALE);
	debug_draw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debug_draw);

	// road track

	var road_tracks_left = new RoadTrack(world, game.scene.scenes[0]);

	road_tracks_left.addSegment([100, 415], deg_to_rad(0));
	road_tracks_left.addSegment([-7, 2], deg_to_rad(-10));
	road_tracks_left.addSegment([5, 2], deg_to_rad(10));
	road_tracks_left.addSegment([40, 5], deg_to_rad(20));
	road_tracks_left.addSegment([40, 5], deg_to_rad(10));
	road_tracks_left.addSegment([5, 5], deg_to_rad(-10));
	road_tracks_left.addSegment([-33, 7], deg_to_rad(-20));
	road_tracks_left.addSegment([-63, 20], deg_to_rad(-40));
	road_tracks_left.addSegment([-94, 41], deg_to_rad(-50));
	road_tracks_left.addSegment([-75, 30], deg_to_rad(-20));
	road_tracks_left.addSegment([-19, 7], deg_to_rad(0));
	road_tracks_left.addSegment([28, 7], deg_to_rad(20));
	road_tracks_left.addSegment([63, 15], deg_to_rad(30));
	road_tracks_left.addSegment([88, 31], deg_to_rad(45));
	road_tracks_left.addSegment([105, 55], deg_to_rad(55));

	var road_tracks_right = new RoadTrack(world, game.scene.scenes[0]);

	road_tracks_right.addSegment([270, 415], deg_to_rad(0));
	road_tracks_right.addSegment([-7, 2], deg_to_rad(-10));
	road_tracks_right.addSegment([5, 2], deg_to_rad(10));
	road_tracks_right.addSegment([40, 5], deg_to_rad(20));
	road_tracks_right.addSegment([40, 5], deg_to_rad(10));
	road_tracks_right.addSegment([5, 5], deg_to_rad(-10));
	road_tracks_right.addSegment([-33, 7], deg_to_rad(-20));
	road_tracks_right.addSegment([-63, 20], deg_to_rad(-40));
	road_tracks_right.addSegment([-94, 41], deg_to_rad(-50));
	road_tracks_right.addSegment([-75, 30], deg_to_rad(-20));
	road_tracks_right.addSegment([-19, 7], deg_to_rad(0));
	road_tracks_right.addSegment([28, 7], deg_to_rad(20));
	road_tracks_right.addSegment([73, 21], deg_to_rad(40));
	road_tracks_right.addSegment([105, 47], deg_to_rad(55));
}
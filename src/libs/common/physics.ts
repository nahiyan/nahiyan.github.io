let world: any;

function setup_physics(scene: any) {
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

	var ball = world.CreateBody(ball_body_def);
	ball.CreateFixture(ball_fix_def);

	// ground

	// var ground_body_def = new box2d.b2BodyDef();
	// ground_body_def.type = box2d.b2Body.b2_staticBody;
	// ground_body_def.position = new Vec2(250 / SCALE, 490 / SCALE);

	// var ground_shape = new box2d.b2PolygonShape();
	// ground_shape.SetAsBox((ground_width / 2) / SCALE, (ground_height / 2) / SCALE);

	// var ground_fix_def = new box2d.b2FixtureDef();
	// ground_fix_def.shape = ground_shape;

	// var ground = world.CreateBody(ground_body_def);
	// ground.CreateFixture(ground_fix_def);

	// debug draw

	var debug_draw = new box2d.b2DebugDraw();
	debug_draw.SetSprite((document.getElementById("debug") as HTMLCanvasElement).getContext('2d'));
	debug_draw.SetDrawScale(SCALE);
	debug_draw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debug_draw);

	// contact listener

	var contact_listener = new box2d.b2ContactListener();
	contact_listener.BeginContact = function(c) {
		if (c.GetFixtureA().GetUserData() == "car" && c.GetFixtureB().GetUserData() == "track")
			gameover(scene, scene.time.now());
	};

	// contact_listener.EndContact = function(c) {
		
	// };

	world.SetContactListener(contact_listener);

	// road track

	let road_tracks_left: RoadTrackModel = {
		h: 70,
		w: 2,
		relative_position: [0, 0],
		scene: scene
	}

	road_tracks_left = add_road_track_segment(road_tracks_left, [100, 415], deg_to_rad(0));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-7, 2], deg_to_rad(-10));
	road_tracks_left = add_road_track_segment(road_tracks_left, [5, 2], deg_to_rad(10));
	road_tracks_left = add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(20));
	road_tracks_left = add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(10));
	road_tracks_left = add_road_track_segment(road_tracks_left, [5, 5], deg_to_rad(-10));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-33, 7], deg_to_rad(-20));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-63, 20], deg_to_rad(-40));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-94, 41], deg_to_rad(-50));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-75, 30], deg_to_rad(-20));
	road_tracks_left = add_road_track_segment(road_tracks_left, [-19, 7], deg_to_rad(0));
	road_tracks_left = add_road_track_segment(road_tracks_left, [28, 7], deg_to_rad(20));
	road_tracks_left = add_road_track_segment(road_tracks_left, [63, 15], deg_to_rad(30));
	road_tracks_left = add_road_track_segment(road_tracks_left, [88, 31], deg_to_rad(45));
	road_tracks_left = add_road_track_segment(road_tracks_left, [105, 55], deg_to_rad(55));

	var road_tracks_right: RoadTrackModel = {
		h: 70,
		w: 2,
		relative_position: [0, 0],
		scene: scene
	}

	road_tracks_right = add_road_track_segment(road_tracks_right, [270, 415], deg_to_rad(0));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-7, 2], deg_to_rad(-10));
	road_tracks_right = add_road_track_segment(road_tracks_right, [5, 2], deg_to_rad(10));
	road_tracks_right = add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(20));
	road_tracks_right = add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(10));
	road_tracks_right = add_road_track_segment(road_tracks_right, [5, 5], deg_to_rad(-10));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-33, 7], deg_to_rad(-20));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-63, 20], deg_to_rad(-40));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-94, 41], deg_to_rad(-50));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-75, 30], deg_to_rad(-20));
	road_tracks_right = add_road_track_segment(road_tracks_right, [-19, 7], deg_to_rad(0));
	road_tracks_right = add_road_track_segment(road_tracks_right, [28, 7], deg_to_rad(20));
	road_tracks_right = add_road_track_segment(road_tracks_right, [73, 21], deg_to_rad(40));
	road_tracks_right = add_road_track_segment(road_tracks_right, [105, 47], deg_to_rad(55));
}
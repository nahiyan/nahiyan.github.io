function prepare_world(scene: any): any {
	// world

	let world: any = new box2d.b2World(new Vec2(0, 0), true);

	// debug draw

	// var debug_draw = new box2d.b2DebugDraw();
	// debug_draw.SetSprite((document.getElementById("debug") as HTMLCanvasElement).getContext('2d'));
	// debug_draw.SetDrawScale(SCALE);
	// debug_draw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	// world.SetDebugDraw(debug_draw);

	// contact listener

	var contact_listener = new box2d.b2ContactListener();
	contact_listener.BeginContact = function(c) {
		const a: any = JSON.parse(c.GetFixtureA().GetUserData());
		const b: any = JSON.parse(c.GetFixtureB().GetUserData());

		if (a["type"] == "car" && b["type"] == "track") {
			const car: Car = sm.generations[a["generation_index"]].cars[a["car_index"]];

			mark_car_for_destruction(car);
		}
	};

	world.SetContactListener(contact_listener);

	// road track

	let road_tracks_left: RoadTrackModel = {
		h: 70,
		w: 2,
		relative_position: [110, 300],
		scene: scene,
		world: world
	}

	var road_tracks_right: RoadTrackModel = {
		h: 70,
		w: 2,
		relative_position:
			[
				road_tracks_left.relative_position[0] + 130,
				road_tracks_left.relative_position[1]
			],
		scene: scene,
		world: world
	}

	add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));
	
	add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));

	add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));

	add_road_track_segment(road_tracks_left, [-18, 5], deg_to_rad(-15));
	add_road_track_segment(road_tracks_right, [-18, 5], deg_to_rad(-15));

	add_road_track_segment(road_tracks_left, [-18 * 2, 5 * 2], deg_to_rad(-15));
	add_road_track_segment(road_tracks_right, [-18 * 2, 5 * 2], deg_to_rad(-15));

	add_road_track_segment(road_tracks_left, [-18 * 2, 5 * 2], deg_to_rad(-15));
	add_road_track_segment(road_tracks_right, [-18 * 2, 5 * 2], deg_to_rad(-15));

	add_road_track_segment(road_tracks_left, [-18, 5], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [-18, 5], deg_to_rad(0));

	add_road_track_segment(road_tracks_left, [0, 0], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [0, 0], deg_to_rad(0));

	add_road_track_segment(road_tracks_left, [18, 5], deg_to_rad(15));
	add_road_track_segment(road_tracks_right, [18, 5], deg_to_rad(15));

	add_road_track_segment(road_tracks_left, [16 * 3, 5 * 2], deg_to_rad(25));
	add_road_track_segment(road_tracks_right, [16 * 3, 5 * 2], deg_to_rad(25));

	add_road_track_segment(road_tracks_left, [17 * 4, 5 * 4], deg_to_rad(35));
	add_road_track_segment(road_tracks_right, [15 * 5 + 2, 5 * 6], deg_to_rad(45));

	add_road_track_segment(road_tracks_left, [18 * 5 - 2, 5 * 7], deg_to_rad(45));
	add_road_track_segment(road_tracks_right, [19 * 6, 5 * 14 + 3], deg_to_rad(75));

	add_road_track_segment(road_tracks_left, [18 * 7 - 10, 5 * 15 - 2], deg_to_rad(75));
	add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 25 - 2], deg_to_rad(90));
	add_road_track_segment(road_tracks_right, [19 * 7, 5 * 24 + 1], deg_to_rad(90));

	add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 28], deg_to_rad(90));
	add_road_track_segment(road_tracks_right, [19 * 7, 5 * 27 + 5], deg_to_rad(90));

	add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 28], deg_to_rad(90));
	add_road_track_segment(road_tracks_right, [19 * 7, 5 * 27 + 5], deg_to_rad(90));

	add_road_track_segment(road_tracks_left, [18 * 8 - 6, 5 * 31 + 2], deg_to_rad(105));
	add_road_track_segment(road_tracks_left, [18 * 8 - 15, 5 * 37 + 3], deg_to_rad(115));
	add_road_track_segment(road_tracks_right, [19 * 7, 5 * 33 + 7], deg_to_rad(115));

	add_road_track_segment(road_tracks_left, [110, 220], deg_to_rad(135));
	add_road_track_segment(road_tracks_right, [110, 220], deg_to_rad(135));

	add_road_track_segment(road_tracks_left, [65, 255], deg_to_rad(165));
	add_road_track_segment(road_tracks_right, [65, 255], deg_to_rad(165));

	add_road_track_segment(road_tracks_left, [25, 275], deg_to_rad(175));
	add_road_track_segment(road_tracks_right, [17, 275], deg_to_rad(180));

	add_road_track_segment(road_tracks_left, [28, 275], deg_to_rad(160));
	add_road_track_segment(road_tracks_right, [22, 275], deg_to_rad(160));

	add_road_track_segment(road_tracks_left, [75, 250], deg_to_rad(130));
	add_road_track_segment(road_tracks_right, [74, 250], deg_to_rad(130));

	add_road_track_segment(road_tracks_left, [95, 130], deg_to_rad(40));
	add_road_track_segment(road_tracks_right, [120, 210], deg_to_rad(110));
	add_road_track_segment(road_tracks_right, [125, 130], deg_to_rad(60));
	add_road_track_segment(road_tracks_right, [95, 45], deg_to_rad(30));

	add_road_track_segment(road_tracks_left, [65, 25], deg_to_rad(20));
	add_road_track_segment(road_tracks_right, [60, 13], deg_to_rad(20));

	add_road_track_segment(road_tracks_left, [22, 5], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [30, 5], deg_to_rad(5));

	// 2nd part

	road_tracks_left.relative_position[0] = 1500;
	road_tracks_left.relative_position[1] = -980;
	road_tracks_right.relative_position[0] = road_tracks_left.relative_position[0] + 130;
	road_tracks_right.relative_position[1] = road_tracks_left.relative_position[1];

	add_road_track_segment(road_tracks_left, [-7, 2 + 2], deg_to_rad(-10));
	add_road_track_segment(road_tracks_right, [-7, 2], deg_to_rad(-10));

	add_road_track_segment(road_tracks_left, [5 - 4, 2 + 2 * 2], deg_to_rad(10));
	add_road_track_segment(road_tracks_right, [5 - 4, 2], deg_to_rad(10));

	add_road_track_segment(road_tracks_left, [40 - 2 * 3, 5 + 2], deg_to_rad(20));
	add_road_track_segment(road_tracks_right, [40 - 2 * 3, 5], deg_to_rad(20));


	add_road_track_segment(road_tracks_left, [40 - 2 * 3, 5 + 2], deg_to_rad(10));
	add_road_track_segment(road_tracks_right, [40 - 2 * 3, 5], deg_to_rad(10));


	add_road_track_segment(road_tracks_left, [5 - 2 * 3, 5 + 2], deg_to_rad(-10));
	add_road_track_segment(road_tracks_right, [5 - 2 * 3, 5], deg_to_rad(-10));

	add_road_track_segment(road_tracks_left, [-33 - 2 * 2, 7 + 2], deg_to_rad(-20));
	add_road_track_segment(road_tracks_right, [-33 - 2 * 2, 7], deg_to_rad(-20));

	add_road_track_segment(road_tracks_left, [-63 - 2 * 3, 20 + 2], deg_to_rad(-40));
	add_road_track_segment(road_tracks_right, [-63 - 2 * 3, 20], deg_to_rad(-40));

	add_road_track_segment(road_tracks_left, [-94 - 2 * 3, 41 + 2], deg_to_rad(-50));
	add_road_track_segment(road_tracks_right, [-94 - 2 * 2, 41 + 2], deg_to_rad(-50));

	add_road_track_segment(road_tracks_left, [-75 + 2 * 1, 30 + 2], deg_to_rad(-20));
	add_road_track_segment(road_tracks_right, [-75 - 2, 30], deg_to_rad(-20));

	add_road_track_segment(road_tracks_left, [-19 - 2 * 2, 7 + 2], deg_to_rad(0));
	add_road_track_segment(road_tracks_right, [-19 - 2 * 3, 7], deg_to_rad(0));

	add_road_track_segment(road_tracks_left, [28 - 2 * 3, 7 + 2], deg_to_rad(20));
	add_road_track_segment(road_tracks_right, [28 - 2 * 3, 7], deg_to_rad(20));

	add_road_track_segment(road_tracks_left, [63 - 2 * 3, 15 + 2], deg_to_rad(30));
	add_road_track_segment(road_tracks_right, [73 - 2 * 3, 21], deg_to_rad(40));

	add_road_track_segment(road_tracks_left, [88 - 2 * 3, 31 + 2], deg_to_rad(45));
	add_road_track_segment(road_tracks_left, [105 - 2, 55], deg_to_rad(55));
	add_road_track_segment(road_tracks_right, [105 - 2, 47], deg_to_rad(55));

	return world;
}
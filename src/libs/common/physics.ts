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

		// if ()
		// 	remove_car_from_world(sm, c);
	};

	// contact_listener.EndContact = function(c) {
		
	// };

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

	// left

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
	add_road_track_segment(road_tracks_right, [19 * 7, 5 * 24 + 1], deg_to_rad(90));

	// add_road_track_segment(road_tracks_left, [-7, 2], deg_to_rad(-10));
	// add_road_track_segment(road_tracks_left, [5, 2], deg_to_rad(10));
	// add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(20));
	// add_road_track_segment(road_tracks_left, [40, 5], deg_to_rad(10));
	// add_road_track_segment(road_tracks_left, [5, 5], deg_to_rad(-10));
	// add_road_track_segment(road_tracks_left, [-33, 7], deg_to_rad(-20));
	// add_road_track_segment(road_tracks_left, [-63, 20], deg_to_rad(-40));
	// add_road_track_segment(road_tracks_left, [-94, 41], deg_to_rad(-50));
	// add_road_track_segment(road_tracks_left, [-75, 30], deg_to_rad(-20));
	// add_road_track_segment(road_tracks_left, [-19, 7], deg_to_rad(0));
	// add_road_track_segment(road_tracks_left, [28, 7], deg_to_rad(20));
	// add_road_track_segment(road_tracks_left, [63, 15], deg_to_rad(30));
	// add_road_track_segment(road_tracks_left, [88, 31], deg_to_rad(45));
	// add_road_track_segment(road_tracks_left, [105, 55], deg_to_rad(55));
	
	// add_road_track_segment(road_tracks_right, [-7, 2], deg_to_rad(-10));
	// add_road_track_segment(road_tracks_right, [5, 2], deg_to_rad(10));
	// add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(20));
	// add_road_track_segment(road_tracks_right, [40, 5], deg_to_rad(10));
	// add_road_track_segment(road_tracks_right, [5, 5], deg_to_rad(-10));
	// add_road_track_segment(road_tracks_right, [-33, 7], deg_to_rad(-20));
	// add_road_track_segment(road_tracks_right, [-63, 20], deg_to_rad(-40));
	// add_road_track_segment(road_tracks_right, [-94, 41], deg_to_rad(-50));
	// add_road_track_segment(road_tracks_right, [-75, 30], deg_to_rad(-20));
	// add_road_track_segment(road_tracks_right, [-19, 7], deg_to_rad(0));
	// add_road_track_segment(road_tracks_right, [28, 7], deg_to_rad(20));
	// add_road_track_segment(road_tracks_right, [73, 21], deg_to_rad(40));
	// add_road_track_segment(road_tracks_right, [105, 47], deg_to_rad(55));

	return world;
}
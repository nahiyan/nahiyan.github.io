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
		relative_position: [0, 0],
		scene: scene,
		world: world
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
		scene: scene,
		world: world
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

	return world;
}
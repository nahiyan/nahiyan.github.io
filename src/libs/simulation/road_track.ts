interface RoadTrackModel {
	h: number;
	w: number;
	relative_position: number[];
	scene: any;
	world: any;
}

function clone_road_track_model(model: RoadTrackModel): RoadTrackModel {
	return {
		h: model.h,
		w: model.w,
		relative_position: model.relative_position,
		scene: model.scene,
		world: model.world
	};
}

function add_road_track_segment(model: RoadTrackModel, position: number[], angle: number): RoadTrackModel {
	let new_model = clone_road_track_model(model);

	new_model.relative_position[0] += position[0];
	new_model.relative_position[1] += position[1];

	var segment_def = new box2d.b2BodyDef();
	segment_def.position = new Vec2(
		new_model.relative_position[0] / SCALE,
		new_model.relative_position[1] / SCALE
	);
	segment_def.angle = angle;

	var segment = model.world.CreateBody(segment_def);

	var segment_fix_def = new box2d.b2FixtureDef();
	segment_fix_def.shape = new box2d.b2PolygonShape();
	segment_fix_def.shape.SetAsBox(new_model.w / SCALE, new_model.h / SCALE);
	segment_fix_def.density = 1;
	segment_fix_def.userData = "track";

	segment.CreateFixture(segment_fix_def);

	var rectangle = new_model.scene.add.rectangle(
		new_model.relative_position[0],
		new_model.relative_position[1],
		new_model.w * 2,
		new_model.h * 2,
		0x007bff
	);
	rectangle.angle = angle * (180 / Math.PI);


	new_model.relative_position[0] -= new_model.w * 2;
	new_model.relative_position[1] -= new_model.h * 2;

	return new_model;
}

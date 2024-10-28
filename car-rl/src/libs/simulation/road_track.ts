interface RoadTrackModel {
	h: number;
	w: number;
	relative_position: number[];
	scene: any;
	world: any;
}

// function clone_road_track_model(model: RoadTrackModel): RoadTrackModel {
// 	return {
// 		h: model.h,
// 		w: model.w,
// 		relative_position: model.relative_position,
// 		scene: model.scene,
// 		world: model.world
// 	};
// }

function add_road_track_segment(model: RoadTrackModel, position: number[], angle: number): RoadTrackModel {
	model.relative_position[0] += position[0];
	model.relative_position[1] += position[1];

	var segment_def = new box2d.b2BodyDef();
	segment_def.position = new Vec2(
		model.relative_position[0] / SCALE,
		model.relative_position[1] / SCALE
	);
	segment_def.angle = angle;

	var segment = model.world.CreateBody(segment_def);

	var segment_fix_def = new box2d.b2FixtureDef();
	segment_fix_def.shape = new box2d.b2PolygonShape();
	segment_fix_def.shape.SetAsBox(model.w / SCALE, model.h / SCALE);
	segment_fix_def.density = 1;
	segment_fix_def.userData = '{ "type": "track" }';
	segment_fix_def.filter.categoryBits = category.track;
	segment_fix_def.filter.maskBits = mask.track;

	segment.CreateFixture(segment_fix_def);

	var rectangle = model.scene.add.rectangle(
		model.relative_position[0],
		model.relative_position[1],
		model.w * 2,
		model.h * 2,
		0x007bff
	);
	rectangle.rotation = angle;


	// model.relative_position[0] -= model.w;
	model.relative_position[1] -= model.h * 2;

	return model;
}

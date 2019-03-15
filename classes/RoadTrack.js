// jshint esversion: 6

class RoadTrack {
	constructor(world, scene) {
		this.world = world;
		this.scene = scene;
		this.relative_position = [0, 0];
		this.w = 2;
		this.h = 70;
	}

	addSegment(position, angle) {
		this.relative_position[0] += position[0];
		this.relative_position[1] += position[1];

		var segment_def = new box2d.b2BodyDef();
		segment_def.position = new Vec2(
			this.relative_position[0] / SCALE,
			this.relative_position[1] / SCALE
		);
		segment_def.angle = angle;

		var segment = this.world.CreateBody(segment_def);

		var segment_fix_def = new box2d.b2FixtureDef();
		segment_fix_def.shape = new box2d.b2PolygonShape();
		segment_fix_def.shape.SetAsBox(this.w / SCALE, this.h / SCALE);
		segment_fix_def.density = 1;
		segment_fix_def.userData = "track";

		segment.CreateFixture(segment_fix_def);

		var rectangle = this.scene.add.rectangle(
			this.relative_position[0],
			this.relative_position[1],
			this.w * 2,
			this.h * 2,
			0x007bff
		);
		rectangle.angle = angle * (180 / Math.PI);


		this.relative_position[0] -= this.w * 2;
		this.relative_position[1] -= this.h * 2;
	}
}
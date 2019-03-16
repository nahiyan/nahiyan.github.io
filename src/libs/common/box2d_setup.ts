declare var Box2D:any;

interface Box2DCollection {
	b2Vec2: any,
	b2BodyDef: any,
	b2Body: any,
	b2FixtureDef: any,
	b2Fixture: any,
	b2World: any,
	b2MassData: any,
	b2PolygonShape: any,
	b2CircleShape: any,
	b2RevoluteJointDef: any,
	b2DebugDraw: any,
	b2Contact: any,
	b2ContactListener: any
}

var box2d:Box2DCollection = {
	b2Vec2: Box2D.Common.Math.b2Vec2,
	b2BodyDef: Box2D.Dynamics.b2BodyDef,
	b2Body: Box2D.Dynamics.b2Body,
	b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
	b2Fixture: Box2D.Dynamics.b2Fixture,
	b2World: Box2D.Dynamics.b2World,
	b2MassData: Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
	b2RevoluteJointDef: Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2DebugDraw: Box2D.Dynamics.b2DebugDraw,
	b2Contact: Box2D.Dynamics.Contacts,
	b2ContactListener: Box2D.Dynamics.b2ContactListener
};

let SCALE: number = 30;
let Vec2: any = box2d.b2Vec2;
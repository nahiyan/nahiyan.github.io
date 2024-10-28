declare var Phaser: any;

let fps: number = 30;

var config: object = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: fps
};

let PVec2: any = Phaser.Math.Vector2;

interface Generation {
	cars: Car[];
    time: number;
}

interface SimulationModel {
	generations: Generation[];
	current_generation_index: number;
    population_size: number;
    layer_sizes: number[];
    world: any;
    scene: any;
    paused: boolean;
    human_controlled_car?: Car;
    show_sensors: boolean;
}

interface Category {
    car: number,
    track: number
}

interface Mask {
    car: number,
    track: number
}

interface DestructionQueue {
    queue: Car[]
}

let sm: SimulationModel;

let game: any = new Phaser.Game(config);
let cursors: any;

const category: Category = {
    car: 0x0001,
    track: 0x0002
};

const mask: Mask = {
    car: category.track,
    track: category.car
};

let dq: DestructionQueue = {
    queue: []
};

let furthest_car: Car;

let distance_text: any;
let speed_text: any;
let current_generation_text: any;
let best_fit_car_sensors_text: any;

document.addEventListener("keyup", function(e) {
    if (e.keyCode == 32)
        if (sm.paused) {
            sm.scene.scene.resume();
            sm.paused = false;
        } else {
            sm.scene.scene.pause();
            sm.paused = true;
        }
    else if (e.key == 'h' || e.key == 'H')
        if (sm.human_controlled_car === undefined || sm.human_controlled_car.destroyed) {
            sm.human_controlled_car = furthest_car;
        } else {
            sm.human_controlled_car = undefined;
        }
});
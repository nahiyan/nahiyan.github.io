function clone_nnm(nn: NeuralNetworkModel): NeuralNetworkModel {
    return {
	    weights: nn.weights,
	    biases: nn.biases,
	    layer_sizes: nn.layer_sizes,
	    layers: nn.layers,
	    non_activated_layers: nn.non_activated_layers,
        identity_biases: nn.identity_biases
	};
}

function clone_sm(model: SimulationModel): SimulationModel {
    return {
        generations: model.generations,
        current_generation_index: model.current_generation_index,
        population_size: model.population_size,
        layer_sizes: model.layer_sizes,
        world: model.world,
        scene: model.scene,
        paused: model.paused,
        human_controlled_car: model.human_controlled_car,
        show_sensors: model.show_sensors,
    };
}

function range(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map(i => i + startAt);
}

function len(array): number {
    return array.length;
}

// function clone_model(model) {
//     let new_model = new Evolution(
//         generations = model.generations,
//         population_size = model.population_size,
//         layer_sizes = model.layer_sizes);

//     return new_model;
// }

// function clone(obj) {
//     var copy;

//     // Handle the 3 simple types, and null or undefined
//     if (null == obj || "object" != typeof obj) return obj;

//     // Handle Date
//     if (obj instanceof Date) {
//         copy = new Date();
//         copy.setTime(obj.getTime());
//         return copy;
//     }

//     // Handle Array
//     if (obj instanceof Array) {
//         copy = [];
//         for (var i = 0, len = obj.length; i < len; i++) {
//             copy[i] = clone(obj[i]);
//         }
//         return copy;
//     }

//     // Handle Object
//     if (obj instanceof Object) {
//         copy = {};
//         for (var attr in obj) {
//             if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
//         }
//         return copy;
//     }

//     throw new Error("Unable to copy obj! Its type isn't supported.");
// }

// function generate_weights_and_biases_from_objects(
//     weight_objects, bias_objects, layer_sizes) {
//     var flattened_weights = [],
//         flattened_biases = [];

//     // add layers
//     for (var i in range(len(layer_sizes) - 1)){
//         flattened_weights.push([]);
//         flattened_biases.push([]);
//     }

//     // load the flattened arrays of weights and biases for each layers
//     for (var weight_object in weight_objects) {
//         flattened_weights[int(weight_object.layer)].push(
//             float(weight_object.value));
//     }

//     for (var bias_object in bias_objects) {
//         flattened_biases[int(bias_object.layer)].push(
//             float(bias_object.value));
//     }

//     // reshape the flattened weights and biases
//     var weights = [],
//         biases = [];
    
//     for (var j in range(len(layer_sizes) - 1)){
//         weights.push(
//             nj.array(flattened_weights[j]).reshape(
//                 [layer_sizes[j], layer_sizes[j + 1]]));

//         biases.push(
//             nj.array(flattened_biases[j]).reshape(
//                 [1, layer_sizes[j + 1]]));
//     }

//     return [weights, biases];
// }

declare var nj: any;

function rand_int(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;  
}

function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}

function rad_to_deg(value: number): number {
    // 1 pi rad = 180 deg
    // x rad = (180 / pi) * x

    return value * (180 / Math.PI);
}

function deg_to_rad(value: number): number {
    // 180 deg = 1 pi rad
    // x deg = (1 pi / 180) * x
    return (Math.PI / 180) * value;
}

function gaussian(mean: number, stdev: number) {
    var y2;
    var use_last = false;
    return function(): number {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0) 
           return retval;
       return -retval;
   }
}

function convert_number(old_value: number, old_range: number[], new_range: number[]): number {
    return ( (old_value - old_range[0]) / (old_range[1] - old_range[0]) ) * (new_range[1] - new_range[0]) + new_range[0];
}
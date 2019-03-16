function clone_nn(nn) {
    let new_nn = new NeuralNetwork(
        weights = nn.weights,
        biases = nn.biases,
        layer_sizes = nn.layer_sizes,
        layers = nn.layers,
        non_activated_layers = nn.non_activated_layers);

    new_nn.fitness = nn.fitness;

    return new_nn;
}

function clone_model(model) {
    let new_model = new Evolution(
        generations = model.generations,
        population_size = model.population_size,
        layer_sizes = model.layer_sizes);

    return new_model;
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function generate_weights_and_biases_from_objects(
    weight_objects, bias_objects, layer_sizes) {
    var flattened_weights = [],
        flattened_biases = [];

    // add layers
    for (var i in range(len(layer_sizes) - 1)){
        flattened_weights.push([]);
        flattened_biases.push([]);
    }

    // load the flattened arrays of weights and biases for each layers
    for (var weight_object in weight_objects) {
        flattened_weights[int(weight_object.layer)].push(
            float(weight_object.value));
    }

    for (var bias_object in bias_objects) {
        flattened_biases[int(bias_object.layer)].push(
            float(bias_object.value));
    }

    // reshape the flattened weights and biases
    var weights = [],
        biases = [];
    
    for (var j in range(len(layer_sizes) - 1)){
        weights.push(
            nj.array(flattened_weights[j]).reshape(
                [layer_sizes[j], layer_sizes[j + 1]]));

        biases.push(
            nj.array(flattened_biases[j]).reshape(
                [1, layer_sizes[j + 1]]));
    }

    return [weights, biases];
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
interface NeuralNetworkModel {
    weights: any;
    biases: any;
    layer_sizes: number[];
    layers: any;
    non_activated_layers: any;
    identity_biases: any;
}

// imperative

function random_weights(layer_sizes: number[]): any {
    let weights: any = [];
    let i: any;
    for (i in range(len(layer_sizes))) {
        // skip the first layer, as it has no previous layer
        if(i != 0) {
            weights.push(
                nj.random(
                    layer_sizes[i - 1], layer_sizes[i]).tolist());
        }
    }

    return weights;
}

function random_biases(layer_sizes: number[]): any {
    let biases: any = [];

    let i: any;
    for (i in range(len(layer_sizes))) {
        // skip the first layer, as it has no previous layer
        if(i != 0)
            biases.push(
                nj.random(1, layer_sizes[i]).tolist());
    }

    return biases;
}

// functional

function activate(x: any): any {
    for (var i = 0; i < x.selection.data.length; i++) {
        x.selection.data[i] = sigmoid(x.selection.data[i]);
    }

    return x;
}


function activate_prime(x: number): number {
    return sigmoid_prime(x);
}


// get a specific layer
function layer(i: number, model: NeuralNetworkModel): any {
    return nj.array(model.layers[i]).tolist();
}


// get weights between i and i + 1 layer
function layer_weights(i: number, model: NeuralNetworkModel): any {
    return nj.array(model.weights[i]).tolist();
}


// get biases of i layer
function layer_biases(i: number, model: NeuralNetworkModel): any {
    // offset of -1 since there is no bias for index layer
    return nj.array(model.biases[i - 1]).tolist();
}


// get a specific non-activated version of a layer with index i
function non_activated_layer(i: number, model: NeuralNetworkModel): any {
    // since there's no input layer, index has offset of -1
    return nj.array(model.non_activated_layers[i - 1]).tolist();
}

// simply get the last layer
function last_layer(model: NeuralNetworkModel): any {
    let output_layer_index: number = number_of_layers(model) - 1;

    return nj.array(layer(output_layer_index, model)).tolist();
}

// simply get the last non-activated layer
function last_non_activated_layer(model: NeuralNetworkModel): any {
    var output_layer_index = number_of_layers(model) - 1;

    var last_non_activated_layer = [];
    let i: any;
    for (i in range(number_of_layers(model)))
        last_non_activated_layer.push(layer(i, model));

    return nj.array(non_activated_layer(output_layer_index, model)).tolist();
}


// imperative
function identity(n: any, m: any): any {
    var matrix = [];

    // generate row
    var row = [];
    let j: any;
    for (j in range(m))
        row.push(1);

    // add the rows to the matrix
    let i: any;
    for (i in range(n))
        matrix.push(row);

    return nj.array(matrix).tolist();
}


function previous_layer(i: number, model: NeuralNetworkModel): any {
    layer(i - 1, model);
}


function number_of_layers(model: NeuralNetworkModel): number {
    return len(model.layer_sizes);
}


function number_of_input_layers(model: NeuralNetworkModel): number {
    return len(model.layers[0]);
}


// get output layer from input layer
function output_layer(input_layer: any, model: NeuralNetworkModel): any {
    let new_model: NeuralNetworkModel = clone_nnm(model);
    new_model.layers = [input_layer];

    return last_layer(
        forward_propagate(new_model));
}


// function insert_input_layer(input_layer, model) {
//     var new_model = model;
//     new_model.layers = [ input_layer ];
//     return new_model;
// }


// forward propagation to a new layer of index i based on the previous layer
function forward_propagate_step(i: number, model: NeuralNetworkModel): any {
    var output_layer_index = number_of_layers(model) - 1;
    var previous_layer = layer(i - 1, model);

    // weights between previous layer and current layer
    var weights = layer_weights(i - 1, model);

    // biases of current layer
    var biases = layer_biases(i, model);

    var non_activated_new_layer = nj.add(nj.dot(previous_layer, weights), nj.dot(nj.array(model.identity_biases).T, biases));

    var new_layer = activate(
        non_activated_new_layer);

    var new_model = model;
    new_model.layers.push(
        new_layer);
    new_model.non_activated_layers.push(
        non_activated_new_layer);

    if (i != output_layer_index)
        return forward_propagate_step(i + 1, new_model);
    else
        return new_model;
}


function forward_propagate(model: NeuralNetworkModel): any {
    var new_model = model;
    new_model.layers = [ model.layers[0] ];
    new_model.non_activated_layers = [];

    if (model.identity_biases == undefined) {
        new_model.identity_biases = identity(1, number_of_input_layers(model));
    }

    return forward_propagate_step(1, new_model);
}
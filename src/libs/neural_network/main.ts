// function range(size, startAt = 0) {
//     return [...Array(size).keys()].map(i => i + startAt);
// }

// function len(array) {
//     return array.length;
// }

// // model representing a neural network
// class NeuralNetwork {
//     constructor(
//         weights = [],
//         biases = [],
//         layer_sizes = [],
//         layers = [],
//         non_activated_layers = []) {

//         // essential data

//         this.weights = weights;
//         this.biases = biases;
//         this.layer_sizes = layer_sizes;
//         this.layers = layers;
//         this.non_activated_layers = non_activated_layers;
//         this.fitness;
//     }
// }

// // imperative

// function random_weights(layer_sizes) {
//     weights = [];
//     for (var i in range(len(layer_sizes))) {
//         // skip the first layer, as it has no previous layer
//         if(i != 0) {
//             weights.push(
//                 nj.random(
//                     layer_sizes[i - 1], layer_sizes[i]).tolist());
//         }
//     }

//     return weights;
// }

// function random_biases(layer_sizes) {
//     biases = [];

//     for (var i in range(len(layer_sizes))) {
//         // skip the first layer, as it has no previous layer
//         if(i != 0)
//             biases.push(
//                 nj.random(1, layer_sizes[i]).tolist());
//     }

//     return biases;
// }

// // functional

// function activate(x) {
//     for (var i = 0; i < x.selection.data.length; i++) {
//         x.selection.data[i] = sigmoid(x.selection.data[i]);
//     }

//     return x;
// }


// function activate_prime(x) {
//     return sigmoid_prime(x);
// }


// // get a specific layer
// function layer(i, model) {
//     return nj.array(model.layers[i]).tolist();
// }


// // get weights between i and i + 1 layer
// function layer_weights(i, model) {
//     return nj.array(model.weights[i]).tolist();
// }


// // get biases of i layer
// function layer_biases(i, model) {
//     // offset of -1 since there is no bias for index layer
//     return nj.array(model.biases[i - 1]).tolist();
// }


// // get a specific non-activated version of a layer with index i
// function non_activated_layer(i, model) {
//     // since there's no input layer, index has offset of -1
//     return nj.array(model.non_activated_layers[i - 1]).tolist();
// }

// // simply get the last layer
// function last_layer(model) {
//     output_layer_index = number_of_layers(model) - 1;

//     return nj.array(layer(output_layer_index, model)).tolist();
// }

// // simply get the last non-activated layer
// function last_non_activated_layer(model) {
//     var output_layer_index = number_of_layers(model) - 1;

//     var last_non_activated_layer = [];
//     for (var i in range(number_of_layers(model)))
//         last_non_activated_layer.push(layer(i, model));

//     return nj.array(non_activated_layer(output_layer_index, model)).tolist();
// }


// // imperative
// function identity(n, m) {
//     var matrix = [];

//     // generate row
//     var row = [];
//     for (var j in range(m))
//         row.push(1);

//     // add the rows to the matrix
//     for (var i in range(n))
//         matrix.push(row);

//     return nj.array(matrix).tolist();
// }


// function previous_layer(i, model) {
//     layer(i - 1, model);
// }


// function number_of_layers(model) {
//     return len(model.layer_sizes);
// }


// function number_of_input_layers(model) {
//     return len(model.layers[0]);
// }


// // get output layer from input layer
// function output_layer(input_layer, model) {
//     new_model = model;
//     new_model.layers = [input_layer];

//     return last_layer(
//         forward_propagate(new_model));
// }


// function insert_input_layer(input_layer, model) {
//     var new_model = model;
//     new_model.layers = [ input_layer ];
//     return new_model;
// }


// // forward propagation to a new layer of index i based on the previous layer
// function forward_propagate_step(i, model) {
//     var output_layer_index = number_of_layers(model) - 1;
//     var previous_layer = layer(i - 1, model);

//     // weights between previous layer and current layer
//     var weights = layer_weights(i - 1, model);

//     // biases of current layer
//     var biases = layer_biases(i, model);

//     var non_activated_new_layer = nj.add(nj.dot(previous_layer, weights), nj.dot(nj.array(model.identity_biases).T, biases));

//     var new_layer = activate(
//         non_activated_new_layer);

//     var new_model = model;
//     new_model.layers.push(
//         new_layer);
//     new_model.non_activated_layers.push(
//         non_activated_new_layer);

//     if (i != output_layer_index)
//         return forward_propagate_step(i + 1, new_model);
//     else
//         return new_model;
// }


// function forward_propagate(model) {
//     var new_model = model;
//     new_model.layers = [ model.layers[0] ];
//     new_model.non_activated_layers = [];

//     if (model.identity_biases == undefined) {
//         new_model.identity_biases = identity(1, number_of_input_layers(model));
//     }

//     return forward_propagate_step(1, new_model);
// }


// function backward_propagate_step(delta, i, model) {
//     var dJdW = nj.dot(
//         layer(i - 1, model).T, delta);

//     var dJdB = nj.dot(
//         model.identity_biases, delta);

//     model.dJdW_list.push(dJdW);
//     model.dJdB_list.push(dJdB);

//     if (i == 1) {
//         model.dJdW_list.reverse();
//         model.dJdB_list.reverse();

//         return model;
//     } else {
//         var new_delta = nj.dot(
//             delta,
//             model.weights[i - 1].T) *
//             nj.array(
//                 activate_prime(
//                     non_activated_layer(i - 1, model)));

//         return backward_propagate_step(new_delta, i - 1, model);
//     }
// }


// function backward_propagate(model) {
//     var new_model = model;
//     new_model.dJdW_list = [];
//     new_model.dJdB_list = [];

//     delta = (last_layer(new_model) -
//         new_model.examples) *
//         activate_prime(
//             last_non_activated_layer(
//                 new_model));

//     return backward_propagate_step(delta, number_of_layers(new_model) - 1, new_model);
// }


// // calculate the cost
// function cost(model) {
//     return 0.5 * nj.sum(nj.square(last_layer(model) - model.examples));
// }

// function stochastic_model(model) {
//     var random_input_layer_index = randint(0, number_of_input_layers(model) - 1);

//     var layers = [];
//     for (var i in range(number_of_layers(model))) {
//         layers.push(
//             nj.array(
//                 [ model.layers[i][random_input_layer_index] ]));
//     }

//     var non_activated_layers = [];
//     for (var j in range(number_of_layers(model) - 1)) {
//         non_activated_layers.push(
//             nj.array(
//                 [ model.non_activated_layers[j][random_input_layer_index] ]));
//     }

//     var examples = [ model.examples[random_input_layer_index] ];

//     var s_model = NeuralNetwork(
//         weights = model.weights,
//         biases = model.biases,
//         layer_sizes = model.layer_sizes,
//         layers = layers,
//         non_activated_layers = non_activated_layers,
//         examples = examples,
//         dJdW_list = model.dJdW_list,
//         dJdB_list = model.dJdB_list,
//         costs = model.costs);
//     return s_model;
// }

// // imperative

// function train(model,
//     alpha = 0.01,
//     times = 1,
//     stochastic = False,
//     debug = True,
//     decrease_alpha = True,
//     callback_interval = 5000,
//     callback = None) {
//     // model.costs = []
//     model = forward_propagate(model);
//     backed_up_model = model;

//     for (var i in range(times)) {
//         print("Training " + str(i + 1) + "x");

//         for (var j in range(10000)) {
//             if (stochastic) {
//                 model = forward_propagate(
//                     stochastic_model(backed_up_model));
//             }

//             if (decrease_alpha)
//                 alpha /= 1.00001;
            
//             model = forward_propagate(
//                 backward_propagate(model));

//             for (var k in range(number_of_layers(model) - 1)) {
//                 model.weights[k] -= alpha * model.dJdW_list[k];
//                 model.biases[k] -= alpha * model.dJdB_list[k];
//             }


//             if (callback != undefined) {
//                 if (j % callback_interval == 0) {
//                     // use the backed up model with the new weights and biases
//                     callback_model = backed_up_model;
//                     callback_model.weights = model.weights;
//                     callback_model.biases = model.biases;

//                     callback_model.cost = cost(
//                             forward_propagate(
//                                 callback_model));

//                     callback(callback_model);
//                 }
//             }
//         }
//     }

//     if (stochastic) {
//         model.layers = backed_up_model.layers;
//         model.non_activated_layers = backed_up_model.non_activated_layers;
//         model.examples = backed_up_model.examples;
//     }

//     return forward_propagate(model);
// }
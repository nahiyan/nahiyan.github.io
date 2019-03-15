function tan_h(x) {
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

function tan_h_prime(x) {
    return 1 - Math.pow(sigmoid(x), 2);
}

function relu(x) {
    return nj.log(1 + Math.exp(x));
}
function relu_prime (x) {
    return Math.exp(x) / (1 + Math.exp(x));
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoid_prime(x) {
    return Math.exp(-x) / ( Math.pow(1 + Math.exp(-x)), 2);
}

var sum_to_n_a = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("n must be a non-negative integer");
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("n must be a non-negative integer");
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("n must be a non-negative integer");
    return n === 0 ? 0 : n + sum_to_n_c(n - 1);
};

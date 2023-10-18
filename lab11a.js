Array.prototype.even = function() {
    return this.filter(o => o % 2 == 0);
}
Array.prototype.odd = function() {
    return this.filter(o => o % 2 == 1);
}
console.log([1,2,3,4,5,6,7,8].even()); // [2,4,6,8]
console.log([1,2,3,4,5,6,7,8].odd()); // [1,3,5,7]


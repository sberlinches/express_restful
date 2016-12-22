String.prototype.capitalize = function() {
    return this.replace(/\b\w/g, function(l){ return l.toUpperCase() });
};
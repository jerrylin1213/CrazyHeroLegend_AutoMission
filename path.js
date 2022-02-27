function Town() {
    this.root = null;
}

// (all parameters are place obj except tail(bool))
function Place(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
    this.prev = null;
}

let path = {
    "Place": Place, 
    "Town": Town
}

module.exports = path;

interface Array<T> {
    moveToTop(index: number): void;
}

// push existed element to top
Array.prototype.moveToTop = function (index: number) {
    if (this.length === 0) return;
    if (index > this.length || index < 0) throw new Error("Index out of array");
    let tmp = this[index];
    for (let i = index; i > 0; i--)
        this[i] = this[i - 1];
    this[0] = tmp;
}
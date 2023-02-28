import {Vector} from "p5";

export class Wall {

    readonly a: Vector;
    readonly b: Vector;

    constructor(x1: number, y1: number, x2: number, y2: number) {
       this.a = p5.createVector(x1, y1);
       this.b = p5.createVector(x2, y2);
    }

    draw(): void {
        p5.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
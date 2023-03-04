import {Vector} from "p5";
import {Wall} from "./wall";

export class Ray {

    private readonly position: Vector;
    readonly direction: Vector;

    constructor(position: Vector, angle: number) {
        this.position = position;
        this.direction = Vector.fromAngle(angle);
    }

    draw(): void {
        p5.push();
        p5.translate(this.position.x, this.position.y);
        p5.line(0, 0, this.direction.x * 100, this.direction.y * 100);
        p5.pop();
    }

    cast(wall: Wall): Vector | null {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = this.position.x - this.direction.x;
        const y4 = this.position.y - this.direction.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator === 0) {
            return null;
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;

        if (t < 0 || t > 1 && u < 0 || u > 1){
            return null;
        }
        return p5.createVector(
          x1 + t * (x2 - x1),
            y1 + t * (y2 - y1)
        );
    }

    setPosition(position: Vector): void {
        this.position.x = position.x;
        this.position.y = position.y;
    }

}

import {Vector} from 'p5';
import {Wall} from "./wall";
import {Ray} from "./ray";

export class Figure {

    private readonly center: Vector;
    private readonly r: number = 20;
    private readonly rays: Ray[] = [];
    private readonly fov: number = 70;

    constructor(x: number, y: number) {
        this.center = p5.createVector(x, y);
        this.createRays();
    }

    draw(): void {
        p5.circle(this.center.x, this.center.y, this.r * 2);
    }

    createRays(): void {
        for (let i = -this.fov / 2; i < this.fov / 2; i += 2) {
            this.rays.push(
                new Ray(this.center, p5.radians(i))
            );
        }
    }

    look(walls: Wall[]): void {
        const points: Vector[] = [];
        this.rays.forEach(ray => {
            let nearestPoint: Vector | null = null;
            walls.forEach(wall => {
                const point = ray.cast(wall);
                if (!point) {
                    return;
                }
                if (!nearestPoint) {
                    nearestPoint = point;
                }
                if (Vector.dist(this.center, point) < Vector.dist(this.center, nearestPoint)) {
                    nearestPoint = point;
                }
            });
            if (nearestPoint) {
                points.push(nearestPoint);
            }
        });
        points.forEach(point => p5.line(this.center.x, this.center.y, point.x, point.y));
    }

    setPosition(x: number, y: number): void {
        this.center.x = x;
        this.center.y = y;
        this.rays.forEach(ray => ray.setPosition(this.center));
    }
}
import {Vector} from 'p5';
import {Wall} from "./wall";
import {Ray} from "./ray";

export class Figure {

    private readonly center: Vector;
    private readonly r: number = 20;
    private rays: Ray[] = [];
    private readonly fov: number = 110;
    private readonly direction: Vector;

    constructor(x: number, y: number) {
        this.center = p5.createVector(x, y);
        this.direction = Vector.fromAngle(p5.radians(0));
        this.createRays();
    }

    draw(): void {
        p5.push();
        p5.translate(this.center.x, this.center.y);
        p5.rotate(this.direction.heading());
        p5.circle(0, 0, this.r * 2);
        p5.pop();
    }

    createRays(): void {
        this.rays = [];
        const leftEdge = (-this.fov / 2) + p5.degrees(this.direction.heading());
        const rightEdge = (this.fov / 2) + p5.degrees(this.direction.heading());
        for (let angle = leftEdge; angle < rightEdge; angle += 5) {
            const coordinates = this.getCircleCoordinate(angle);
            this.rays.push(new Ray(coordinates, p5.radians(angle)));
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

    rotate(isRight: boolean): void {
        const angle = p5.degrees(this.direction.heading());
        const rotateAngle = isRight ? 5 : -5;
        this.direction.setHeading(p5.radians(angle + rotateAngle));
        this.createRays();
    }

    moveForward(): void {
        this.center.x += this.direction.x;
        this.center.y += this.direction.y;
        this.createRays();
    }
}
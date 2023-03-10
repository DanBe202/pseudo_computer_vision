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
        // this.rays.forEach(ray => ray.draw());
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
        let farthestRay: Ray | null = null;
        let farthestWall: Vector | null = null;
        this.rays.forEach(ray => {
            let nearestWall: Vector | null = null;
            walls.forEach(wall => {
                const point = ray.cast(wall);
                if (!point) {
                    return;
                }
                if (!nearestWall) {
                    nearestWall = point;
                }
                if (Vector.dist(this.center, point) < Vector.dist(this.center, nearestWall)) {
                    nearestWall = point;
                }
            });
            if (nearestWall) {
                points.push(nearestWall);
            }
            if (!farthestWall) {
                farthestWall = nearestWall;
                farthestRay = ray;
            }
            if (Vector.dist(this.center, nearestWall!) > Vector.dist(this.center, farthestWall!)) {
                farthestWall = nearestWall;
                farthestRay = ray;
            }
        });
        // let farthestPoint = points[0];
        // for (let point of points) {
        //     if (Vector.dist(this.center, point) > Vector.dist(this.center, farthestPoint)) {
        //         farthestPoint = point;
        //     }
        // }
        points.forEach(point => p5.line(this.center.x, this.center.y, point.x, point.y));
        this.direction.setHeading(farthestRay!.direction.heading());
        this.moveForward();
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

    private getCircleCoordinate(angle: number): Vector {
        const coordinates = p5.createVector();
        coordinates.x = this.center.x + this.r * Math.cos(p5.radians(angle));
        coordinates.y = this.center.y + this.r * Math.sin(p5.radians(angle));
        return coordinates;
    }
}
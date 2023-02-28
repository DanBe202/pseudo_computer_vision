import './style.css';
import { BaseSketch } from './base/sketch.base';
import {Figure} from "./models/figure";
import {Wall} from "./models/wall";

class Sketch extends BaseSketch {

  private readonly width: number =  600;

  private readonly height: number = 600;

  private readonly figure: Figure = new Figure(300, 300);

  private readonly walls: Wall[] = [
      new Wall(30, 30, this.width - 30, 30),
      new Wall(this.width - 30, 30, this.width - 30, this.height - 30),
      new Wall(this.width - 30, this.height - 30, 30, this.height - 30),
      new Wall(30, this.height - 30, 30, 30)
  ];

  setup(): void {
    p5.createCanvas(this.width, this.height);
    for (let i = 0; i < 5; ++i) {
        this.walls.push(new Wall(
            p5.random(this.width),
            p5.random(this.height),
            p5.random(this.width),
            p5.random(this.height)
        ))
    }
  }

  draw(): void {
    p5.background(255);
    this.figure.setPosition(p5.mouseX, p5.mouseY);
    this.walls.forEach(wall => wall.draw());
    this.figure.look(this.walls);
    this.figure.draw();
  }
}

new Sketch();

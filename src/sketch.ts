import './style.css';
import {BaseSketch} from './base/sketch.base';
import {Figure} from "./models/figure";
import {Wall} from "./models/wall";

class Sketch extends BaseSketch {

  private readonly width: number = 600;

  private readonly height: number = 600;

  private readonly figure: Figure = new Figure(300, 300);

  private readonly walls: Wall[] = [
    new Wall(0, 0, this.width, 0),
    new Wall(this.width, 0, this.width, this.height),
    new Wall(this.width, this.height, 0, this.height),
    new Wall(0, this.height, 0, 0),
    new Wall(100, 100, this.width - 100, 100),
    new Wall(this.width - 100, 100, this.width - 100, this.height - 100),
    new Wall(this.width - 100, this.height - 100, 100, this.height - 100),
    new Wall(100, this.height - 100, 100, 100)
  ];

  setup(): void {
    p5.createCanvas(this.width, this.height);
  }

  draw(): void {
    p5.background(255);
    this.figure.setPosition(p5.mouseX, p5.mouseY);
    this.walls.forEach(wall => wall.draw());
    this.figure.look(this.walls);
    this.figure.draw();
  }

  keyPressed(): void {
    switch (p5.keyCode) {
      case p5.RIGHT_ARROW:
        this.figure.rotate(true);
        break;
      case p5.LEFT_ARROW:
        this.figure.rotate(false);
        break;
      case p5.UP_ARROW:
        this.figure.moveForward();
    }
  }
}

new Sketch();

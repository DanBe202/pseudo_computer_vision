import P5 from 'p5';
import { Global } from './p5.global';
import { Sketch } from './sketch.interface';

export class SketchConstructor {

  private readonly _noop: () => void = () => {};
  
  constructor(config: Sketch) {
    const sketch = this._createSketch(config);
    new P5(sketch);
  }

  private _createSketch(config: Sketch): (p5: P5) => void {
    const preload = config.preload || this._noop;
    const setup = config.setup || this._noop;
    const draw = config.draw || this._noop;
    return (p5: P5) => {
      Global.setP5(p5);
      p5.preload = preload;
      p5.setup = setup;
      p5.draw = draw;
    };
  }
}
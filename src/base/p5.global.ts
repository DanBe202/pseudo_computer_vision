import P5 from 'p5';

export class Global {
  private static _p5: P5;

  static get p5(): P5 {
    return this._p5;
  }

  static setP5(p5Instance: P5): void {
    this._p5 = p5Instance;
    window.p5 = this._p5;
  }
}
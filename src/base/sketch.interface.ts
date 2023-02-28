export interface Sketch {
  preload?: () => void;
  setup?: () => void;
  draw?: () => void;
}

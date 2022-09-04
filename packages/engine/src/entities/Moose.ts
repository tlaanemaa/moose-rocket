import { PhysicalRenderObject } from "../core/PhysicalRenderObject";

export class Moose extends PhysicalRenderObject {
  public readonly texture = new Image();
  public readonly height = 100;
  public readonly width = 100;
  public rotation = 0;

  private images = [
    "img/goat.png",
    "img/moose.png",
    "img/cat.png",
    "img/monkey.png",
    "img/red-rocket.png",
  ];

  constructor() {
    super();
    this.dragCoefficient = 0.95;
    this.mass = 100;

    this.texture.src =
      this.images[Math.floor(Math.random() * this.images.length)];

    this.tick(7000);
    setInterval(() => this.tick(3000), 100);
  }

  tick(forceBound = 100) {
    this.applyForce({
      x: Math.random() * 2 * forceBound - forceBound,
      y: Math.random() * 2 * forceBound - forceBound,
    });
    this.rotation = this.getHeading();
  }
}

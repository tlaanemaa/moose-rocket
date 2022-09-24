import { inject, singleton } from "tsyringe";
import { Camera } from "../components/Camera";
import { EntityStore } from "../store/EntityStore";
import { Collider } from "../tools/Collider";
import { Timer } from "../types/Timer";
import { EntityRenderer } from "../types/EntityRenderer";
import { BackgroundRenderer } from "../types/BackgroundRenderer";

@singleton()
export class GameRunner {
  constructor(
    @inject("BackgroundRenderer")
    private readonly backgroundRenderer: BackgroundRenderer,
    @inject("EntityRenderer")
    private readonly entityRenderer: EntityRenderer,
    @inject("Timer")
    private readonly timer: Timer,
    private readonly camera: Camera,
    private readonly store: EntityStore
  ) {
    this.timer.schedulePrimary(() => this.tick());
  }

  public start() {
    this.timer.start();
  }

  public stop() {
    this.timer.stop();
  }

  private tick() {
    const renderRadiusX = Math.round(
      this.entityRenderer.windowWidth / this.camera.zoom
    );
    const renderRadiusY = Math.round(
      this.entityRenderer.windowHeight / this.camera.zoom
    );

    const entities = this.store.getArea(
      this.camera.position.x - renderRadiusX,
      this.camera.position.y - renderRadiusY,
      this.camera.position.x + renderRadiusX,
      this.camera.position.y + renderRadiusY
    );

    const collider = new Collider(entities);
    collider.calculate();

    this.backgroundRenderer.draw();
    this.entityRenderer.draw(entities);
  }
}

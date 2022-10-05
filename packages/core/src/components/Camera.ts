import { container } from "@moose-rocket/container";
import { injectable } from "inversify";
import { Object2D } from "../primitives";

@injectable()
export class Camera {
  public position: Object2D = { x: 0, y: 0 };
  private _zoom: number = 1;

  public get zoom() {
    return this._zoom;
  }

  public set zoom(zoom: number) {
    this._zoom = Math.max(0.01, Math.min(2, zoom));
  }
}

container.bind(Camera).toSelf().inSingletonScope();

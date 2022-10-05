import { injectable } from "inversify";
import { container } from "@moose-rocket/container";
import { Entity, EntityRenderer } from "@moose-rocket/core";

@injectable()
export class ServerEntityRenderer implements EntityRenderer {
  windowWidth: number = 1000;
  windowHeight: number = 1000;

  draw(entities: Entity[]): void {}
}

container.bind(ServerEntityRenderer).toSelf().inSingletonScope();
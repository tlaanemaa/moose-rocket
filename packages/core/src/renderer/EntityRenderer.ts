import { Entity } from "../components/Entity";
import { Renderer } from "./Renderer";

export class EntityRenderer extends Renderer {
  public drawEntityBoxes = true;

  public draw(entities: Entity[]) {
    this.canvas.clear();
    this.drawEntities(entities);
  }

  private drawEntities(entities: Entity[]) {
    const ctx = this.canvas.getContext();
    const canvasHalfWidth = this.canvas.width / 2;
    const canvasHalfHeight = this.canvas.height / 2;

    entities.forEach((entity) => {
      const scaledTextureWidth = entity.texture.width * this.camera.zoom;
      const scaledTextureHeight = entity.texture.height * this.camera.zoom;

      const renderX =
        (entity.x - this.camera.position.x) * this.camera.zoom +
        canvasHalfWidth;
      const renderY =
        (entity.y - this.camera.position.y) * this.camera.zoom +
        canvasHalfHeight;

      ctx.translate(Math.round(renderX), Math.round(renderY));

      if (this.drawEntityBoxes) {
        const scaledEntityWidth = entity.width * this.camera.zoom;
        const scaledEntityHeight = entity.height * this.camera.zoom;
        ctx.beginPath();
        ctx.rect(
          Math.round(-scaledEntityWidth / 2),
          Math.round(-scaledEntityHeight / 2),
          Math.round(scaledEntityWidth),
          Math.round(scaledEntityHeight)
        );
        ctx.strokeStyle = entity.isColliding ? "#FF0000" : "#00FF00";
        ctx.stroke();
      }

      ctx.rotate((entity.rotation * Math.PI) / 180);
      ctx.drawImage(
        entity.texture.render(),
        Math.round(-scaledTextureWidth / 2),
        Math.round(-scaledTextureHeight / 2),
        Math.round(scaledTextureWidth),
        Math.round(scaledTextureHeight)
      );

      // Reset current transformation matrix to the identity matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
  }
}

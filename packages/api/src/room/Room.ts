import "reflect-metadata";
import { MessagePort } from "node:worker_threads";
import { container } from "tsyringe";
import {
  AnyMessage,
  ConnectionApprovedMessage,
  FastMap,
  Game,
  Parser,
  StateUpdateMessage,
} from "@battle-of-intertubes/core";

/**
 * Each Room will be executed on a new worker thread
 */
export class Room {
  private readonly players = new FastMap<MessagePort>();
  //private readonly game = container.resolve<Game>("Game");

  constructor(private readonly id: string) {
    //this.game.init();
  }

  public onConnect(playerId: string, port: MessagePort) {
    port.on("close", () => this.players.delete(playerId));
    port.on("message", (data) => {
      this.handlePlayerMessage(playerId, port, Parser.parse(data));
    });

    this.players.set(playerId, port);
    port.postMessage(new ConnectionApprovedMessage(this.id).serialize());
  }

  private handlePlayerMessage(
    playerId: string,
    port: MessagePort,
    message: AnyMessage
  ) {
    port.postMessage(message.serialize());
  }
}
import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import "@moose-rocket/game";
import {
  AudioLoader,
  BackgroundRenderer,
  EntityRenderer,
  Game,
  TextureLoader,
  Timer,
  UserInput,
} from "@moose-rocket/core";
import { FrameTimer } from "./components";
import { WebEntityRenderer, WebBackgroundRenderer } from "./renderer";
import { WebUserInput, WebTextureLoader, WebAudioLoader } from "./services";

container.register<Timer>(
  "Timer",
  { useClass: FrameTimer },
  { lifecycle: Lifecycle.Singleton }
);
container.register<UserInput>(
  "UserInput",
  { useClass: WebUserInput },
  { lifecycle: Lifecycle.Singleton }
);
container.register<BackgroundRenderer>(
  "BackgroundRenderer",
  { useClass: WebBackgroundRenderer },
  { lifecycle: Lifecycle.Singleton }
);
container.register<EntityRenderer>(
  "EntityRenderer",
  { useClass: WebEntityRenderer },
  { lifecycle: Lifecycle.Singleton }
);
container.register<TextureLoader>(
  "TextureLoader",
  { useClass: WebTextureLoader },
  { lifecycle: Lifecycle.Singleton }
);
container.register<AudioLoader>(
  "AudioLoader",
  { useClass: WebAudioLoader },
  { lifecycle: Lifecycle.Singleton }
);

container.resolve<Game>("Game").init();

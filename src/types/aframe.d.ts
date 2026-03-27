interface AFrameComponent {
  el: HTMLElement & { object3D: { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number } } };
  data: Record<string, unknown>;
  [key: string]: unknown;
}

interface AFrameComponentDefinition {
  schema?: Record<string, { type: string; default?: unknown; oneOf?: string[] }>;
  init?(this: AFrameComponent): void;
  tick?(this: AFrameComponent, time: number, delta: number): void;
  [key: string]: unknown;
}

declare const AFRAME: {
  registerComponent(name: string, definition: AFrameComponentDefinition): void;
};

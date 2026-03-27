AFRAME.registerComponent('orbit', {
  schema: {
    speed: { type: 'number', default: 0.01 },
    distance: { type: 'number', default: 10 },
  },

  init(this: AFrameComponent) {
    this.angle = Math.random() * Math.PI * 2;
  },

  tick(this: AFrameComponent, _time: number, delta: number) {
    const angle = (this.angle as number) + (this.data.speed as number) * (delta / 16);
    this.angle = angle;
    const d = this.data.distance as number;
    this.el.object3D.position.x = Math.cos(angle) * d;
    this.el.object3D.position.z = Math.sin(angle) * d;
  },
});

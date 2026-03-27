AFRAME.registerComponent('planet', {
  schema: {
    rotationSpeed: { type: 'number', default: 0.01 },
  },

  tick(this: AFrameComponent) {
    this.el.object3D.rotation.y += this.data.rotationSpeed as number;
  },
});

AFRAME.registerComponent('info-panel', {
  schema: {
    name: { type: 'string', default: '' },
  },

  init(this: AFrameComponent) {
    const name = this.data.name as string;

    this.el.addEventListener('mouseenter', () => {
      const hud = document.querySelector('#info-text');
      if (hud) {
        hud.setAttribute('value', name);
      }
    });

    this.el.addEventListener('mouseleave', () => {
      const hud = document.querySelector('#info-text');
      if (hud) {
        hud.setAttribute('value', '');
      }
    });
  },
});

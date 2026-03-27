import './components/planet.ts';
import './components/orbit.ts';
import './components/info-panel.ts';

import { SUN, PLANETS, type Planet, type Satellite } from './data/planets.ts';

const texPath = (file: string): string => `textures/${file}`;

function toAttrString(value: string | number | Record<string, unknown>): string {
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
  }
  return String(value);
}

function createEl(tag: string, attrs: Record<string, string | number | Record<string, unknown>>): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, toAttrString(value));
  }
  return el;
}

function addSatellites(parent: HTMLElement, satellites: Satellite[]): void {
  satellites.forEach((sat) => {
    const wrapper = createEl('a-entity', {
      orbit: { speed: sat.orbitSpeed, distance: sat.distance },
    });
    wrapper.appendChild(
      createEl('a-sphere', {
        radius: sat.radius,
        material: `src: url(${texPath(sat.texture)}); roughness: 0.8`,
        'info-panel': { name: sat.name.charAt(0).toUpperCase() + sat.name.slice(1) },
        class: 'clickable',
      })
    );
    parent.appendChild(wrapper);
  });
}

function addPlanet(container: HTMLElement, scene: HTMLElement, p: Planet): void {
  const orbitWrapper = createEl('a-entity', {
    orbit: { speed: p.orbitSpeed, distance: p.distance },
  });

  orbitWrapper.appendChild(
    createEl('a-sphere', {
      radius: p.radius,
      material: `src: url(${texPath(p.texture)}); roughness: 0.8`,
      rotation: `${p.tilt} 0 0`,
      planet: { rotationSpeed: p.rotationSpeed },
      'info-panel': { name: p.name.charAt(0).toUpperCase() + p.name.slice(1) },
      class: 'clickable',
    })
  );

  // 軌道リング（scene直下に追加）
  scene.appendChild(
    createEl('a-ring', {
      'radius-inner': p.distance - 0.05,
      'radius-outer': p.distance + 0.05,
      color: '#333',
      material: 'shader: flat; opacity: 0.3',
      rotation: '-90 0 0',
    })
  );

  if (p.ring) {
    orbitWrapper.appendChild(
      createEl('a-ring', {
        'radius-inner': p.ring.innerRadius,
        'radius-outer': p.ring.outerRadius,
        color: p.ring.color,
        material: 'shader: flat; side: double; opacity: 0.7',
        rotation: '-90 0 0',
      })
    );
  }

  if (p.satellites) {
    addSatellites(orbitWrapper, p.satellites);
  }

  container.appendChild(orbitWrapper);
}

function populate(): void {
  const scene = document.querySelector('a-scene') as HTMLElement;
  const container = document.querySelector('#solar-system') as HTMLElement;

  // 太陽
  container.appendChild(
    createEl('a-sphere', {
      radius: SUN.radius,
      material: `shader: flat; src: url(${texPath(SUN.texture)})`,
      position: '0 0 0',
      planet: { rotationSpeed: 0.00125 },
      'info-panel': { name: 'Sun' },
      class: 'clickable',
    })
  );

  // 惑星
  PLANETS.forEach((p) => addPlanet(container, scene as HTMLElement, p));
}

const scene = document.querySelector('a-scene') as HTMLElement & { hasLoaded?: boolean } | null;
if (scene?.hasLoaded) {
  populate();
} else {
  scene?.addEventListener('loaded', populate);
}

export interface Satellite {
  name: string;
  distance: number;
  radius: number;
  texture: string;
  orbitSpeed: number;
}

export interface Ring {
  innerRadius: number;
  outerRadius: number;
  color: string;
}

export interface Planet {
  name: string;
  distance: number;
  radius: number;
  texture: string;
  rotationSpeed: number;
  orbitSpeed: number;
  tilt: number;
  ring?: Ring;
  satellites?: Satellite[];
}

export interface Sun {
  name: string;
  radius: number;
  color: string;
  texture: string;
  emissive: boolean;
}

export const SUN: Sun = {
  name: 'sun',
  radius: 5,
  color: '#FDB813',
  texture: 'sun.jpg',
  emissive: true,
};

export const PLANETS: Planet[] = [
  {
    name: 'mercury',
    distance: 12,
    radius: 0.4,
    texture: 'mercury.jpg',
    rotationSpeed: 0.005,
    orbitSpeed: 0.01,
    tilt: 0.03,
  },
  {
    name: 'venus',
    distance: 18,
    radius: 0.9,
    texture: 'venus.jpg',
    rotationSpeed: 0.00375,
    orbitSpeed: 0.0075,
    tilt: 177.4,
  },
  {
    name: 'earth',
    distance: 26,
    radius: 1.0,
    texture: 'earth.jpg',
    rotationSpeed: 0.0075,
    orbitSpeed: 0.005,
    tilt: 23.4,
    satellites: [
      {
        name: 'moon',
        distance: 2.5,
        radius: 0.27,
        texture: 'moon.jpg',
        orbitSpeed: 0.0125,
      },
    ],
  },
  {
    name: 'mars',
    distance: 35,
    radius: 0.5,
    texture: 'mars.jpg',
    rotationSpeed: 0.007,
    orbitSpeed: 0.004,
    tilt: 25.2,
  },
  {
    name: 'jupiter',
    distance: 50,
    radius: 2.0,
    texture: 'jupiter.jpg',
    rotationSpeed: 0.015,
    orbitSpeed: 0.002,
    tilt: 3.1,
  },
  {
    name: 'saturn',
    distance: 65,
    radius: 1.7,
    texture: 'saturn.jpg',
    rotationSpeed: 0.0125,
    orbitSpeed: 0.0015,
    tilt: 26.7,
    ring: {
      innerRadius: 2.0,
      outerRadius: 3.5,
      color: '#C8A86E',
    },
  },
  {
    name: 'uranus',
    distance: 80,
    radius: 1.2,
    texture: 'uranus.jpg',
    rotationSpeed: 0.01,
    orbitSpeed: 0.001,
    tilt: 97.8,
  },
  {
    name: 'neptune',
    distance: 95,
    radius: 1.1,
    texture: 'neptune.jpg',
    rotationSpeed: 0.00875,
    orbitSpeed: 0.00075,
    tilt: 28.3,
  },
];

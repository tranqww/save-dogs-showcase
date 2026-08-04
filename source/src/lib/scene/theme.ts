import * as THREE from "three";

export const COLD_BG: [number, number, number] = [16, 18, 22];
export const WARM_BG: [number, number, number] = [250, 238, 220];

export const COLD_FG: [number, number, number] = [234, 236, 238];
export const WARM_FG: [number, number, number] = [38, 30, 24];

export const COLD_LIGHT = new THREE.Color("#7c8fa3");
export const WARM_LIGHT = new THREE.Color("#ffb877");

export const WARM_PARTICLE = "#f3c98f";

export function mixChannel(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixTriplet(a: [number, number, number], b: [number, number, number], t: number) {
  const r = Math.round(mixChannel(a[0], b[0], t));
  const g = Math.round(mixChannel(a[1], b[1], t));
  const bl = Math.round(mixChannel(a[2], b[2], t));
  return `${r} ${g} ${bl}`;
}

export function bgCssValue(t: number) {
  return mixTriplet(COLD_BG, WARM_BG, t);
}

export function fgCssValue(t: number) {
  return mixTriplet(COLD_FG, WARM_FG, t);
}

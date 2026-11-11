// 3D kvant kompyuter: suyultirish sovutgichining oltin "qandili".
// Besh disk (50 K dan 10 mK gacha), spiral mis kabellar, eng pastda kubitlar chipi.
// Sudrasa aylanadi, diskni bosish/ustiga borish — bosqich tanlanadi, qopqoq ochiladi-yopiladi.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const ACCENT = 0x8cc8ff;
const GOLD = 0xe0a948;
const COPPER = 0xc8743c;

// disklar: [radius, y]
const PLATES = [[0.6, 0.98], [0.53, 0.56], [0.45, 0.16], [0.38, -0.22], [0.31, -0.58]];
const TOP_Y = 1.36;

function buildCryostat() {
  const root = new THREE.Group();
  const pick = []; // bosiladigan qismlar: userData.stage = bosqich raqami

  const gold = (c = GOLD) => new THREE.MeshPhysicalMaterial({
    color: c, metalness: 1, roughness: 0.22, clearcoat: 0.5, envMapIntensity: 1.5, emissive: ACCENT, emissiveIntensity: 0,
  });
  const steel = new THREE.MeshPhysicalMaterial({ color: 0xb9bdc6, metalness: 1, roughness: 0.32, envMapIntensity: 0.9 });
  const copper = new THREE.MeshPhysicalMaterial({ color: COPPER, metalness: 1, roughness: 0.34, envMapIntensity: 1 });
  const rodMat = gold(0xd49a3c);

  // tepadagi po'lat flanets va uni ushlab turgan ilgaklar
  const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.07, 96), steel);
  flange.position.y = TOP_Y;
  root.add(flange);
  [0, 1, 2].forEach((i) => {
    const a = (i / 3) * Math.PI * 2;
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.7, 12), steel);
    hook.position.set(Math.cos(a) * 0.5, TOP_Y + 0.38, Math.sin(a) * 0.5);
    root.add(hook);
  });

  // markaziy quvurlar
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, TOP_Y - PLATES[4][1], 32), steel);
  pipe.position.y = (TOP_Y + PLATES[4][1]) / 2;
  const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, TOP_Y - PLATES[2][1], 16), copper);
  pipe2.position.set(0.14, (TOP_Y + PLATES[2][1]) / 2, 0.05);
  root.add(pipe, pipe2);

  // disklar va ular orasidagi ustunchalar
  const plates = PLATES.map(([r, y], i) => {
    const mat = gold();
    const g = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.06, 96), mat);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 12, 96), mat);
    lip.rotation.x = Math.PI / 2;
    g.add(disc, lip);
    // disk tagidagi kichik qismlar (filtrlar, kuchaytirgichlar)
    const n = 5 - Math.floor(i / 2);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + i;
      const part = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.09, 20), k % 2 ? steel : copper);
      part.position.set(Math.cos(a) * r * 0.62, -0.07, Math.sin(a) * r * 0.62);
      g.add(part);
    }
    g.position.y = y;
    g.traverse((o) => (o.userData.stage = i));
    pick.push(disc, lip);
    root.add(g);
    return { mat, group: g };
  });

  const above = [[0.72, TOP_Y], ...PLATES];
  for (let i = 1; i < above.length; i++) {
    const [r, y] = above[i];
    const yTop = above[i - 1][1];
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, yTop - y, 10), rodMat);
      rod.position.set(Math.cos(a) * r * 0.86, (yTop + y) / 2, Math.sin(a) * r * 0.86);
      root.add(rod);
    }
  }

  // spiral mis kabellar: tepadan chipgacha
  const CABLES = 9;
  for (let c = 0; c < CABLES; c++) {
    const a0 = (c / CABLES) * Math.PI * 2;
    const pts = [];
    for (let s = 0; s <= 40; s++) {
      const t = s / 40;
      const y = TOP_Y - t * (TOP_Y - PLATES[4][1] + 0.18);
      const r = 0.42 - t * 0.3 + Math.sin(t * Math.PI * 4 + c) * 0.025;
      const a = a0 + t * 1.4;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.0075, 6), copper);
    root.add(tube);
  }

  // kubitlar chipi: aralashtirish kamerasidan pastda osilgan mis ushlagich
  const chipMat = gold(0xd99050);
  const chip = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 20), chipMat);
  stem.position.y = -0.11;
  const holder = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 48), chipMat);
  holder.position.y = -0.3;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.025, 48), chipMat);
  base.position.y = -0.39;
  chip.add(stem, holder, base);
  // kubitlar — ushlagich atrofidagi kichik ko'k nuqtalar
  const qubits = [];
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * Math.PI * 2;
    const m = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6, toneMapped: false });
    const q = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 12), m);
    q.position.set(Math.cos(a) * 0.152, -0.3 + (k % 2 ? 0.035 : -0.035), Math.sin(a) * 0.152);
    chip.add(q);
    qubits.push(q);
  }
  chip.position.y = PLATES[4][1] - 0.02;
  chip.traverse((o) => (o.userData.stage = 5));
  pick.push(stem, holder, base);
  root.add(chip);

  // tashqi qopqoq (vakuum idishi) — pastdan ko'tarilib hammasini yopadi
  const canMat = new THREE.MeshPhysicalMaterial({
    color: 0xc4c8d0, metalness: 0.95, roughness: 0.3, envMapIntensity: 1, transparent: true, opacity: 0, side: THREE.DoubleSide,
  });
  const can = new THREE.Group();
  const CH = TOP_Y - 0.04 - (PLATES[4][1] - 0.46);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, CH, 96, 1, true), canMat);
  body.position.y = -CH / 2;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.76, 64, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), canMat);
  cap.scale.y = 0.24;
  cap.position.y = -CH;
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.765, 0.012, 8, 96), canMat);
  band.rotation.x = Math.PI / 2;
  band.position.y = -0.06;
  can.add(body, cap, band);
  can.userData.top = TOP_Y - 0.04;
  root.add(can);

  return { root, plates, chipMat, qubits, can, canMat, pick };
}

export default function QuantumScene({ active, closed, onPick, onToggle }) {
  const wrap = useRef(null);
  const canvasRef = useRef(null);
  const props = useRef({ active, closed, onPick, onToggle });
  props.current = { active, closed, onPick, onToggle };

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = wrap.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      stage.classList.add("no-gl");
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    const key = new THREE.DirectionalLight(0xfff4e6, 1.6);
    key.position.set(2, 3, 4);
    const rim = new THREE.DirectionalLight(ACCENT, 0.9);
    rim.position.set(-3, -1, -2);
    scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

    const { root, plates, chipMat, qubits, can, canMat, pick } = buildCryostat();
    scene.add(root);

    /* boshqaruv */
    let spin = 0, spinVel = 0, dragging = false, dragX = 0, moved = 0, hover = -1, capP = 0;
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hit = (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (props.current.closed) return ray.intersectObject(can, true)[0] ? "can" : null;
      const h = ray.intersectObjects(pick, false)[0];
      return h ? h.object.userData.stage : null;
    };

    const down = (e) => { dragging = true; dragX = e.clientX; moved = 0; canvas.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (dragging) {
        const dx = e.clientX - dragX;
        dragX = e.clientX;
        moved += Math.abs(dx);
        spinVel = dx * 0.01;
        spin += dx * 0.01;
        return;
      }
      if (e.pointerType !== "mouse") return;
      const h = hit(e);
      canvas.style.cursor = h !== null ? "pointer" : "grab";
      const s = typeof h === "number" ? h : -1;
      if (s !== hover) {
        hover = s;
        if (s >= 0) props.current.onPick?.(s);
      }
    };
    const up = (e) => {
      dragging = false;
      if (moved > 6) return;
      const h = hit(e);
      if (h === "can") props.current.onToggle?.();
      else if (typeof h === "number") props.current.onPick?.(h);
    };
    const leave = () => { hover = -1; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", leave);

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // butun qandil (ilgaklardan qopqoq tubigacha) har qanday nisbatda sig'adi
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const z = Math.max(1.62 / t, 0.95 / (t * camera.aspect)) + 0.4;
      camera.position.set(0, 0.36, z);
      camera.lookAt(0, 0.3, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    let visible = true;
    const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    vis.observe(stage);

    const clock = new THREE.Clock();
    const k = reduced ? 0 : 1;
    let raf;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const { active, closed } = props.current;

      if (!dragging) { spinVel *= 0.94; spin += spinVel; }
      root.rotation.y = t * 0.12 * k + spin;
      root.position.y = Math.sin(t * 0.9) * 0.025 * k;

      // tanlangan bosqich och ko'k bilan yonadi
      plates.forEach((p, i) => {
        const want = !closed && i === active ? 0.14 : 0;
        p.mat.emissiveIntensity += (want - p.mat.emissiveIntensity) * 0.12;
      });
      const chipOn = !closed && active === 5;
      chipMat.emissiveIntensity += ((chipOn ? 0.14 : 0) - chipMat.emissiveIntensity) * 0.12;
      qubits.forEach((q, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + i * 1.7) * (k || 0.3);
        q.material.opacity = (chipOn ? 0.55 : 0.3) + pulse * (chipOn ? 0.45 : 0.35);
      });

      // qopqoq: pastdan ko'tariladi va asta ko'rinadi
      capP += ((closed ? 1 : 0) - capP) * (reduced ? 1 : 0.06);
      can.visible = capP > 0.01;
      can.position.y = can.userData.top - (1 - capP) * 2.6;
      canMat.opacity = Math.min(1, capP * 1.4);

      renderer.render(scene, camera);
    };
    frame();
    stage.classList.add("ready");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", leave);
      scene.traverse((o) => {
        o.geometry?.dispose();
        [].concat(o.material || []).forEach((m) => m.dispose());
      });
      pmrem.dispose();
      renderer.dispose();
      stage.classList.remove("ready");
    };
  }, []);

  return (
    <div className="q-gl" ref={wrap}>
      <canvas ref={canvasRef} aria-label="3D kvant kompyuter modeli" />
    </div>
  );
}

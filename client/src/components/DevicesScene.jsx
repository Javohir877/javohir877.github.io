// "Ishlar" sahnasi: stol ustida noutbuk va telefon. Loyiha almashganda noutbuk qopqog'i
// yarim yopilib qayta ochiladi, telefon esa bir aylanadi — ikkala ekranda yangi loyiha.
// Sudrasa sahna buriladi, ekranni bosish — loyiha oynasi.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

function roundedPlane(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 16);
  const uv = g.attributes.uv, pos = g.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  return g;
}

// stol ustidagi yumshoq soya
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  gr.addColorStop(0, "rgba(0,0,0,0.75)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

const LID_OPEN = -0.22;

export default function DevicesScene({ sites, index, onOpen }) {
  const wrap = useRef(null);
  const canvasRef = useRef(null);
  const props = useRef({ sites, index, onOpen });
  props.current = { sites, index, onOpen };

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
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(2, 4, 3);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.25));

    /* teksturalar: kerak bo'lganda yuklanadi va saqlanadi */
    const loader = new THREE.TextureLoader();
    const cache = new Map();
    const tex = (src) => {
      if (!src) return null;
      if (!cache.has(src)) {
        const t = loader.load(src);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        cache.set(src, t);
      }
      return cache.get(src);
    };

    const root = new THREE.Group();
    scene.add(root);

    // noutbuk: korpus "space gray" alyumin
    const alu = new THREE.MeshPhysicalMaterial({ color: 0x4b4f58, metalness: 0.85, roughness: 0.38, envMapIntensity: 0.9 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x15171b, roughness: 0.7 });
    const black = new THREE.MeshBasicMaterial({ color: 0x050506 });
    const laptop = new THREE.Group();
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.05, 1.08, 4, 0.02), alu);
    base.position.y = 0.025;
    const keys = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), dark);
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(0, 0.0506, -0.14);
    const pad = new THREE.Mesh(roundedPlane(0.5, 0.3, 0.03), new THREE.MeshPhysicalMaterial({ color: 0x3e424a, metalness: 0.6, roughness: 0.3 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, 0.0506, 0.3);
    laptop.add(base, keys, pad);

    const hinge = new THREE.Group();
    hinge.position.set(0, 0.05, -0.53);
    const lid = new THREE.Mesh(new RoundedBoxGeometry(1.6, 1.04, 0.026, 4, 0.012), alu);
    lid.position.y = 0.52;
    const bezel = new THREE.Mesh(roundedPlane(1.56, 1.0, 0.03), black);
    bezel.position.set(0, 0.52, 0.0135);
    const lapMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.9375), lapMat);
    lapScreen.position.set(0, 0.545, 0.0142);
    hinge.add(lid, bezel, lapScreen);
    hinge.rotation.x = LID_OPEN;
    laptop.add(hinge);
    laptop.position.set(-0.32, 0, 0);
    root.add(laptop);

    // telefon: grafit korpus, tik turibdi
    const phone = new THREE.Group();
    const body = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.88, 0.04, 6, 0.06), new THREE.MeshPhysicalMaterial({ color: 0x2b2e35, metalness: 0.8, roughness: 0.32, clearcoat: 0.4 }));
    const glass = new THREE.Mesh(roundedPlane(0.408, 0.868, 0.055), black);
    glass.position.z = 0.0205;
    const phMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const phScreen = new THREE.Mesh(roundedPlane(0.388, 0.84, 0.045), phMat);
    phScreen.position.z = 0.0212;
    phone.add(body, glass, phScreen);
    const phoneBox = new THREE.Group();
    phoneBox.add(phone);
    phoneBox.position.set(0.82, 0.44, 0.32);
    phoneBox.rotation.set(-0.06, -0.38, 0);
    root.add(phoneBox);

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0.05, 0.001, 0.05);
    root.add(shadow);

    const apply = (i) => {
      const s = props.current.sites[i];
      if (!s) return;
      lapMat.map = tex(s.img);
      phMat.map = tex(s.phone || s.img);
      lapMat.needsUpdate = phMat.needsUpdate = true;
      // keyingisini oldindan yuklab qo'yamiz
      const n = props.current.sites[(i + 1) % props.current.sites.length];
      if (n) { tex(n.img); tex(n.phone); }
    };
    let shownIdx = props.current.index;
    apply(shownIdx);

    /* boshqaruv */
    let yaw = 0, yawVel = 0, dragging = false, dragX = 0, moved = 0;
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hitScreen = (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      return ray.intersectObjects([lapScreen, phScreen, body, lid], false).length > 0;
    };
    const down = (e) => { dragging = true; dragX = e.clientX; moved = 0; canvas.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (!dragging) { if (e.pointerType === "mouse") canvas.style.cursor = hitScreen(e) ? "pointer" : "grab"; return; }
      const dx = e.clientX - dragX;
      dragX = e.clientX;
      moved += Math.abs(dx);
      yawVel = dx * 0.006;
      yaw = Math.max(-0.9, Math.min(0.9, yaw + dx * 0.006));
    };
    const up = (e) => {
      dragging = false;
      if (moved < 6 && hitScreen(e)) props.current.onOpen?.(props.current.index);
    };
    const cancel = () => { dragging = false; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", cancel);

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      // noutbuk va telefon (eni ~2.3) har qanday nisbatda sig'adi
      const dist = Math.max(0.82 / t, 1.2 / (t * camera.aspect)) + 0.3;
      camera.position.set(0.25, dist * 0.36, dist);
      camera.lookAt(0.12, 0.38, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    let visible = true;
    const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    vis.observe(stage);

    // almashish animatsiyasi: 0 → 1 (yarmida ekranlar yangilanadi)
    let trans = 1, swapped = true, pending = shownIdx;
    const clock = new THREE.Clock();
    const k = reduced ? 0 : 1;
    let raf, last = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) { clock.getDelta(); return; }
      const dt = Math.min(0.05, clock.getDelta());
      last += dt;
      const t = last;

      const want = props.current.index;
      if (want !== pending) { pending = want; trans = 0; swapped = false; }
      if (trans < 1) {
        trans = reduced ? 1 : Math.min(1, trans + dt / 0.95);
        if (!swapped && trans >= 0.5) { apply(pending); shownIdx = pending; swapped = true; }
      }
      const bump = Math.sin(Math.PI * trans); // 0 → 1 → 0
      hinge.rotation.x = LID_OPEN + bump * 1.05;
      const dim = 1 - bump * 0.92;
      lapMat.color.setScalar(dim);
      phMat.color.setScalar(dim);
      phone.rotation.y = trans < 1 ? trans * Math.PI * 2 : 0;

      if (!dragging) { yawVel *= 0.92; yaw += yawVel; yaw *= 0.97; }
      root.rotation.y = yaw + Math.sin(t * 0.4) * 0.12 * k - 0.1;
      phoneBox.position.y = 0.44 + Math.sin(t * 1.2) * 0.012 * k;

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
      canvas.removeEventListener("pointercancel", cancel);
      cache.forEach((t) => t.dispose());
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
    <div className="dv-gl" ref={wrap}>
      <canvas ref={canvasRef} aria-label="3D noutbuk va telefon: tanlangan loyiha ekranda" />
    </div>
  );
}

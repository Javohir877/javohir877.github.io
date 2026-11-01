// 3D iPhone 17 Pro Max: sichqonchaga ergashadi, sudrasa aylanadi, bosilsa ekrani almashadi.
// "Cosmic Orange" alyumin korpus, butun eniga kamera platosi, atrofida botlarning tangalari aylanadi.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const ACCENT = 0x8cc8ff;

function roundedRect(w, h, r) {
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
  return s;
}

// burchaklari yumaloq tekislik, UV butun yuzaga yoyilgan
function roundedPlane(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 24);
  const uv = g.attributes.uv, pos = g.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  return g;
}

// yon tomonlari tekis, qirralari ozgina yumaloq plita (iPhone ramkasi kabi)
function slab(w, h, r, d, bevel) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - 2 * bevel, h - 2 * bevel, r - bevel), {
    depth: d - 2 * bevel, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 32,
  });
  g.translate(0, 0, -(d - 2 * bevel) / 2);
  return g;
}

function buildPhone(firstScreen) {
  // iPhone 17 Pro Max nisbatlari: 78 × 163.4 × 8.75 mm
  const W = 0.8, H = 1.676, D = 0.09, R = 0.14;
  const phone = new THREE.Group();

  // alyumin korpus — "Cosmic Orange"
  const ORANGE = 0xff6a1a;
  const titanium = new THREE.MeshPhysicalMaterial({ color: ORANGE, metalness: 0.55, roughness: 0.4, clearcoat: 0.25, envMapIntensity: 0.8 });
  phone.add(new THREE.Mesh(slab(W, H, R, D, 0.008), titanium));

  // old tomon: qora shisha, ingichka ramkali ekran va Dynamic Island
  const blackGlass = new THREE.MeshPhysicalMaterial({ color: 0x030304, roughness: 0.05, clearcoat: 1 });
  const front = new THREE.Mesh(roundedPlane(W - 0.016, H - 0.016, R - 0.008), blackGlass);
  front.position.z = D / 2 + 0.0005;
  phone.add(front);

  const screenMat = new THREE.MeshBasicMaterial({ map: firstScreen, toneMapped: false });
  const screen = new THREE.Mesh(roundedPlane(W - 0.05, H - 0.05, R - 0.03), screenMat);
  screen.position.z = D / 2 + 0.001;
  phone.add(screen);

  const island = new THREE.Mesh(roundedPlane(0.2, 0.056, 0.028), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  island.position.set(0, H / 2 - 0.07, D / 2 + 0.0015);
  phone.add(island);

  const shine = new THREE.Mesh(
    roundedPlane(W - 0.016, H - 0.016, R - 0.008),
    new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.07, roughness: 0.02, clearcoat: 1 })
  );
  shine.position.z = D / 2 + 0.002;
  phone.add(shine);

  // orqa: matli alyumin, pastida MagSafe shishasi
  const backMat = new THREE.MeshPhysicalMaterial({ color: ORANGE, metalness: 0.5, roughness: 0.48, envMapIntensity: 0.7 });
  const back = new THREE.Mesh(roundedPlane(W - 0.016, H - 0.016, R - 0.008), backMat);
  back.rotation.y = Math.PI;
  back.position.z = -D / 2 - 0.0005;
  phone.add(back);

  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xff7a35, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.15, envMapIntensity: 0.6 });
  const inset = new THREE.Mesh(roundedPlane(W - 0.12, 0.92, 0.07), glassMat);
  inset.rotation.y = Math.PI;
  inset.position.set(0, -0.28, -D / 2 - 0.0012);
  phone.add(inset);

  // kamera platosi: orqa tomon bo'ylab butun eniga
  const plateMat = new THREE.MeshPhysicalMaterial({ color: ORANGE, metalness: 0.55, roughness: 0.36, clearcoat: 0.3, envMapIntensity: 0.85 });
  const PW = W - 0.03, PH = 0.42, PD = 0.016;
  const plate = new THREE.Mesh(slab(PW, PH, 0.11, PD, 0.006), plateMat);
  const pz = -D / 2 - PD / 2;
  plate.position.set(0, H / 2 - 0.015 - PH / 2, pz);
  phone.add(plate);
  // linzalar platoning chap qismida (orqadan qaraganda), uchburchak shaklida
  const px = W / 2 - 0.2, py = plate.position.y;

  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0xd9561a, metalness: 0.9, roughness: 0.3 });
  const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050608, roughness: 0.04, clearcoat: 1, metalness: 0.4 });
  const tintMat = new THREE.MeshPhysicalMaterial({ color: 0x24406e, roughness: 0.1, transparent: true, opacity: 0.6, clearcoat: 1 });
  const back0 = pz - PD / 2;
  // telefon orqasi teskari: orqadan qaraganda chap tomon = +x
  [[0.078, 0.08], [0.078, -0.08], [-0.08, 0]].forEach(([dx, dy]) => {
    const x = px + dx, y = py + dy;
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.072, 0.024, 64), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, y, back0 - 0.012);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.056, 64), lensMat);
    lens.rotation.y = Math.PI;
    lens.position.set(x, y, back0 - 0.0245);
    const tint = new THREE.Mesh(new THREE.CircleGeometry(0.024, 32), tintMat);
    tint.rotation.y = Math.PI;
    tint.position.set(x - 0.01, y + 0.01, back0 - 0.025);
    phone.add(ring, lens, tint);
  });
  const dot = (r, color, dx, dy) => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), new THREE.MeshBasicMaterial({ color }));
    m.rotation.y = Math.PI;
    m.position.set(px + dx, py + dy, back0 - 0.0006);
    phone.add(m);
  };
  dot(0.026, 0xf3ead8, -0.42, 0.09);  // chiroq
  dot(0.022, 0x0b0c10, -0.42, -0.07); // LiDAR
  dot(0.006, 0x3a1a08, -0.33, 0.12);  // mikrofon

  // yon tugmalar: chapda Action va ovoz, o'ngda quvvat va Camera Control
  const btn = (h, side, y, mat = titanium) => {
    const b = new THREE.Mesh(slab(0.03, h, 0.012, 0.03, 0.005), mat);
    b.rotation.y = Math.PI / 2;
    b.position.set(side * (W / 2 - 0.006), y, 0);
    phone.add(b);
  };
  btn(0.075, -1, 0.5);
  btn(0.13, -1, 0.33);
  btn(0.13, -1, 0.17);
  btn(0.2, 1, 0.3);
  btn(0.11, 1, -0.12, new THREE.MeshPhysicalMaterial({ color: 0x1a1d22, roughness: 0.08, clearcoat: 1 }));

  phone.scale.setScalar(1.12);
  return { phone, screenMat };
}

export default function PhoneScene({ screens, bots, onScreen }) {
  const wrap = useRef(null);
  const canvasRef = useRef(null);
  const props = useRef({ screens, bots, onScreen });
  props.current = { screens, bots, onScreen };

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = wrap.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      stage.classList.add("no-gl");
      return;
    }
    // telefonlarda piksel zichligi kamroq — sahna silliqroq ishlaydi
    renderer.setPixelRatio(Math.min(devicePixelRatio, matchMedia("(pointer: coarse)").matches ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2, 3, 4);
    const rimLight = new THREE.DirectionalLight(ACCENT, 0.8);
    rimLight.position.set(-3, -1, -2);
    scene.add(key, rimLight, new THREE.AmbientLight(0xffffff, 0.3));

    const loader = new THREE.TextureLoader();
    const tex = (src) => {
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    };

    const { screens, bots } = props.current;
    const screenTex = screens.map((s) => tex(s.img));
    const { phone, screenMat } = buildPhone(screenTex[0]);
    scene.add(phone);

    // bot tangalari
    const CR = 0.18, CT = 0.03;
    const rimMat = new THREE.MeshPhysicalMaterial({ color: 0xd9dbe0, metalness: 1, roughness: 0.25 });
    const coins = bots.map((b, i) => {
      const coin = new THREE.Group();
      const edge = new THREE.Mesh(new THREE.CylinderGeometry(CR, CR, CT, 64), rimMat);
      edge.rotation.x = Math.PI / 2;
      const face = new THREE.Mesh(new THREE.CircleGeometry(CR * 0.94, 64), new THREE.MeshStandardMaterial({ map: tex(b.img), roughness: 0.55 }));
      face.position.z = CT / 2 + 0.001;
      const backFace = face.clone();
      backFace.rotation.y = Math.PI;
      backFace.position.z = -face.position.z;
      coin.add(edge, face, backFace);
      coin.userData = { url: `https://t.me/${b.user}`, phase: (i / bots.length) * Math.PI * 2 };
      coin.children.forEach((m) => (m.userData = coin.userData));
      scene.add(coin);
      return coin;
    });

    /* boshqaruv */
    const mouse = { x: 0, y: 0 };
    let spin = 0, spinVel = 0, dragging = false, dragX = 0, moved = 0;
    let flip = 0, flipTarget = 0, idx = 0, swapped = true, scrollT = 0;

    const onMove = (e) => {
      mouse.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.y = (e.clientY / innerHeight) * 2 - 1;
    };
    const onScroll = () => { scrollT = Math.min(1, scrollY / innerHeight); };

    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hit = (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const c = ray.intersectObjects(coins, true)[0];
      if (c) return { url: c.object.userData.url };
      if (ray.intersectObject(phone, true)[0]) return { phone: true };
      return null;
    };

    const down = (e) => { dragging = true; dragX = e.clientX; moved = 0; canvas.setPointerCapture(e.pointerId); };
    const drag = (e) => {
      if (!dragging) { canvas.style.cursor = hit(e) ? "pointer" : "grab"; return; }
      const dx = e.clientX - dragX;
      dragX = e.clientX;
      moved += Math.abs(dx);
      spinVel = dx * 0.012;
      spin += dx * 0.012;
    };
    const up = (e) => {
      dragging = false;
      if (moved > 6) return;
      const h = hit(e);
      if (h?.url) window.open(h.url, "_blank", "noopener");
      else if (h?.phone) {
        flipTarget += Math.PI * 2;
        swapped = false;
        idx = (idx + 1) % screens.length;
      }
    };

    addEventListener("pointermove", onMove);
    addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", drag);
    canvas.addEventListener("pointerup", up);

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // telefon va tangalar har qanday nisbatdagi sahnaga sig'adigan masofa
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const z = Math.max(1.22 / t, 1.3 / (t * camera.aspect)) + 0.6;
      camera.position.set(0, 0, z);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    let visible = true;
    const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    vis.observe(stage);

    const clock = new THREE.Clock();
    let raf;
    const k = reduced ? 0 : 1;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();

      if (!dragging) { spinVel *= 0.94; spin += spinVel; spin *= 0.985; }
      flip += (flipTarget - flip) * 0.08;
      if (!swapped && Math.abs(flipTarget - flip) < Math.PI) {
        screenMat.map = screenTex[idx];
        props.current.onScreen?.(screens[idx].name);
        swapped = true;
      }

      const ty = mouse.x * 0.45 + Math.sin(t * 0.6) * 0.14 * k + spin + flip + scrollT * 0.9;
      const tx = mouse.y * 0.22 + Math.sin(t * 0.8) * 0.04 * k - 0.08;
      phone.rotation.y += (ty - phone.rotation.y) * 0.08;
      phone.rotation.x += (tx - phone.rotation.x) * 0.08;
      phone.rotation.z = Math.sin(t * 0.5) * 0.03 * k;
      phone.position.y = Math.sin(t * 1.1) * 0.05 * k;

      coins.forEach((c, i) => {
        const a = c.userData.phase + t * 0.45 * k;
        c.position.set(Math.cos(a) * 1.0, Math.sin(a * 2 + i) * 0.4 + 0.05, Math.sin(a) * 0.7);
        c.lookAt(camera.position);
        c.rotateY(Math.sin(t * 1.3 + i) * 0.45 * k);
      });

      renderer.render(scene, camera);
    };
    frame();
    stage.classList.add("ready");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", drag);
      canvas.removeEventListener("pointerup", up);
      scene.traverse((o) => {
        o.geometry?.dispose();
        [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
      pmrem.dispose();
      renderer.dispose();
      stage.classList.remove("ready");
    };
  }, []);

  return (
    <div className="stage-gl" ref={wrap}>
      <canvas ref={canvasRef} aria-label="3D telefon: ishlarim va botlarim" />
      <img className="stage-fallback" src={screens[0]?.img} alt="OPUS MARKET ilovasi" />
    </div>
  );
}

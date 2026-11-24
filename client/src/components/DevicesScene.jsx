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

    // noutbuk: "space gray" alyumin korpus, old tomoni chetigacha qora shisha
    const alu = new THREE.MeshPhysicalMaterial({ color: 0x50545d, metalness: 0.9, roughness: 0.32, clearcoat: 0.25, envMapIntensity: 1 });
    const aluDark = new THREE.MeshPhysicalMaterial({ color: 0x2c2f35, metalness: 0.85, roughness: 0.45 });
    const well = new THREE.MeshStandardMaterial({ color: 0x0e0f12, roughness: 0.85 });
    const keyMat = new THREE.MeshPhysicalMaterial({ color: 0x17191d, roughness: 0.55, clearcoat: 0.3 });
    const black = new THREE.MeshPhysicalMaterial({ color: 0x050506, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 });
    const laptop = new THREE.Group();

    // pastki qism: ikki qatlamli plita — tepasi biroz torayadi (yumshoq qirra)
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.034, 1.08, 6, 0.016), alu);
    base.position.y = 0.017;
    const baseTop = new THREE.Mesh(new RoundedBoxGeometry(1.585, 0.02, 1.065, 6, 0.01), alu);
    baseTop.position.y = 0.036;
    // old qirradagi barmoq botig'i
    const notch = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.012, 0.03, 3, 0.005), aluDark);
    notch.position.set(0, 0.04, 0.533);
    laptop.add(base, baseTop, notch);

    // klaviatura: botiq maydon va alohida tugmachalar (InstancedMesh — bitta chizish)
    const deck = 0.0462;
    const kwell = new THREE.Mesh(roundedPlane(1.34, 0.5, 0.02), well);
    kwell.rotation.x = -Math.PI / 2;
    kwell.position.set(0, deck, -0.15);
    laptop.add(kwell);
    const KW = 0.078, GAP = 0.0105, COLS = 14, ROWS = 6;
    const keyGeo = new RoundedBoxGeometry(KW, 0.008, KW * 0.9, 2, 0.006);
    const keyInst = new THREE.InstancedMesh(keyGeo, keyMat, COLS * ROWS);
    const m4 = new THREE.Matrix4();
    let n = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = -((COLS - 1) * (KW + GAP)) / 2 + c * (KW + GAP);
        const z = -0.37 + r * (KW * 0.9 + GAP);
        // pastki qatorda probel: o'rtadagi tugmalar bitta keng tugmaga qo'shiladi
        if (r === ROWS - 1 && c >= 4 && c <= 9) {
          if (c === 4) {
            m4.compose(new THREE.Vector3(x + (KW + GAP) * 2.5, deck + 0.004, z), new THREE.Quaternion(), new THREE.Vector3(6 + 5 * GAP / KW, 1, 1));
            keyInst.setMatrixAt(n++, m4);
          }
          continue;
        }
        m4.makeTranslation(x, deck + 0.004, z);
        keyInst.setMatrixAt(n++, m4);
      }
    }
    keyInst.count = n;
    laptop.add(keyInst);

    // sensorli panel va dinamik panjaralari
    const pad = new THREE.Mesh(roundedPlane(0.56, 0.32, 0.03), new THREE.MeshPhysicalMaterial({ color: 0x464a52, metalness: 0.5, roughness: 0.22, clearcoat: 0.6 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, deck + 0.0004, 0.3);
    laptop.add(pad);
    const holeGeo = new THREE.CircleGeometry(0.0045, 8);
    const holes = new THREE.InstancedMesh(holeGeo, well, 2 * 7 * 26);
    let h = 0;
    for (const side of [-1, 1]) {
      for (let r = 0; r < 26; r++) {
        for (let c = 0; c < 7; c++) {
          m4.makeRotationX(-Math.PI / 2);
          m4.setPosition(side * (0.645 + c * 0.0135), deck + 0.0003, -0.38 + r * 0.0175);
          holes.setMatrixAt(h++, m4);
        }
      }
    }
    laptop.add(holes);

    // sharnir: orqa qirradagi silindr
    const hingeBar = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 1.3, 24), aluDark);
    hingeBar.rotation.z = Math.PI / 2;
    hingeBar.position.set(0, 0.046, -0.528);
    laptop.add(hingeBar);

    // qopqoq: orqasi alyumin, oldi butun yuza bo'ylab qora shisha (ramka yo'q)
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.046, -0.528);
    const LW = 1.6, LH = 1.04, LT = 0.022;
    const lid = new THREE.Mesh(new RoundedBoxGeometry(LW, LH, LT, 6, 0.011), alu);
    lid.position.y = LH / 2 + 0.012;
    const bezel = new THREE.Mesh(roundedPlane(LW - 0.006, LH - 0.006, 0.03), black);
    bezel.position.set(0, lid.position.y, LT / 2 + 0.0006);
    const lapMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    // ekran 16:10, tepada kamera uchun biroz joy qoladi
    const lapScreen = new THREE.Mesh(roundedPlane(1.52, 0.95, 0.012), lapMat);
    lapScreen.position.set(0, lid.position.y - 0.018, LT / 2 + 0.0012);
    const cam = new THREE.Mesh(new THREE.CircleGeometry(0.008, 16), new THREE.MeshBasicMaterial({ color: 0x1b2433 }));
    cam.position.set(0, lid.position.y + LH / 2 - 0.022, LT / 2 + 0.0012);
    // shisha yaltirashi: ekran ustidagi juda shaffof qatlam
    const glare = new THREE.Mesh(roundedPlane(LW - 0.006, LH - 0.006, 0.03), new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.06, roughness: 0.02, clearcoat: 1 }));
    glare.position.set(0, lid.position.y, LT / 2 + 0.0018);
    // qopqoq orqasidagi belgi
    const logo = new THREE.Mesh(new THREE.CircleGeometry(0.07, 48), new THREE.MeshPhysicalMaterial({ color: 0x8a8f98, metalness: 1, roughness: 0.15 }));
    logo.rotation.y = Math.PI;
    logo.position.set(0, lid.position.y, -LT / 2 - 0.0008);
    hinge.add(lid, bezel, lapScreen, cam, glare, logo);
    hinge.rotation.x = LID_OPEN;
    laptop.add(hinge);
    laptop.position.set(-0.32, 0, 0);
    root.add(laptop);

    // telefon: yon tomonlari tekis metall ramka, oldi va orqasi shisha, tik turibdi
    const PW = 0.42, PH = 0.88, PD = 0.042, PR = 0.065, PB = 0.007;
    const phone = new THREE.Group();
    const frameMat = new THREE.MeshPhysicalMaterial({ color: 0x3a3e46, metalness: 1, roughness: 0.28, clearcoat: 0.5, envMapIntensity: 1.1 });
    const shape = new THREE.Shape();
    {
      const w = PW - 2 * PB, hh = PH - 2 * PB, r = PR - PB, x = -w / 2, y = -hh / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + hh - r);
      shape.quadraticCurveTo(x + w, y + hh, x + w - r, y + hh);
      shape.lineTo(x + r, y + hh);
      shape.quadraticCurveTo(x, y + hh, x, y + hh - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
    }
    const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: PD - 2 * PB, bevelEnabled: true, bevelThickness: PB, bevelSize: PB, bevelSegments: 4, curveSegments: 24 });
    bodyGeo.translate(0, 0, -(PD - 2 * PB) / 2);
    const body = new THREE.Mesh(bodyGeo, frameMat);
    // old: chetigacha qora shisha, ichida ekran, tepada "orolcha"
    const glass = new THREE.Mesh(roundedPlane(PW - 0.01, PH - 0.01, PR - 0.005), black);
    glass.position.z = PD / 2 + 0.0004;
    const phMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const phScreen = new THREE.Mesh(roundedPlane(PW - 0.032, PH - 0.032, PR - 0.016), phMat);
    phScreen.position.z = PD / 2 + 0.0008;
    const island = new THREE.Mesh(roundedPlane(0.1, 0.028, 0.014), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    island.position.set(0, PH / 2 - 0.042, PD / 2 + 0.0012);
    const phGlare = new THREE.Mesh(roundedPlane(PW - 0.01, PH - 0.01, PR - 0.005), new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.07, roughness: 0.02, clearcoat: 1 }));
    phGlare.position.z = PD / 2 + 0.0016;
    phone.add(body, glass, phScreen, island, phGlare);

    // orqa: xira shisha va kamera bloki (telefon aylanganda ko'rinadi)
    const backGlass = new THREE.Mesh(roundedPlane(PW - 0.01, PH - 0.01, PR - 0.005), new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, roughness: 0.55, clearcoat: 0.3 }));
    backGlass.rotation.y = Math.PI;
    backGlass.position.z = -PD / 2 - 0.0004;
    const bump = new THREE.Mesh(new RoundedBoxGeometry(0.17, 0.17, 0.014, 4, 0.006), frameMat);
    bump.position.set(PW / 2 - 0.105, PH / 2 - 0.105, -PD / 2 - 0.006);
    phone.add(backGlass, bump);
    const ring = new THREE.MeshPhysicalMaterial({ color: 0x55595f, metalness: 1, roughness: 0.25 });
    const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x06070a, roughness: 0.05, clearcoat: 1 });
    [[-0.038, 0.038], [-0.038, -0.038], [0.04, 0]].forEach(([dx, dy]) => {
      const x = bump.position.x - dx, y = bump.position.y + dy;
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.031, 0.012, 32), ring);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, y, -PD / 2 - 0.018);
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.022, 32), lensMat);
      lens.rotation.y = Math.PI;
      lens.position.set(x, y, -PD / 2 - 0.0245);
      phone.add(rim, lens);
    });
    const flash = new THREE.Mesh(new THREE.CircleGeometry(0.01, 16), new THREE.MeshBasicMaterial({ color: 0xf2ead8 }));
    flash.rotation.y = Math.PI;
    flash.position.set(bump.position.x - 0.04, bump.position.y + 0.05, -PD / 2 - 0.0135);
    phone.add(flash);

    // yon tugmalar: chapda ovoz (2 ta), o'ngda quvvat
    const btnGeo = (h) => new RoundedBoxGeometry(0.01, h, 0.016, 2, 0.004);
    [[-1, 0.2, 0.09], [-1, 0.08, 0.09], [1, 0.14, 0.13]].forEach(([side, y, h]) => {
      const b = new THREE.Mesh(btnGeo(h), frameMat);
      b.position.set(side * (PW / 2 + 0.002), y, 0);
      phone.add(b);
    });
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
      return ray.intersectObjects([lapScreen, bezel, phScreen, body, lid], false).length > 0;
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

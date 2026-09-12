import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Camera, ZoomIn, ZoomOut, Check } from 'lucide-react';

export default function ThreeMithaiBox({ activeMode = 'kaju' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const stageGroupRef = useRef(null);
  const sweetsGroupRef = useRef(null);
  const lightTrackerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true);
  const [snapshotSuccess, setSnapshotSuccess] = useState(false);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Capture High-Res Screenshot from WebGL
  const handleTakeScreenshot = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const canvas = rendererRef.current.domElement;
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = `Nenshi-Royal-${activeMode === 'kaju' ? 'Kaju-Katli' : 'Milk-Cake'}-3D.png`;
    link.href = dataUrl;
    link.click();

    setSnapshotSuccess(true);
    setTimeout(() => setSnapshotSuccess(false), 2400);
  };

  const handleZoom = (delta) => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    const dir = cam.position.clone().normalize();
    const currentDist = cam.position.length();
    const newDist = Math.max(3.6, Math.min(7.0, currentDist + delta));
    cam.position.copy(dir.multiplyScalar(newDist));
  };

  const handleResetView = () => {
    if (!stageGroupRef.current || !cameraRef.current) return;
    stageGroupRef.current.rotation.set(0.52, -0.28, 0);
    cameraRef.current.position.set(0, 3.2, 4.6);
    cameraRef.current.lookAt(0, 0.08, 0);
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // =========================================================================
    // 1. PROCEDURAL ULTRA-HD SHADERS, MAPS & NORMAL MAPS
    // =========================================================================

    // A. 1024x1024 True Tangent-Space Normal Map for Chandi Ka Vark (Silver Foil Creases)
    function createSilverVarkNormalMap() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Flat normal base: RGB(128, 128, 255)
      ctx.fillStyle = '#8080FF';
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine foil micro-folds with realistic tangent displacement
      for (let i = 0; i < 360; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const len = Math.random() * 160 + 30;
        const angle = Math.random() * Math.PI;

        const nx = Math.cos(angle);
        const ny = Math.sin(angle);

        // Perturb R and G for normal deflection, keep B high
        const rVal = Math.floor(128 + nx * 50);
        const gVal = Math.floor(128 + ny * 50);
        ctx.strokeStyle = `rgb(${rVal}, ${gVal}, 245)`;
        ctx.lineWidth = Math.random() * 2.5 + 0.8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + nx * len, y + ny * len);
        ctx.stroke();
      }

      // Micro-grain noise for hammered silver leaf
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      const d = imgData.data;
      for (let p = 0; p < d.length; p += 4) {
        const noise = (Math.random() - 0.5) * 16;
        d[p] = Math.min(255, Math.max(0, d[p] + noise));
        d[p + 1] = Math.min(255, Math.max(0, d[p + 1] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.5, 1.5);
      return texture;
    }

    // B. Chandi Ka Vark Specular & Diffuse Leaf Texture (With delicate micro-tears revealing cashew base)
    function createSilverVarkDiffuseTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Lustrous pure silver base
      ctx.fillStyle = '#F4F7FA';
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine specular wrinkle highlights
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const len = Math.random() * 140 + 20;
        const angle = Math.random() * Math.PI;

        ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(195, 205, 215, 0.65)';
        ctx.lineWidth = Math.random() * 2.0 + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
        ctx.stroke();
      }

      // Microscopic tears along beaten foil where cashew dough peeps through
      for (let t = 0; t < 18; t++) {
        const cx = Math.random() * 900 + 60;
        const cy = Math.random() * 900 + 60;
        const rw = Math.random() * 18 + 4;
        const rh = Math.random() * 8 + 3;

        ctx.fillStyle = 'rgba(240, 226, 206, 0.72)'; // Cashew dough peeking
        ctx.beginPath();
        ctx.ellipse(cx, cy, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // C. Stone-Ground Cashew Dough (Kaju Dough) Texture
    function createCashewDoughTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Creamy warm ivory dough substrate
      ctx.fillStyle = '#F3EAD9';
      ctx.fillRect(0, 0, 512, 512);

      // Stone-ground nut grains (warm beige flecks and ghee shine)
      for (let i = 0; i < 3200; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 1.6 + 0.4;
        const tone = Math.random();
        if (tone > 0.65) {
          ctx.fillStyle = 'rgba(215, 188, 150, 0.55)'; // Ground nut meal
        } else if (tone > 0.3) {
          ctx.fillStyle = 'rgba(255, 248, 235, 0.85)'; // Clarified ghee glaze
        } else {
          ctx.fillStyle = 'rgba(185, 150, 110, 0.32)'; // Roasted nut speck
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // D. 1024x1024 Royal 22K Gold Charger Thali Platter Medallion Texture
    function createGoldThaliTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Rich 22K Gold Radial Sheen
      const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 510);
      grad.addColorStop(0, '#FFF2BF'); // Luminous center
      grad.addColorStop(0.25, '#E8C56A'); // Warm 22K gold
      grad.addColorStop(0.65, '#C69938'); // Burnished royal gold
      grad.addColorStop(0.92, '#A67924'); // Deep chased border
      grad.addColorStop(1, '#6E4D12'); // Outer rim edge

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Concentric Engraved Filigree Rings
      ctx.strokeStyle = 'rgba(110, 75, 18, 0.45)';
      ctx.lineWidth = 3;
      [220, 260, 310, 420, 470, 490].forEach(rad => {
        ctx.beginPath();
        ctx.arc(512, 512, rad, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Royal Mughal 16-Petal Lotus Medallion in Center
      const petals = 16;
      ctx.strokeStyle = 'rgba(125, 85, 20, 0.38)';
      ctx.fillStyle = 'rgba(255, 240, 180, 0.18)';
      ctx.lineWidth = 2;

      for (let p = 0; p < petals; p++) {
        const a = (p * Math.PI * 2) / petals;
        const x1 = 512 + Math.cos(a) * 90;
        const y1 = 512 + Math.sin(a) * 90;
        const tipX = 512 + Math.cos(a + Math.PI / petals) * 200;
        const tipY = 512 + Math.sin(a + Math.PI / petals) * 200;
        const x2 = 512 + Math.cos(a + (Math.PI * 2) / petals) * 90;
        const y2 = 512 + Math.sin(a + (Math.PI * 2) / petals) * 90;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(tipX, tipY, x2, y2);
        ctx.stroke();
        ctx.fill();
      }

      // Hand-hammered repoussé micro-facets
      for (let i = 0; i < 900; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = Math.random() * 14 + 6;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 245, 205, 0.14)' : 'rgba(90, 60, 12, 0.12)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // E. 1024x1024 Authentic Alwar Milk Cake Texture (Two-Tone Caramelized Core & Danedaar Crumb)
    function createMilkCakeTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Authentic two-tone caramel gradient: rich mahogany core to golden amber
      const grad = ctx.createRadialGradient(512, 512, 70, 512, 512, 580);
      grad.addColorStop(0, '#3A1804'); // Deep wood-fire caramelized heart
      grad.addColorStop(0.32, '#5E2808'); // Roasted amber mawa
      grad.addColorStop(0.68, '#B26D24'); // Golden honeycomb
      grad.addColorStop(1, '#DDA356'); // Outer crumbly curd crust

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // "Danedaar" granular curd nodules (glistening curd texture)
      for (let i = 0; i < 4200; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = Math.random() * 3.0 + 0.6;
        const alpha = Math.random();
        ctx.fillStyle = alpha > 0.55 ? 'rgba(255, 238, 195, 0.38)' : 'rgba(38, 14, 2, 0.44)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // F. Hand-Hammered Repoussé Dimple Normal Map
    function createHammeredMetalNormal() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#8080FF';
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 220; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const rad = Math.random() * 24 + 10;
        const dimpleGrad = ctx.createRadialGradient(x, y, 0, x, y, rad);
        dimpleGrad.addColorStop(0, '#7070FF');
        dimpleGrad.addColorStop(0.6, '#8888FF');
        dimpleGrad.addColorStop(1, '#8080FF');
        ctx.fillStyle = dimpleGrad;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 3);
      return texture;
    }

    // G. Soft Contact Shadow Texture (Pure Gaussian falloff, blends into #FBF8F2)
    function createContactShadowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 256);
      grad.addColorStop(0, 'rgba(60, 36, 12, 0.46)');
      grad.addColorStop(0.35, 'rgba(85, 52, 20, 0.22)');
      grad.addColorStop(0.7, 'rgba(110, 72, 32, 0.05)');
      grad.addColorStop(1, 'rgba(110, 72, 32, 0.0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      return new THREE.CanvasTexture(canvas);
    }

    // =========================================================================
    // 2. THREE.JS SCENE, CAMERA & RENDERER SETUP (CALIBRATED SIZING)
    // =========================================================================
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = currentMount.clientWidth || 560;
    const height = currentMount.clientHeight || 520;
    const aspect = width / height;

    // Calibrated FOV & Distance: Platter sits perfectly centered with 25% margin
    const camera = new THREE.PerspectiveCamera(aspect < 1 ? 34 : 30, aspect, 0.1, 100);
    camera.position.set(0, 3.2, 4.6);
    camera.lookAt(0, 0.08, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // =========================================================================
    // 3. PROCEDURAL WARM STUDIO HDRI ENVIRONMENT WITH SHARP SPECULAR SOFTBOXES
    // =========================================================================
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext('2d');

    // Rich warm ambient studio horizon
    const envGrad = envCtx.createLinearGradient(0, 0, 0, 512);
    envGrad.addColorStop(0, '#FFFFFF');
    envGrad.addColorStop(0.25, '#FFF7EB');
    envGrad.addColorStop(0.55, '#E8CDA0');
    envGrad.addColorStop(0.85, '#9E6E2D');
    envGrad.addColorStop(1, '#3B2108');
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 1024, 512);

    // High-Key Studio Softbox Lighting Panels for sparkling metallic reflections
    envCtx.fillStyle = '#FFFFFF';
    envCtx.fillRect(260, 40, 340, 120);
    envCtx.fillRect(720, 90, 180, 80);
    envCtx.fillRect(80, 120, 120, 70);

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = pmremGenerator.fromEquirectangular(envTexture).texture;

    // =========================================================================
    // 4. STUDIO LIGHTING RIG
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.6);
    scene.add(ambientLight);

    // Key Light (Warm sunlight casting soft contact shadows)
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 3.6);
    keyLight.position.set(5.0, 8.5, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -2.6;
    keyLight.shadow.camera.right = 2.6;
    keyLight.shadow.camera.top = 2.6;
    keyLight.shadow.camera.bottom = -2.6;
    keyLight.shadow.bias = -0.00015;
    keyLight.shadow.radius = 2.2;
    scene.add(keyLight);

    // Golden Rim Light (Illuminates metallic platter rims and silver leaf edges)
    const rimGoldLight = new THREE.DirectionalLight(0xe5b838, 2.5);
    rimGoldLight.position.set(-5.5, 4.2, -4.5);
    scene.add(rimGoldLight);

    // Overhead Specular Light for Silver Leaf Luster
    const topFillLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    topFillLight.position.set(0, 9, 1);
    scene.add(topFillLight);

    // Interactive Inspection Light (Gently tracks cursor)
    const inspectionLight = new THREE.PointLight(0xfffaed, 2.2, 10);
    inspectionLight.position.set(0, 3.6, 3.4);
    scene.add(inspectionLight);
    lightTrackerRef.current = inspectionLight;

    // Soft Ambient Grounding Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createContactShadowTexture(),
      transparent: true,
      opacity: 0.94,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.015;
    scene.add(shadowMesh);

    // Dynamic Shadow Catcher Plane
    const shadowCatcherGeo = new THREE.PlaneGeometry(9, 9);
    const shadowCatcherMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowCatcher = new THREE.Mesh(shadowCatcherGeo, shadowCatcherMat);
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.y = -0.02;
    shadowCatcher.receiveShadow = true;
    scene.add(shadowCatcher);

    // =========================================================================
    // 5. HYPER-REALISTIC MATERIALS
    // =========================================================================
    const varkNormal = createSilverVarkNormalMap();
    const varkDiffuse = createSilverVarkDiffuseTexture();
    const cashewTex = createCashewDoughTexture();
    const thaliTex = createGoldThaliTexture();
    const milkCakeTex = createMilkCakeTexture();
    const hammeredNormal = createHammeredMetalNormal();

    // 22K Royal Gold Platter Material (Rich specular reflection & engraved medallion)
    const royalGoldMat = new THREE.MeshStandardMaterial({
      map: thaliTex,
      color: 0xffe6a3,
      roughness: 0.24,
      metalness: 0.88,
      normalMap: hammeredNormal,
      normalScale: new THREE.Vector2(0.28, 0.28),
      envMapIntensity: 2.6
    });

    // Polished 22K Gold Rim Material
    const royalGoldRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.18,
      metalness: 0.94,
      envMapIntensity: 3.0
    });

    // Antique Brass with Patina for Uruli
    const antiqueBrassMat = new THREE.MeshStandardMaterial({
      color: 0xc49a46,
      roughness: 0.34,
      metalness: 0.86,
      normalMap: hammeredNormal,
      normalScale: new THREE.Vector2(0.5, 0.5),
      envMapIntensity: 2.4
    });

    // Certified 99.9% Pure Chandi Ka Vark (True normal creases, metallic sheen)
    const silverVarkMat = new THREE.MeshStandardMaterial({
      map: varkDiffuse,
      normalMap: varkNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.98,
      envMapIntensity: 3.4
    });

    // Stone-Ground Goan Cashew Dough (Creamy bevels & sides)
    const cashewDoughMat = new THREE.MeshStandardMaterial({
      map: cashewTex,
      color: 0xfbf6ee,
      roughness: 0.56,
      metalness: 0.02,
      bumpMap: cashewTex,
      bumpScale: 0.015
    });

    // Kashmiri Saffron Material (Rich crimson-ruby 3D lit fiber)
    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0x8b1206,
      roughness: 0.32,
      metalness: 0.08
    });

    // Iranian Pistachio Sliver Material
    const pistachioMat = new THREE.MeshStandardMaterial({
      color: 0x5a8c24,
      roughness: 0.32,
      metalness: 0.05
    });

    // Persian Dried Rose Petal Material
    const rosePetalMat = new THREE.MeshStandardMaterial({
      color: 0x931336,
      roughness: 0.42,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    // =========================================================================
    // 6. 3D GEOMETRY CONSTRUCTION (CALIBRATED DIMENSIONS — ZERO CLIPPING)
    // =========================================================================
    const stageGroup = new THREE.Group();
    stageGroupRef.current = stageGroup;
    stageGroup.rotation.set(0.52, -0.28, 0); // Inviting 3/4 luxury perspective
    scene.add(stageGroup);

    const sweetsGroup = new THREE.Group();
    sweetsGroupRef.current = sweetsGroup;
    stageGroup.add(sweetsGroup);

    function build3DModel(mode) {
      while (sweetsGroup.children.length > 0) {
        sweetsGroup.remove(sweetsGroup.children[0]);
      }

      if (mode === 'kaju') {
        // ---------------------------------------------------------------------
        // A. 22K ROYAL CHARGER THALI (Radius 1.52 — perfectly framed)
        // ---------------------------------------------------------------------
        const thaliGroup = new THREE.Group();

        // Main Platter Disc with Engraved Medallion
        const thaliBodyGeo = new THREE.CylinderGeometry(1.52, 1.46, 0.028, 64);
        const thaliBody = new THREE.Mesh(thaliBodyGeo, royalGoldMat);
        thaliBody.position.y = 0.014;
        thaliBody.castShadow = true;
        thaliBody.receiveShadow = false; // Prevents harsh diagonal split shadow across platter
        thaliGroup.add(thaliBody);

        // Repoussé Beaded Rim with Polished Gold Luster
        const thaliRimGeo = new THREE.TorusGeometry(1.51, 0.028, 16, 64);
        const thaliRim = new THREE.Mesh(thaliRimGeo, royalGoldRimMat);
        thaliRim.position.y = 0.030;
        thaliRim.rotation.x = Math.PI / 2;
        thaliGroup.add(thaliRim);

        sweetsGroup.add(thaliGroup);

        // ---------------------------------------------------------------------
        // B. THE 8-POINTED ROYAL STAR OF KAJU KATLI
        // ---------------------------------------------------------------------
        // Apex angle = 45° (PI/4), side = 0.38, length = 0.70, half-width = 0.145
        const katliShape = new THREE.Shape();
        katliShape.moveTo(0, 0);
        katliShape.lineTo(0.145, 0.35);
        katliShape.lineTo(0, 0.70);
        katliShape.lineTo(-0.145, 0.35);
        katliShape.closePath();

        const katliExtrudeSettings = {
          depth: 0.082,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.012,
          bevelThickness: 0.012
        };
        const katliGeo = new THREE.ExtrudeGeometry(katliShape, katliExtrudeSettings);

        // 8 Symmetrical Central Diamonds meeting at center
        for (let i = 0; i < 8; i++) {
          const katliPiece = new THREE.Group();
          katliPiece.rotation.x = -Math.PI / 2;
          katliPiece.rotation.z = (i * Math.PI) / 4;
          katliPiece.position.set(0, 0.029, 0);

          // Cashew base dough block (Top face: silver vark, sides: creamy cashew dough)
          const katliMesh = new THREE.Mesh(katliGeo, [silverVarkMat, cashewDoughMat]);
          katliMesh.castShadow = true;
          katliPiece.add(katliMesh);

          // Organic 3D Curved Kashmiri Saffron Stigma
          const saffronCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0.28, 0.098),
            new THREE.Vector3(0.022, 0.38, 0.104),
            new THREE.Vector3(-0.012, 0.48, 0.098)
          ]);
          const saffronGeo = new THREE.TubeGeometry(saffronCurve, 10, 0.0095, 8, false);
          const saffron = new THREE.Mesh(saffronGeo, saffronMat);
          katliPiece.add(saffron);

          // Saffron Golden Blush / Diffusion Stain Halo (Bleeds outward into cashew)
          const blushGeo = new THREE.CircleGeometry(0.12, 16);
          const blushMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.38
          });
          const blush = new THREE.Mesh(blushGeo, blushMat);
          blush.position.set(0, 0.35, 0.096);
          katliPiece.add(blush);

          sweetsGroup.add(katliPiece);
        }

        // ---------------------------------------------------------------------
        // C. 4 SATELLITE COMPANION DIAMOND KATLIS (Resting comfortably on platter)
        // ---------------------------------------------------------------------
        const satelliteCoords = [
          [-0.78, -0.78, Math.PI / 4],
          [0.78, -0.78, -Math.PI / 4],
          [-0.78, 0.78, (3 * Math.PI) / 4],
          [0.78, 0.78, -(3 * Math.PI) / 4]
        ];

        satelliteCoords.forEach(([cx, cz, rotZ]) => {
          const satPiece = new THREE.Group();
          satPiece.rotation.x = -Math.PI / 2;
          satPiece.rotation.z = rotZ;
          satPiece.scale.set(0.66, 0.66, 0.66);
          satPiece.position.set(cx, 0.029, cz);

          const satMesh = new THREE.Mesh(katliGeo, [silverVarkMat, cashewDoughMat]);
          satMesh.castShadow = true;
          satPiece.add(satMesh);

          sweetsGroup.add(satPiece);
        });

        // ---------------------------------------------------------------------
        // D. ARTISANAL GARNISH: TWO-TONE PISTACHIOS & PERSIAN ROSE PETALS
        // ---------------------------------------------------------------------
        const pistaGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.065, 8);
        pistaGeo.rotateZ(Math.PI / 2);

        const roseGeo = new THREE.CircleGeometry(0.038, 8);

        for (let g = 0; g < 14; g++) {
          const angle = (g / 14) * Math.PI * 2 + 0.18;
          const radius = 1.16 + Math.sin(g * 3) * 0.16;
          const px = Math.cos(angle) * radius;
          const pz = Math.sin(angle) * radius;

          if (g % 2 === 0) {
            const pistaMesh = new THREE.Mesh(pistaGeo, pistachioMat);
            pistaMesh.position.set(px, 0.034, pz);
            pistaMesh.rotation.y = angle + 0.4;
            sweetsGroup.add(pistaMesh);
          } else {
            const roseMesh = new THREE.Mesh(roseGeo, rosePetalMat);
            roseMesh.position.set(px, 0.032, pz);
            roseMesh.rotation.x = -Math.PI / 2 + 0.2;
            roseMesh.rotation.z = angle;
            sweetsGroup.add(roseMesh);
          }
        }

      } else {
        // ---------------------------------------------------------------------
        // MILK CAKE MODE: AUTHENTIC ANTIQUE BRASS URULI & CARAMELIZED MOUND
        // ---------------------------------------------------------------------
        const uruliGroup = new THREE.Group();

        // Pedestal brass foot
        const footGeo = new THREE.CylinderGeometry(0.70, 0.90, 0.12, 36);
        const foot = new THREE.Mesh(footGeo, antiqueBrassMat);
        foot.position.y = 0.06;
        foot.castShadow = true;
        uruliGroup.add(foot);

        // Deep hand-hammered traditional brass uruli bowl
        const bowlGeo = new THREE.CylinderGeometry(1.46, 0.70, 0.54, 48);
        const bowl = new THREE.Mesh(bowlGeo, antiqueBrassMat);
        bowl.position.y = 0.35;
        bowl.castShadow = true;
        uruliGroup.add(bowl);

        // Heavy fluted rim
        const rimGeo = new THREE.TorusGeometry(1.47, 0.048, 16, 48);
        const rim = new THREE.Mesh(rimGeo, antiqueBrassMat);
        rim.position.y = 0.61;
        rim.rotation.x = Math.PI / 2;
        uruliGroup.add(rim);

        // Twin royal ornamental ring handles
        [-1.54, 1.54].forEach(hx => {
          const handleGeo = new THREE.TorusGeometry(0.22, 0.038, 12, 24);
          const handle = new THREE.Mesh(handleGeo, antiqueBrassMat);
          handle.position.set(hx, 0.56, 0);
          handle.rotation.y = Math.PI / 2;
          uruliGroup.add(handle);
        });

        // Generous Artisanal Stack of Caramelized Milk Cake Bars
        const milkCakeMat = new THREE.MeshStandardMaterial({
          map: milkCakeTex,
          roughness: 0.62,
          metalness: 0.04,
          bumpMap: milkCakeTex,
          bumpScale: 0.026
        });

        // 9 Pieces in a regal tiered pyramid
        const cakePositions = [
          // Base Tier
          [0, 0.62, 0, 0.08],
          [-0.45, 0.58, -0.32, 0.35],
          [0.45, 0.58, -0.28, -0.30],
          [-0.42, 0.58, 0.34, -0.40],
          [0.42, 0.58, 0.30, 0.44],
          // Mid Tier
          [0, 0.82, -0.15, 0.22],
          [-0.24, 0.78, 0.18, -0.32],
          [0.24, 0.78, 0.14, 0.28],
          // Crown Tier
          [0, 0.98, 0.04, -0.12]
        ];

        cakePositions.forEach(([x, y, z, r], idx) => {
          const cakePiece = new THREE.Group();
          cakePiece.position.set(x, y - 0.12, z);
          cakePiece.rotation.y = r;

          const cakeBlockGeo = new THREE.BoxGeometry(0.68, 0.24, 0.44);
          const cakeBlock = new THREE.Mesh(cakeBlockGeo, milkCakeMat);
          cakeBlock.castShadow = true;
          cakePiece.add(cakeBlock);

          // Pistachio sliver garnish on prominent pieces
          if (idx >= 3) {
            const pistaGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.10, 8);
            pistaGeo.rotateZ(Math.PI / 2);
            const pista = new THREE.Mesh(pistaGeo, pistachioMat);
            pista.position.set(0.08, 0.13, 0);
            pista.rotation.y = Math.PI / 4;
            cakePiece.add(pista);

            const petalGeo = new THREE.CircleGeometry(0.045, 8);
            const petal = new THREE.Mesh(petalGeo, rosePetalMat);
            petal.position.set(-0.08, 0.13, 0.04);
            petal.rotation.x = -Math.PI / 2 + 0.18;
            cakePiece.add(petal);
          }

          uruliGroup.add(cakePiece);
        });

        sweetsGroup.add(uruliGroup);
      }
    }

    build3DModel(activeMode);

    // =========================================================================
    // 7. FLOATING GOLDEN BOKEH AURA PARTICLES
    // =========================================================================
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 5.5;
      particlePositions[p + 1] = Math.random() * 3.2 + 0.1;
      particlePositions[p + 2] = (Math.random() - 0.5) * 5.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.048,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // 8. INTERACTIVE DRAG & CURSOR TRACKING
    // =========================================================================
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (lightTrackerRef.current) {
        lightTrackerRef.current.position.x = normX * 3.2;
        lightTrackerRef.current.position.z = normY * 2.2 + 3.4;
      }

      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      velocityRef.current = { x: deltaX * 0.007, y: deltaY * 0.004 };

      if (stageGroupRef.current) {
        stageGroupRef.current.rotation.y += velocityRef.current.x;
        stageGroupRef.current.rotation.x = Math.max(0.18, Math.min(0.74, stageGroupRef.current.rotation.x + velocityRef.current.y));
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.004;
      const cam = cameraRef.current;
      if (!cam) return;
      const dir = cam.position.clone().normalize();
      const currentDist = cam.position.length();
      const newDist = Math.max(3.6, Math.min(7.0, currentDist + zoomDelta));
      cam.position.copy(dir.multiplyScalar(newDist));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      if (stageGroupRef.current) {
        stageGroupRef.current.rotation.y += deltaX * 0.008;
      }
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // =========================================================================
    // 9. ANIMATION LOOP
    // =========================================================================
    let animId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Inertial damping after user drag
      if (!isDraggingRef.current && stageGroupRef.current) {
        if (Math.abs(velocityRef.current.x) > 0.0001) {
          stageGroupRef.current.rotation.y += velocityRef.current.x;
          velocityRef.current.x *= 0.92;
        } else if (isRotatingRef.current) {
          stageGroupRef.current.rotation.y += 0.0035;
        }
      }

      // Golden dust particles floating gently
      const posArray = particles.geometry.attributes.position.array;
      for (let i = 1; i < posArray.length; i += 3) {
        posArray[i] += Math.sin(elapsed * 1.5 + i) * 0.0016;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    renderLoop();

    // =========================================================================
    // 10. RESPONSIVE RESIZE
    // =========================================================================
    const handleResize = () => {
      if (!currentMount || !rendererRef.current || !cameraRef.current) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      const newAspect = newW / newH;

      cameraRef.current.aspect = newAspect;
      if (newAspect < 1) {
        cameraRef.current.fov = 34;
        cameraRef.current.position.set(0, 3.6, 5.2);
      } else {
        cameraRef.current.fov = 30;
        cameraRef.current.position.set(0, 3.2, 4.6);
      }
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [activeMode]);

  return (
    <div className="three-clean-stage">
      {/* 3D Canvas Mount - Pure transparent WebGL blending with page background */}
      <div 
        ref={mountRef} 
        className="three-clean-canvas"
        title="Royal Mithai 3D Model — Drag to rotate 360°, Scroll to zoom"
      />

      {/* Floating Controls with High-Res Screenshot Button */}
      <div className="three-minimal-controls">
        <button 
          className={`clean-pill-btn ${isRotating ? 'clean-pill-active' : ''}`}
          onClick={() => setIsRotating(!isRotating)}
          aria-label={isRotating ? "Pause Spin" : "Auto Spin"}
          title={isRotating ? "Pause Spin" : "Auto Spin"}
        >
          <RotateCw size={13} />
          <span>{isRotating ? "Pause" : "Spin"}</span>
        </button>

        <button 
          className="clean-pill-btn"
          onClick={() => handleZoom(-0.45)}
          aria-label="Zoom In"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>

        <button 
          className="clean-pill-btn"
          onClick={() => handleZoom(0.45)}
          aria-label="Zoom Out"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>

        <button 
          className="clean-pill-btn"
          onClick={handleResetView}
          aria-label="Reset View"
          title="Reset View"
        >
          <span>Reset</span>
        </button>

        {/* User requested Screenshot Feature */}
        <button 
          className={`clean-pill-btn ${snapshotSuccess ? 'clean-pill-success' : ''}`}
          onClick={handleTakeScreenshot}
          aria-label="Take High-Res Screenshot"
          title="Download High-Res 3D Screenshot"
        >
          {snapshotSuccess ? <Check size={13} /> : <Camera size={13} />}
          <span>{snapshotSuccess ? "Saved!" : "Snapshot"}</span>
        </button>
      </div>

      {/* Subtle interaction cue */}
      <div className="three-clean-hint">
        <span>Drag 360° · Scroll to Zoom</span>
      </div>
    </div>
  );
}

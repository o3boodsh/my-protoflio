"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createIcons, icons } from "lucide";

// This component reproduces, almost verbatim, all the imperative DOM/animation logic
// that used to live in the page's <script> tag (typewriter, hero robot, cloud companion,
// experience timeline, scroll reveals, counters, mobile menu). It renders nothing itself;
// it just runs once after the page mounts.
export default function ClientEffects() {
  useEffect(() => {
    // Cheap guard against React StrictMode's dev-only double effect invocation:
    // clear any canvases from a previous run before the scenes below (re)create theirs.
    const robotMountGuard = document.getElementById('robot-mount');
    if (robotMountGuard) robotMountGuard.innerHTML = '';
    const cloudMountGuard = document.getElementById('cloud-robot-mount');
    if (cloudMountGuard) cloudMountGuard.innerHTML = '';

        function safeIcons() {
          try { createIcons({ icons }); } catch (err) { console.error('[portfolio] icon rendering failed:', err); }
        }
        safeIcons();

        // ===== Mobile Navbar Toggle =====
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.getElementById('menu-icon');

        menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          const isOpen = navLinks.classList.contains('active');
          menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
          safeIcons();
        });

        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            safeIcons();
          });
        });

        // ===== Typewriter =====
        const ROLES = ["AI Tools Developer", "Frontend Engineer", "Computer Engineering Graduate", "Teaching Assistant"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        const typewriterElement = document.getElementById("typewriter-text");

        function type() {
          const currentWord = ROLES[wordIndex % ROLES.length];
          typewriterElement.textContent = isDeleting
            ? currentWord.substring(0, charIndex--)
            : currentWord.substring(0, charIndex++);
          let delay = isDeleting ? 45 : 90;
          if (!isDeleting && charIndex === currentWord.length + 1) {
            delay = 1400;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            delay = 300;
          }
          setTimeout(type, delay);
        }

        // ===== توهّج يتبع الفأرة داخل كاردات الديسكفري =====
        function initCardGlow() {
          document.querySelectorAll('.discovery-card').forEach(card => {
            const glow = document.createElement('span');
            glow.className = 'card-glow';
            card.appendChild(glow);
            card.addEventListener('pointermove', (e) => {
              const rect = card.getBoundingClientRect();
              card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
              card.style.setProperty('--my', `${e.clientY - rect.top}px`);
            });
          });
        }

        // ===== عدّاد تصاعدي للأرقام =====
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function prepareCounters() {
          document.querySelectorAll('.stat-number').forEach(el => {
            const match = el.textContent.trim().match(/^([\d.]+)(.*)$/);
            if (!match) return;
            el.dataset.target = match[1];
            el.dataset.suffix = match[2];
            if (!prefersReducedMotion) el.textContent = '0' + match[2];
          });
        }

        function animateCounter(el) {
          if (prefersReducedMotion || el.dataset.counted || !el.dataset.target) return;
          el.dataset.counted = 'true';
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const isDecimal = el.dataset.target.includes('.');
          const duration = 1300;
          const startTime = performance.now();
          function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }

        // ===== أنيميشن التمرير للكاردات وعناصر المهارات =====
        function animateElementsOnScroll() {
          // كاردات الديسكفري
          const cards = document.querySelectorAll('.discovery-card');
          const observerCards = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) animateCounter(statNumber);
                observerCards.unobserve(entry.target);
              }
            });
          }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
          cards.forEach(card => observerCards.observe(card));

          // عناصر قسم المهارات (الأعمدة الثلاثة)
          const skillEls = document.querySelectorAll('.skills-col-left, .lang-box, .comp-box');
          const observerSkills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerSkills.unobserve(entry.target);
              }
            });
          }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
          skillEls.forEach(el => observerSkills.observe(el));
        }

        // ===== أنيميشن ظهور كاردات المشاريع عند السكرول =====
        function animateProjectsOnScroll() {
          const cards = document.querySelectorAll('.project-card');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
          cards.forEach(card => observer.observe(card));
        }

        // ===== أنيميشن ظهور قسم Contact عند السكرول =====
        function animateContactOnScroll() {
          const els = document.querySelectorAll('.contact-left, .contact-right');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
          els.forEach(el => observer.observe(el));
        }

        // ===== Three.js Robot Scene =====
        function initRobotScene() {
          const container = document.getElementById('robot-mount');
          if (!container) return;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(32, container.clientWidth / container.clientHeight, 0.1, 100);
          camera.position.set(0, 0.2, 7.8);
          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(container.clientWidth, container.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setClearColor(0x000000, 0);
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          container.appendChild(renderer.domElement);
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.enablePan = false;
          controls.enableZoom = false;
          controls.target.set(0, 0.1, 0);

          const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
          scene.add(ambientLight);
          const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
          mainLight.position.set(3, 5, 5);
          scene.add(mainLight);
          const cornerLightPos = new THREE.Vector3(-3.5, 2.5, 2.5);
          const cornerLight = new THREE.PointLight(0x00f3ff, 3.5, 12);
          cornerLight.position.copy(cornerLightPos);
          scene.add(cornerLight);
          const lightOrb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.8 }));
          lightOrb.position.copy(cornerLightPos);
          scene.add(lightOrb);

          // Particles
          const envParticlesGeo = new THREE.BufferGeometry();
          const envParticleCount = 80;
          const envPosArray = new Float32Array(envParticleCount * 3);
          for (let i = 0; i < envParticleCount * 3; i++) envPosArray[i] = (Math.random() - 0.5) * 10;
          envParticlesGeo.setAttribute('position', new THREE.BufferAttribute(envPosArray, 3));
          const envParticlesMat = new THREE.PointsMaterial({ size: 0.03, color: 0x00f3ff, transparent: true, opacity: 0.5 });
          const envParticles = new THREE.Points(envParticlesGeo, envParticlesMat);
          scene.add(envParticles);

          function createTextPlane(text, color = '#00f3ff', size = 2.4) {
            const canvas = document.createElement('canvas');
            canvas.width = 1024; canvas.height = 256;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = color;
            ctx.font = '900 80px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 243, 255, 0.9)';
            ctx.shadowBlur = 16;
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false, opacity: 0.95 });
            return new THREE.Mesh(new THREE.PlaneGeometry(size, size * 0.32), material);
          }

          const robotGroup = new THREE.Group();
          robotGroup.scale.set(0.65, 0.65, 0.65);
          robotGroup.position.y = -0.1;
          scene.add(robotGroup);
          const textOrbitGroup = new THREE.Group();
          robotGroup.add(textOrbitGroup);
          const textMeshes = [];
          const texts = [
            { text: 'Frontend', pos: [0, 1.6, -2.2], rot: [0, 0, 0] },
            { text: 'Backend', pos: [0, 1.6, 2.2], rot: [0, Math.PI, 0] },
            { text: 'AI Dev', pos: [-2.2, 1.6, 0], rot: [0, Math.PI / 2, 0] },
            { text: 'Data Analysis', pos: [2.2, 1.6, 0], rot: [0, -Math.PI / 2, 0] }
          ];
          texts.forEach(({ text, pos, rot }) => {
            const mesh = createTextPlane(text, '#00f3ff', 2.5);
            mesh.position.set(pos[0], pos[1], pos[2]);
            mesh.rotation.set(rot[0], rot[1], rot[2]);
            mesh.userData = { initialY: pos[1] };
            textOrbitGroup.add(mesh);
            textMeshes.push(mesh);
          });

          function createRoundedBox(w, h, d, r, bevel) {
            const shape = new THREE.Shape();
            const x = -w / 2, y = -h / 2;
            shape.moveTo(x + r, y);
            shape.lineTo(x + w - r, y);
            shape.quadraticCurveTo(x + w, y, x + w, y + r);
            shape.lineTo(x + w, y + h - r);
            shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            shape.lineTo(x + r, y + h);
            shape.quadraticCurveTo(x, y + h, x, y + h - r);
            shape.lineTo(x, y + r);
            shape.quadraticCurveTo(x, y, x + r, y);
            const geo = new THREE.ExtrudeGeometry(shape, { depth: d - bevel * 2, bevelEnabled: bevel > 0, bevelSegments: 4, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 10 });
            geo.center();
            return geo;
          }

          const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.6, roughness: 0.2 });
          const jointsMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
          const visorMaterial = new THREE.MeshStandardMaterial({ color: 0x020813, metalness: 0.9, roughness: 0.1 });
          const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
          const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

          const ufoGroup = new THREE.Group();
          ufoGroup.position.y = -1.0;
          const ufoTopDome = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.85, 0.2, 40), bodyMaterial);
          ufoGroup.add(ufoTopDome);
          const ufoBottomDome = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 0.9, 0.25, 40), jointsMaterial);
          ufoBottomDome.position.y = -0.22;
          ufoGroup.add(ufoBottomDome);
          const ringGroup = new THREE.Group();
          ufoGroup.add(ringGroup);
          const outerRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.02, 16, 80), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.9 }));
          outerRing1.rotation.x = Math.PI / 2;
          ringGroup.add(outerRing1);
          const outerRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.32, 0.015, 16, 80), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.7 }));
          outerRing2.rotation.x = Math.PI / 2 + 0.06;
          ringGroup.add(outerRing2);
          const coreEngineGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.1, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
          coreEngineGlow.position.y = -0.36;
          ufoGroup.add(coreEngineGlow);

          // Smoke
          const smokeCount = 130;
          const smokeGeo = new THREE.BufferGeometry();
          const smokePositions = new Float32Array(smokeCount * 3);
          const smokeData = [];
          for (let i = 0; i < smokeCount; i++) {
            const radius = Math.random() * 0.55;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = -0.4 - Math.random() * 1.8;
            smokePositions[i * 3] = x;
            smokePositions[i * 3 + 1] = y;
            smokePositions[i * 3 + 2] = z;
            smokeData.push({ x, y, z, speedY: 0.012 + Math.random() * 0.018, baseRadius: radius, angle, spreadRate: 0.25 + Math.random() * 0.3, life: Math.random() });
          }
          smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));

          function createSmokeTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            grad.addColorStop(0.25, 'rgba(0, 243, 255, 0.5)');
            grad.addColorStop(0.65, 'rgba(0, 200, 255, 0.15)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
          }
          const smokeMat = new THREE.PointsMaterial({ size: 0.42, map: createSmokeTexture(), transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false });
          const smokeParticles = new THREE.Points(smokeGeo, smokeMat);
          ufoGroup.add(smokeParticles);
          const cloudLight = new THREE.PointLight(0x00f3ff, 4.0, 5);
          cloudLight.position.set(0, -0.6, 0);
          ufoGroup.add(cloudLight);
          robotGroup.add(ufoGroup);

          const torso = new THREE.Mesh(createRoundedBox(1.0, 0.65, 0.62, 0.12, 0.04), bodyMaterial);
          torso.position.set(0, -0.05, 0);
          robotGroup.add(torso);
          const reactorCore = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 20), cyanGlowMat);
          reactorCore.position.set(0, 0.05, 0.33);
          robotGroup.add(reactorCore);
          const neckGroup = new THREE.Group();
          neckGroup.position.set(0, 0.38, 0);
          const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.20, 0.30, 24), jointsMaterial);
          const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.025, 16, 32), cyanGlowMat);
          neckRing.rotation.x = Math.PI / 2;
          neckGroup.add(neckMesh, neckRing);
          robotGroup.add(neckGroup);

          const headGroup = new THREE.Group();
          headGroup.position.set(0, 1.10, 0);
          robotGroup.add(headGroup);
          const headBox = new THREE.Mesh(createRoundedBox(1.6, 1.05, 0.9, 0.2, 0.05), bodyMaterial);
          headGroup.add(headBox);
          const visor = new THREE.Mesh(createRoundedBox(1.38, 0.84, 0.05, 0.15, 0.02), visorMaterial);
          visor.position.set(0, 0, 0.46);
          headGroup.add(visor);
          const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), eyeMat);
          const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), eyeMat);
          leftEye.position.set(-0.33, 0.02, 0.50);
          rightEye.position.set(0.33, 0.02, 0.50);
          headGroup.add(leftEye, rightEye);

          function createLeg(x) {
            const leg = new THREE.Group();
            leg.position.set(x, -0.38, 0);
            const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.28, 16), jointsMaterial);
            upper.position.y = -0.12;
            const joint = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), jointsMaterial);
            joint.position.y = -0.26;
            const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 16), jointsMaterial);
            lower.position.y = -0.4;
            const foot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.07, 0.26), bodyMaterial);
            foot.position.set(0, -0.54, 0.04);
            leg.add(upper, joint, lower, foot);
            return leg;
          }
          robotGroup.add(createLeg(-0.32));
          robotGroup.add(createLeg(0.32));

          function createArm(isLeft) {
            const armGroup = new THREE.Group();
            const side = isLeft ? -1 : 1;
            armGroup.position.set(side * 0.62, 0.12, 0);
            const shoulderConnector = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.16, 16), jointsMaterial);
            shoulderConnector.rotation.z = Math.PI / 2;
            shoulderConnector.position.set(-side * 0.08, 0, 0);
            armGroup.add(shoulderConnector);
            const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), jointsMaterial);
            armGroup.add(shoulder);
            const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.048, 0.28, 16), bodyMaterial);
            upperArm.position.y = -0.14;
            armGroup.add(upperArm);
            const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), jointsMaterial);
            elbow.position.y = -0.28;
            armGroup.add(elbow);
            const lowerArmGroup = new THREE.Group();
            lowerArmGroup.position.y = -0.28;
            const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.04, 0.24, 16), bodyMaterial);
            lowerArm.position.y = -0.12;
            const hand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), jointsMaterial);
            hand.position.y = -0.25;
            lowerArmGroup.add(lowerArm, hand);
            armGroup.add(lowerArmGroup);
            const targetZ = side * 0.55;
            armGroup.rotation.z = targetZ;
            armGroup.rotation.x = 0.08;
            lowerArmGroup.rotation.z = -side * 0.15;
            return { armGroup, lowerArmGroup, defaultZ: targetZ };
          }
          const leftArmObj = createArm(true);
          const rightArmObj = createArm(false);
          robotGroup.add(leftArmObj.armGroup);
          robotGroup.add(rightArmObj.armGroup);

          const clickCollider = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), new THREE.MeshBasicMaterial({ visible: false }));
          clickCollider.position.set(0, 0.3, 0);
          robotGroup.add(clickCollider);
          const raycaster = new THREE.Raycaster();
          const pointerNdc = new THREE.Vector2();
          let greetTimer = 0;
          const GREET_DURATION = 1.8;
          let pointerDownPos = null;
          renderer.domElement.addEventListener('pointerdown', (e) => { pointerDownPos = { x: e.clientX, y: e.clientY }; });
          renderer.domElement.addEventListener('pointerup', (e) => {
            if (!pointerDownPos) return;
            const movedDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
            pointerDownPos = null;
            if (movedDist > 6) return;
            const rect = renderer.domElement.getBoundingClientRect();
            pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(pointerNdc, camera);
            const hits = raycaster.intersectObject(clickCollider, false);
            if (hits.length > 0) greetTimer = GREET_DURATION;
          });

          const mouse = { x: 0, y: 0 };
          const headWorldPos = new THREE.Vector3();
          const dummyObject = new THREE.Object3D();
          const cameraRight = new THREE.Vector3();
          document.addEventListener('pointermove', (e) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; }, { passive: true });
          window.addEventListener('resize', () => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); });

          const clock = new THREE.Clock();
          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            const dt = Math.min(clock.getDelta(), 0.05);
            const elapsedTime = clock.getElapsedTime();
            envParticles.rotation.y = elapsedTime * 0.02;
            ringGroup.rotation.y = elapsedTime * 0.7;
            textOrbitGroup.rotation.y = elapsedTime * 0.25;

            const posArr = smokeParticles.geometry.attributes.position.array;
            for (let i = 0; i < smokeCount; i++) {
              const p = smokeData[i];
              p.y -= p.speedY; p.life += 0.012;
              const currRadius = p.baseRadius + (p.life * p.spreadRate);
              p.x = Math.cos(p.angle + elapsedTime * 0.8) * currRadius;
              p.z = Math.sin(p.angle + elapsedTime * 0.8) * currRadius;
              if (p.y < -2.4 || p.life >= 1.0) {
                p.life = 0; p.baseRadius = Math.random() * 0.45; p.angle = Math.random() * Math.PI * 2;
                p.x = Math.cos(p.angle) * p.baseRadius; p.z = Math.sin(p.angle) * p.baseRadius; p.y = -0.38;
              }
              posArr[i * 3] = p.x; posArr[i * 3 + 1] = p.y; posArr[i * 3 + 2] = p.z;
            }
            smokeParticles.geometry.attributes.position.needsUpdate = true;
            cloudLight.intensity = 4.0 + Math.sin(elapsedTime * 3) * 0.8;
            textMeshes.forEach((mesh, index) => { mesh.position.y = mesh.userData.initialY + Math.sin(elapsedTime * 2 + index) * 0.06; });

            headGroup.getWorldPosition(headWorldPos);
            dummyObject.up.copy(camera.up);
            dummyObject.position.copy(headWorldPos);
            dummyObject.lookAt(camera.position);
            dummyObject.rotateOnWorldAxis(camera.up, mouse.x * 0.5);
            cameraRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
            dummyObject.rotateOnWorldAxis(cameraRight, -mouse.y * 0.35);
            headGroup.quaternion.slerp(dummyObject.quaternion, 0.08);
            robotGroup.position.y = -0.1 + Math.sin(elapsedTime * 1.8) * 0.05;

            if (greetTimer > 0) {
              greetTimer -= dt;
              const t = 1 - Math.max(greetTimer, 0) / GREET_DURATION;
              const rise = Math.sin(Math.min(Math.max(t, 0), 1) * Math.PI);
              const wave = Math.sin(elapsedTime * 12) * 0.2 * rise;
              rightArmObj.armGroup.rotation.z = rightArmObj.defaultZ + (0.4 * rise) + wave;
              rightArmObj.armGroup.rotation.x = 0.08 - (0.3 * rise);
              if (greetTimer <= 0) { rightArmObj.armGroup.rotation.z = rightArmObj.defaultZ; rightArmObj.armGroup.rotation.x = 0.08; }
            }
            renderer.render(scene, camera);
          }
          animate();
        }

        // ===== Three.js: الغيمة التقنية المرافقة لقسم Experience =====
        function initCloudCompanion() {
          const container = document.getElementById('cloud-robot-mount');
          if (!container || typeof THREE === 'undefined') return;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(32, container.clientWidth / container.clientHeight, 0.1, 100);
          camera.position.set(0, 0.1, 7.6);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(container.clientWidth, container.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setClearColor(0x000000, 0);
          container.appendChild(renderer.domElement);

          scene.add(new THREE.AmbientLight(0xffffff, 0.72));
          const key = new THREE.DirectionalLight(0xffffff, 0.95);
          key.position.set(3, 4, 5);
          scene.add(key);
          const fill = new THREE.DirectionalLight(0x7fb8ff, 0.32);
          fill.position.set(-3, -1.5, 2.5);
          scene.add(fill);
          const cyanGlow = new THREE.PointLight(0x00f3ff, 2.4, 10);
          cyanGlow.position.set(-2, 1.4, 3);
          scene.add(cyanGlow);

          const cloudMat = new THREE.MeshStandardMaterial({ color: 0xeef4ff, metalness: 0.02, roughness: 0.38, emissive: 0x0a2a3a, emissiveIntensity: 0.15 });
          const sparkMat = new THREE.MeshBasicMaterial({ color: 0x9ff5ff, transparent: true, opacity: 0.85 });

          // وجه روبوتي على شاشة داكنة بعيون متوهجة (يتماشى مع هوية الموقع)
          function createFaceTexture(eyesOpen) {
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 512;
            const ctx = canvas.getContext('2d');
            const cx = 256, cy = 256;

            const bg = ctx.createRadialGradient(cx, cy - 30, 30, cx, cy, 252);
            bg.addColorStop(0, '#10303f');
            bg.addColorStop(0.7, '#081822');
            bg.addColorStop(1, '#040f18');
            ctx.fillStyle = bg;
            ctx.beginPath();
            ctx.arc(cx, cy, 252, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(cx, cy, 234, 0, Math.PI * 2);
            ctx.stroke();

            // ظل الغورف حوالين الشاشة: يذوّب حافتها بجسم الغيمة بدل قصّها
            const vig = ctx.createRadialGradient(cx, cy, 196, cx, cy, 252);
            vig.addColorStop(0, 'rgba(4, 12, 18, 0)');
            vig.addColorStop(0.72, 'rgba(4, 12, 18, 0.5)');
            vig.addColorStop(1, 'rgba(3, 9, 14, 0.95)');
            ctx.fillStyle = vig;
            ctx.beginPath();
            ctx.arc(cx, cy, 252, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowColor = 'rgba(0, 243, 255, 0.9)';
            ctx.shadowBlur = 28;
            ctx.fillStyle = '#aef6ff';
            ctx.strokeStyle = '#aef6ff';
            ctx.lineWidth = 14;
            ctx.lineCap = 'round';
            [-80, 80].forEach(dx => {
              ctx.beginPath();
              if (eyesOpen) {
                ctx.ellipse(cx + dx, cy - 30, 25, 33, 0, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.arc(cx + dx, cy - 18, 24, Math.PI, Math.PI * 2);
                ctx.stroke();
              }
            });

            if (eyesOpen) {
              ctx.shadowBlur = 0;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
              [-80, 80].forEach(dx => {
                ctx.beginPath();
                ctx.arc(cx + dx - 8, cy - 42, 8, 0, Math.PI * 2);
                ctx.fill();
              });
            }

            ctx.strokeStyle = '#aef6ff';
            ctx.lineWidth = 13;
            ctx.lineCap = 'round';
            ctx.shadowColor = 'rgba(0, 243, 255, 0.9)';
            ctx.shadowBlur = 22;
            ctx.beginPath();
            ctx.arc(cx, cy + 26, 56, Math.PI * 0.18, Math.PI * 0.82, false);
            ctx.stroke();

            ctx.shadowBlur = 18;
            ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
            [-132, 132].forEach(dx => {
              ctx.beginPath();
              ctx.ellipse(cx + dx, cy + 24, 26, 15, 0, 0, Math.PI * 2);
              ctx.fill();
            });

            return new THREE.CanvasTexture(canvas);
          }

          const cloudGroup = new THREE.Group();
          cloudGroup.scale.set(1.05, 1.05, 1.05);
          scene.add(cloudGroup);

          // جسم الغيمة: سيلويت كلاسيكي بقاعدة مستوية وفقعات ناعمة عالية الدقة
          const puffs = [
            { r: 0.8, x: 0, y: -0.22, z: 0, sy: 0.8 },
            { r: 0.56, x: -0.68, y: -0.06, z: -0.04, sy: 0.88 },
            { r: 0.6, x: 0.66, y: -0.04, z: -0.04, sy: 0.88 },
            { r: 0.44, x: -1.12, y: 0.18, z: -0.02, sy: 0.94 },
            { r: 0.46, x: 1.12, y: 0.2, z: -0.02, sy: 0.94 },
            { r: 0.5, x: -0.36, y: 0.36, z: 0.12 },
            { r: 0.55, x: 0.36, y: 0.38, z: 0.12 },
            { r: 0.44, x: 0, y: 0.6, z: 0 },
            { r: 0.34, x: -0.82, y: 0.44, z: -0.18 },
            { r: 0.36, x: 0.85, y: 0.46, z: -0.18 }
          ];
          const puffMeshes = [];
          puffs.forEach((p, i) => {
            const puff = new THREE.Mesh(new THREE.SphereGeometry(p.r, 48, 48), cloudMat);
            puff.position.set(p.x, p.y, p.z);
            puff.userData = { baseY: p.sy || 1, phase: i * 0.7 };
            if (p.sy) puff.scale.y = p.sy;
            cloudGroup.add(puff);
            puffMeshes.push(puff);
          });

          // الوجه: شاشة منحنية تلتف على بطن الغيمة فتبدو جزءاً من جسمها لا قطعاً ملصوقاً
          const faceGroup = new THREE.Group();
          faceGroup.position.set(0, 0.04, 0.86);
          cloudGroup.add(faceGroup);
          const faceGeo = new THREE.PlaneGeometry(1.04, 1.04, 32, 32);
          const fpos = faceGeo.attributes.position;
          const bendR = 1.4;
          for (let i = 0; i < fpos.count; i++) {
            const fx = fpos.getX(i);
            const a = fx / bendR;
            fpos.setX(i, Math.sin(a) * bendR);
            fpos.setZ(i, (Math.cos(a) - 1) * bendR);
          }
          faceGeo.computeVertexNormals();
          const face = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: createFaceTexture(true), transparent: true }));
          faceGroup.add(face);
          const faceOpenTex = face.material.map;
          const faceClosedTex = createFaceTexture(false);

          // إشعاع الشاشة: ضوء سماوي يلوّن الفقعات المحيطة فيبدو الوجه نابضاً داخل الجسم
          const screenLight = new THREE.PointLight(0x27e6ff, 1.1, 2.4);
          screenLight.position.set(0, 0.02, 1.25);
          cloudGroup.add(screenLight);

          // هوائي صغير بنبض سماوي (لمسة AI تقنية)
          const antenna = new THREE.Group();
          antenna.position.set(0, 1.0, 0.02);
          const stemMat = new THREE.MeshStandardMaterial({ color: 0x2a3b4d, metalness: 0.6, roughness: 0.35 });
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.3, 12), stemMat);
          stem.position.y = 0.15;
          antenna.add(stem);
          const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 20), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.95 }));
          antennaTip.position.y = 0.34;
          antenna.add(antennaTip);
          cloudGroup.add(antenna);

          // توهج أرضي ناعم بلا حواف يوحي بالتحليق ويدمج الغيمة بالصفحة
          function createGlowTexture() {
            const c = document.createElement('canvas');
            c.width = 256; c.height = 256;
            const x = c.getContext('2d');
            const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
            g.addColorStop(0, 'rgba(0, 243, 255, 0.5)');
            g.addColorStop(0.45, 'rgba(0, 243, 255, 0.16)');
            g.addColorStop(1, 'rgba(0, 243, 255, 0)');
            x.fillStyle = g;
            x.fillRect(0, 0, 256, 256);
            return new THREE.CanvasTexture(c);
          }
          const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: createGlowTexture(), transparent: true, opacity: 0.42, depthWrite: false }));
          glowSprite.scale.set(2.7, 2.7, 1);
          glowSprite.position.set(0, -0.9, -0.6);
          scene.add(glowSprite);

          // جزيئات سماوية صغيرة تدور حول الغيمة ببطء
          const sparks = [];
          const sparkCount = 7;
          for (let i = 0; i < sparkCount; i++) {
            const spark = new THREE.Mesh(new THREE.SphereGeometry(0.018 + Math.random() * 0.016, 10, 10), sparkMat.clone());
            const angle = (i / sparkCount) * Math.PI * 2;
            const radius = 1.55 + Math.random() * 0.3;
            spark.userData = { angle, radius, speed: 0.12 + Math.random() * 0.18, yOff: (Math.random() - 0.5) * 1.1, twinkle: Math.random() * Math.PI * 2 };
            cloudGroup.add(spark);
            sparks.push(spark);
          }

          // بخار ناعم يتصاعد من أعلى الغيمة (سبرايتات ضبابية تتمدد وتتلاشى)
          function createSteamTexture() {
            const c = document.createElement('canvas');
            c.width = 128; c.height = 128;
            const x = c.getContext('2d');
            const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
            g.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            g.addColorStop(0.4, 'rgba(228, 246, 255, 0.42)');
            g.addColorStop(1, 'rgba(228, 246, 255, 0)');
            x.fillStyle = g;
            x.fillRect(0, 0, 128, 128);
            return new THREE.CanvasTexture(c);
          }
          const steamTex = createSteamTexture();
          const steams = [];
          const steamCount = 12;
          for (let i = 0; i < steamCount; i++) {
            const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: steamTex, transparent: true, opacity: 0, depthWrite: false }));
            s.userData = {
              t: Math.random() * 4,
              dur: 2.8 + Math.random() * 1.7,
              x0: (Math.random() - 0.5) * 1.3,
              z0: (Math.random() - 0.5) * 0.35,
              drift: (Math.random() - 0.5) * 0.55,
              wobble: Math.random() * Math.PI * 2,
              scale0: 0.22 + Math.random() * 0.2
            };
            cloudGroup.add(s);
            steams.push(s);
          }

          window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
          });

          const clock = new THREE.Clock();
          let blinkTimer = 2.4 + Math.random() * 2;
          let blinkHold = 0;
          function animate() {
            requestAnimationFrame(animate);
            const delta = Math.min(clock.getDelta(), 0.05);
            const elapsed = clock.elapsedTime;

            // طفو وميلان هادئ (بدون تتبع المؤشر)
            cloudGroup.position.y = Math.sin(elapsed * 1.3) * 0.1;
            cloudGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.03;
            cloudGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.07;

            // تنفّس الفقعات: انتفاخ متتابع خفيف يحيي الغيمة
            puffMeshes.forEach(m => {
              const b = Math.sin(elapsed * 1.5 + m.userData.phase) * 0.028;
              m.scale.x = m.scale.z = 1 + b;
              m.scale.y = m.userData.baseY * (1 - b * 0.8);
            });

            // رمشة عين عشوائية
            blinkTimer -= delta;
            if (blinkHold > 0) {
              blinkHold -= delta;
              if (blinkHold <= 0) {
                face.material.map = faceOpenTex;
                blinkTimer = 2.2 + Math.random() * 2.6;
              }
            } else if (blinkTimer <= 0) {
              face.material.map = faceClosedTex;
              blinkHold = 0.13;
            }

            // دورة حياة البخار: يولد أعلى الغيمة، يصعد ويتمدد ويختفي
            steams.forEach(s => {
              const d = s.userData;
              d.t += delta;
              const p = d.t / d.dur;
              if (p >= 1) {
                d.t = 0;
                d.dur = 2.8 + Math.random() * 1.7;
                d.x0 = (Math.random() - 0.5) * 1.3;
                d.z0 = (Math.random() - 0.5) * 0.35;
                d.drift = (Math.random() - 0.5) * 0.55;
                d.wobble = Math.random() * Math.PI * 2;
                d.scale0 = 0.22 + Math.random() * 0.2;
                return;
              }
              const ease = 1 - Math.pow(1 - p, 2);
              s.position.set(
                d.x0 + d.drift * ease + Math.sin(elapsed * 1.4 + d.wobble) * 0.07,
                0.9 + ease * 0.72,
                d.z0
              );
              const sc = d.scale0 * (1 + ease * 1.7);
              s.scale.set(sc, sc, 1);
              s.material.opacity = 0.48 * Math.sin(Math.PI * p);
            });

            cyanGlow.intensity = 2.4 + Math.sin(elapsed * 2.2) * 0.5;
            glowSprite.material.opacity = 0.36 + Math.sin(elapsed * 1.6) * 0.1;
            antennaTip.scale.setScalar(1 + Math.sin(elapsed * 2.4) * 0.2);
            screenLight.intensity = 1.05 + Math.sin(elapsed * 1.8) * 0.25;

            sparks.forEach(s => {
              const d = s.userData;
              const a = d.angle + elapsed * d.speed;
              s.position.set(Math.cos(a) * d.radius, d.yOff + Math.sin(elapsed * 1.2 + d.twinkle) * 0.12, Math.sin(a) * d.radius * 0.5);
              s.material.opacity = 0.4 + Math.sin(elapsed * 3 + d.twinkle) * 0.4;
            });

            renderer.render(scene, camera);
          }
          animate();
        }

        // ===== التحكّم بالخط الزمني المتعرّج: كشف الصف النشط + توجيه الرفيق + الواترمارك =====
        function initExperienceTimeline() {
          const rows = Array.from(document.querySelectorAll('.timeline-row'));
          const companion = document.getElementById('experience-companion');
          const watermark = document.getElementById('companion-watermark');
          if (!rows.length) return;

          // ظهور تدريجي للصفوف عند الوصول لها بالسكرول
          const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
          rows.forEach(row => revealObserver.observe(row));

          if (!companion || !watermark) return;

          function setActiveRow(row) {
            rows.forEach(r => {
              const dot = r.querySelector('.timeline-dot');
              if (dot) dot.classList.remove('active');
            });
            const activeDot = row.querySelector('.timeline-dot');
            if (activeDot) activeDot.classList.add('active');

            const tech = (row.dataset.tech || 'Code').toUpperCase();
            if (watermark.textContent !== tech) {
              watermark.style.opacity = 0;
              setTimeout(() => {
                watermark.textContent = tech;
                watermark.style.opacity = 1;
              }, 220);
            }
          }

          const activeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) setActiveRow(entry.target);
            });
          }, { threshold: 0, rootMargin: '-42% 0px -42% 0px' });
          rows.forEach(row => activeObserver.observe(row));

          setActiveRow(rows[0]);
        }

        // ===== التشغيل بعد ما الصفحة تركب (useEffect أصلاً بيضمن الـ DOM جاهز،
        // فما في داعي لـ DOMContentLoaded هون — هاد كان بگ حقيقي خلّى كل شي تحت
        // ما يشتغل أبدًا لأن الحدث هاد بيكون خلص من زمان قبل ما الكومبوننت يركب) =====
        // كل استدعاء ملفوف بـ try/catch حتى لو فشل واحد (متل مشهد الروبوت ثلاثي الأبعاد
        // يلي بيعتمد على مكتبة خارجية) الباقي يضل شغال وما يوقف الصفحة كلها.
        function safeRun(fn, label) {
          try {
            fn();
          } catch (err) {
            console.error('[portfolio] "' + label + '" failed, continuing without it:', err);
          }
        }

        safeRun(type, 'typewriter');
        safeRun(initRobotScene, 'hero robot scene');
        safeRun(initCloudCompanion, 'cloud companion scene');
        safeRun(initExperienceTimeline, 'experience timeline');
        safeRun(initCardGlow, 'card glow effect');
        safeRun(prepareCounters, 'stat counters setup');
        safeRun(animateElementsOnScroll, 'discovery/skills scroll reveal');
        safeRun(animateProjectsOnScroll, 'projects scroll reveal');
        safeRun(animateContactOnScroll, 'contact scroll reveal');
        safeRun(() => createIcons({ icons }), 'icon rendering');
        const onResize = () => safeRun(() => createIcons({ icons }), 'icon rendering on resize');
        window.addEventListener('resize', onResize);

  }, []);

  return null;
}

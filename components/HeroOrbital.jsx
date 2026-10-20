"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOrbital() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // The CSS orbit remains visible when WebGL is unavailable.
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 6.2;
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.className = "hero-orbital-canvas";
    mount.appendChild(renderer.domElement);

    const assembly = new THREE.Group();
    scene.add(assembly);

    // A procedural halo keeps the center luminous without an image asset.
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const glowContext = glowCanvas.getContext("2d");
    const glowGradient = glowContext.createRadialGradient(64, 64, 4, 64, 64, 64);
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.75)");
    glowGradient.addColorStop(0.23, "rgba(255, 255, 255, 0.32)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    glowContext.fillStyle = glowGradient;
    glowContext.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const innerGlowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0x55dcff,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const outerGlowMaterial = innerGlowMaterial.clone();
    outerGlowMaterial.opacity = 0.22;
    const innerGlow = new THREE.Sprite(innerGlowMaterial);
    innerGlow.scale.set(3.8, 3.8, 1);
    innerGlow.position.z = -0.4;
    const outerGlow = new THREE.Sprite(outerGlowMaterial);
    outerGlow.scale.set(5.2, 5.2, 1);
    outerGlow.position.z = -0.55;
    assembly.add(outerGlow, innerGlow);

    const coreGeometry = new THREE.IcosahedronGeometry(1.06, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x16445c,
      metalness: 0.55,
      roughness: 0.27,
      flatShading: true,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25,
      emissive: 0x073347,
      emissiveIntensity: 0.34,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    assembly.add(core);

    const cageSourceGeometry = new THREE.IcosahedronGeometry(1.145, 1);
    const cageGeometry = new THREE.EdgesGeometry(cageSourceGeometry);
    const cageMaterial = new THREE.LineBasicMaterial({ color: 0x8be9ff, transparent: true, opacity: 0.36 });
    const cage = new THREE.LineSegments(cageGeometry, cageMaterial);
    assembly.add(cage);

    // A small, dimensional </> mark gives the core a clear programming identity.
    const codeMark = new THREE.Group();
    codeMark.position.z = 1.25;
    assembly.add(codeMark);
    const codeStrokeGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
    const codeStrokeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd2f9ff,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const codeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38d9f5,
      transparent: true,
      opacity: 0.13,
      depthTest: false,
      depthWrite: false,
    });
    const strokeAxis = new THREE.Vector3(0, 1, 0);

    function addCodeStroke(from, to) {
      const start = new THREE.Vector3(...from);
      const end = new THREE.Vector3(...to);
      const direction = end.clone().sub(start);
      const center = start.clone().add(end).multiplyScalar(0.5);
      const rotation = new THREE.Quaternion().setFromUnitVectors(strokeAxis, direction.clone().normalize());
      const glow = new THREE.Mesh(codeStrokeGeometry, codeGlowMaterial);
      glow.position.copy(center);
      glow.quaternion.copy(rotation);
      glow.scale.set(0.075, direction.length(), 0.075);
      glow.renderOrder = 9;
      const stroke = new THREE.Mesh(codeStrokeGeometry, codeStrokeMaterial);
      stroke.position.copy(center);
      stroke.quaternion.copy(rotation);
      stroke.scale.set(0.029, direction.length(), 0.029);
      stroke.renderOrder = 10;
      codeMark.add(glow, stroke);
    }

    addCodeStroke([-0.32, 0.28, 0], [-0.57, 0, 0]);
    addCodeStroke([-0.57, 0, 0], [-0.32, -0.28, 0]);
    addCodeStroke([-0.08, -0.32, 0], [0.15, 0.32, 0]);
    addCodeStroke([0.32, 0.28, 0], [0.57, 0, 0]);
    addCodeStroke([0.57, 0, 0], [0.32, -0.28, 0]);

    const ringGeometry = new THREE.TorusGeometry(1.57, 0.014, 8, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x53d6ee, transparent: true, opacity: 0.78 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.13, 0.15, -0.24);
    assembly.add(ring);

    const farRingGeometry = new THREE.TorusGeometry(1.78, 0.013, 8, 128);
    const farRingMaterial = new THREE.MeshBasicMaterial({ color: 0x7e9eff, transparent: true, opacity: 0.66 });
    const farRing = new THREE.Mesh(farRingGeometry, farRingMaterial);
    farRing.rotation.set(0.43, 1.05, 0.38);
    assembly.add(farRing);

    const signalGeometry = new THREE.SphereGeometry(0.038, 10, 10);
    const haloGeometry = new THREE.SphereGeometry(0.105, 10, 10);
    const cyanSignalMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f8ff });
    const blueSignalMaterial = new THREE.MeshBasicMaterial({ color: 0xa9bdff });
    const cyanHaloMaterial = new THREE.MeshBasicMaterial({ color: 0x39d9f5, transparent: true, opacity: 0.16, depthWrite: false });
    const blueHaloMaterial = new THREE.MeshBasicMaterial({ color: 0x7599ff, transparent: true, opacity: 0.16, depthWrite: false });
    const cyanTrailGeometry = new THREE.TorusGeometry(1.57, 0.006, 4, 16, 0.18);
    const blueTrailGeometry = new THREE.TorusGeometry(1.78, 0.006, 4, 16, 0.18);
    const cyanTrailMaterial = new THREE.MeshBasicMaterial({ color: 0x75e9fb, transparent: true, opacity: 0.42, depthWrite: false });
    const blueTrailMaterial = new THREE.MeshBasicMaterial({ color: 0xa6baff, transparent: true, opacity: 0.38, depthWrite: false });
    const signals = [];

    function addSignals(track, radius, names, speed, material, haloMaterial, trailGeometry, trailMaterial) {
      names.forEach((name, index) => {
        const signal = new THREE.Group();
        const point = new THREE.Mesh(signalGeometry, material);
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        const trail = new THREE.Mesh(trailGeometry, trailMaterial);
        signal.add(halo, point);
        track.add(signal);
        track.add(trail);
        const label = document.createElement("span");
        label.className = `hero-orbit-signal${radius > 1.7 ? " hero-orbit-signal--blue" : ""}`;
        label.textContent = name;
        label.setAttribute("aria-hidden", "true");
        mount.appendChild(label);
        signals.push({ signal, trail, label, labelWidth: 0, labelHeight: 0, radius, angle: (index / names.length) * Math.PI * 2 + (radius > 1.7 ? 0.65 : -0.3), speed });
      });
    }

    addSignals(ring, 1.57, ["React", "Next.js"], 0.34, cyanSignalMaterial, cyanHaloMaterial, cyanTrailGeometry, cyanTrailMaterial);
    addSignals(farRing, 1.78, ["Python", "AI / RAG"], -0.26, blueSignalMaterial, blueHaloMaterial, blueTrailGeometry, blueTrailMaterial);

    function positionSignals() {
      for (const { signal, trail, radius, angle, speed } of signals) {
        const position = angle + elapsed * speed;
        signal.position.set(Math.cos(position) * radius, Math.sin(position) * radius, 0);
        trail.rotation.z = position - (speed > 0 ? 0.18 : 0);
      }
    }

    const worldPoint = new THREE.Vector3();
    const projectedPoint = new THREE.Vector3();
    const rayToSignal = new THREE.Vector3();
    const closestPoint = new THREE.Vector3();
    function positionLabels() {
      scene.updateMatrixWorld(true);
      for (const { signal, label, labelWidth, labelHeight } of signals) {
        signal.getWorldPosition(worldPoint);
        projectedPoint.copy(worldPoint).project(camera);
        const inset = viewportWidth < 560 ? 16 : 8;
        const x = THREE.MathUtils.clamp((projectedPoint.x * 0.5 + 0.5) * viewportWidth, labelWidth / 2 + inset, viewportWidth - labelWidth / 2 - inset);
        const y = THREE.MathUtils.clamp((-projectedPoint.y * 0.5 + 0.5) * viewportHeight, labelHeight / 2 + inset, viewportHeight - labelHeight / 2 - inset);
        label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

        // DOM labels do not participate in WebGL depth testing. Fade one only
        // when the line from the camera to its orbit point passes behind the core.
        rayToSignal.copy(worldPoint).sub(camera.position);
        const closestT = THREE.MathUtils.clamp(-camera.position.dot(rayToSignal) / rayToSignal.lengthSq(), 0, 1);
        const behindCore = closestT < 1;
        const distanceFromCore = closestPoint.copy(camera.position).addScaledVector(rayToSignal, closestT).length();
        const visibility = behindCore ? THREE.MathUtils.smoothstep(distanceFromCore, 1.12, 1.34) : 1;
        label.style.opacity = projectedPoint.z > 1 ? "0" : String(visibility);
      }
    }

    scene.add(new THREE.AmbientLight(0x9dbad3, 0.85));
    const keyLight = new THREE.DirectionalLight(0xf4fbff, 2.2);
    keyLight.position.set(-2, 3, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x38d9f5, 5, 10);
    cyanLight.position.set(2.6, -1.3, 2.8);
    scene.add(cyanLight);
    const blueLight = new THREE.PointLight(0x397cff, 2.4, 9);
    blueLight.position.set(-2.5, -2, -0.5);
    scene.add(blueLight);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let disposed = false;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let viewportWidth = 1;
    let viewportHeight = 1;

    function render() {
      positionLabels();
      renderer.render(scene, camera);
    }

    function resize() {
      const width = Math.max(1, Math.round(mount.clientWidth));
      const height = Math.max(1, Math.round(mount.clientHeight));
      viewportWidth = width;
      viewportHeight = height;
      camera.aspect = width / height;
      camera.position.z = width < 360 ? 7.2 : width < 560 ? 6.5 : 6.2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 560 ? 1.25 : 1.7));
      renderer.setSize(width, height, false);
      signals.forEach((signal) => {
        signal.labelWidth = signal.label.offsetWidth;
        signal.labelHeight = signal.label.offsetHeight;
      });
      render();
    }

    function applyTheme() {
      const light = document.documentElement.dataset.theme === "light";
      coreMaterial.color.setHex(light ? 0x7fa9c1 : 0x16445c);
      coreMaterial.emissive.setHex(light ? 0x185074 : 0x073347);
      innerGlowMaterial.color.setHex(light ? 0x2a9eca : 0x55dcff);
      innerGlowMaterial.opacity = light ? 0.3 : 0.58;
      outerGlowMaterial.color.setHex(light ? 0x5e83d2 : 0x547cff);
      outerGlowMaterial.opacity = light ? 0.12 : 0.22;
      cageMaterial.color.setHex(light ? 0x18789a : 0x8be9ff);
      cageMaterial.opacity = light ? 0.48 : 0.36;
      codeStrokeMaterial.color.setHex(light ? 0x075d7d : 0xd2f9ff);
      codeGlowMaterial.color.setHex(light ? 0x087fa1 : 0x38d9f5);
      codeGlowMaterial.opacity = light ? 0.09 : 0.13;
      ringMaterial.color.setHex(light ? 0x087fa1 : 0x53d6ee);
      farRingMaterial.color.setHex(light ? 0x4d62b3 : 0x7e9eff);
      cyanSignalMaterial.color.setHex(light ? 0x087fa1 : 0xc7f8ff);
      blueSignalMaterial.color.setHex(light ? 0x4d62b3 : 0xa9bdff);
      cyanHaloMaterial.color.setHex(light ? 0x087fa1 : 0x39d9f5);
      blueHaloMaterial.color.setHex(light ? 0x4d62b3 : 0x7599ff);
      cyanTrailMaterial.color.setHex(light ? 0x087fa1 : 0x75e9fb);
      blueTrailMaterial.color.setHex(light ? 0x4d62b3 : 0xa6baff);
      cyanLight.intensity = light ? 3.6 : 5;
      blueLight.intensity = light ? 1.6 : 2.4;
      render();
    }

    function tick(now) {
      frame = 0;
      if (disposed || !visible || document.hidden || reducedMotion.matches) return;
      if (mount.clientWidth < 560 && lastTime && now - lastTime < 32) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      elapsed += delta;
      core.rotation.y = 0.35 + elapsed * 0.12;
      core.rotation.x = 0.18 + Math.sin(elapsed * 0.3) * 0.04;
      cage.rotation.y = -elapsed * 0.08;
      codeMark.position.z = 1.25 + Math.sin(elapsed * 0.65) * 0.025;
      ring.rotation.x = 1.13 + Math.sin(elapsed * 0.22) * 0.16;
      ring.rotation.y = 0.15 + elapsed * 0.16;
      ring.rotation.z = -0.24 + elapsed * 0.1;
      farRing.rotation.x = 0.43 + elapsed * 0.11;
      farRing.rotation.y = 1.05 - elapsed * 0.14;
      farRing.rotation.z = 0.38 - elapsed * 0.08;
      positionSignals();
      const easing = Math.min(1, delta * 2.6);
      assembly.rotation.y += (pointerX * 0.13 - assembly.rotation.y) * easing;
      assembly.rotation.x += (-pointerY * 0.1 - assembly.rotation.x) * easing;
      render();
      frame = requestAnimationFrame(tick);
    }

    function syncAnimation() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (visible && !document.hidden) {
        if (reducedMotion.matches) render();
        else frame = requestAnimationFrame(tick);
      }
    }

    function onPointerMove(event) {
      if (!finePointer.matches || reducedMotion.matches) return;
      const bounds = mount.getBoundingClientRect();
      pointerX = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
      pointerY = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);
    }

    function onPointerLeave() {
      pointerX = 0;
      pointerY = 0;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { rootMargin: "80px 0px" });
    visibilityObserver.observe(mount);
    mount.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    window.addEventListener("portfolio:themechange", applyTheme);

    core.rotation.set(0.18, 0.35, 0);
    positionSignals();
    resize();
    applyTheme();
    mount.dataset.ready = "true";

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
      window.removeEventListener("portfolio:themechange", applyTheme);
      delete mount.dataset.ready;
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowTexture.dispose();
      innerGlowMaterial.dispose();
      outerGlowMaterial.dispose();
      cageSourceGeometry.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      codeStrokeGeometry.dispose();
      codeStrokeMaterial.dispose();
      codeGlowMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      farRingGeometry.dispose();
      farRingMaterial.dispose();
      signalGeometry.dispose();
      haloGeometry.dispose();
      cyanSignalMaterial.dispose();
      blueSignalMaterial.dispose();
      cyanHaloMaterial.dispose();
      blueHaloMaterial.dispose();
      cyanTrailGeometry.dispose();
      blueTrailGeometry.dispose();
      cyanTrailMaterial.dispose();
      blueTrailMaterial.dispose();
      signals.forEach(({ label }) => label.remove());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-orbital-mount" ref={mountRef} aria-hidden="true" />;
}

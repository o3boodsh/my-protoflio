"use client";

import { useEffect, useRef } from "react";
import { initializeSculpture } from "./hero-sculpture";
import "@/app/sculpture.css";

export default function HeroSculpture() {
  const stageRef = useRef(null);
  useEffect(() => initializeSculpture(stageRef.current), []);

  return (
    <section className="hero-sculpture" ref={stageRef} aria-label="Interactive digital sculpture">
      <div className="glowA" aria-hidden="true" />
      <div className="glowB" aria-hidden="true" />
      <div className="burstflash" data-flash aria-hidden="true" />
      <canvas data-webgl aria-hidden="true" />
      <canvas data-fx aria-hidden="true" />
      <div className="coordinates" aria-hidden="true">
        <span className="corner a" /><span className="corner b" />
        <span className="corner c" /><span className="corner d" />
      </div>
      {["React", "Next.js", "Python", "AI / RAG"].map((name) => (
        <span className="sculpture-tech-label" data-tech-label key={name}>{name}</span>
      ))}
    </section>
  );
}

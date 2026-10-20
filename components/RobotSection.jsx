export default function RobotSection() {
  return (
    <section className="robot-section" id="robot" aria-labelledby="robot-title">
      <div className="robot-section-copy" data-motion-group>
        <div className="badge" data-motion="fade"><span className="badge-dot" aria-hidden="true"></span> INTERACTIVE LAB</div>
        <h2 id="robot-title" data-motion="blur">Say hello to the <span className="gradient-text">robot.</span></h2>
        <p data-motion="fade">
          A small Three.js experiment. Move your pointer to meet its gaze, or invite it to wave.
        </p>
        <button className="btn-primary robot-wave-button" id="robot-wave-button" type="button" data-motion="fade">
          Wave hello <span aria-hidden="true">↗</span>
        </button>
        <p className="robot-status" id="robot-status" role="status" aria-live="polite" aria-atomic="true"></p>
      </div>

      <div className="robot-stage" data-motion="scale">
        <div className="robot-frame" aria-hidden="true">
          <div className="radial-glow"></div>
          <div id="robot-mount">
            <div className="robot-fallback">Interactive robot preview</div>
          </div>
        </div>
      </div>
    </section>
  );
}

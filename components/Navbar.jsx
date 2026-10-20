import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
  <nav className="navbar">
    <div className="nav-container">
      <span className="logo">ABDULLAH</span>
      <div className="nav-links" id="nav-links">
        <a href="#home" className="active">Home</a>
        <a href="#discovery">About</a>
        <a href="#experiences">Experiences</a>
        <a href="#projects">Projects</a>
        <a href="#robot">Robot</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-actions">
        <ThemeToggle />
        <a href="mailto:AbdullahShehada03@gmail.com" className="btn-hire">Hire Me</a>
        <div className="avatar-badge">AS</div>
        <button className="mobile-toggle" id="menu-toggle" aria-label="Toggle navigation" aria-controls="nav-links" aria-expanded="false">
          <i data-lucide="menu" id="menu-icon"></i>
        </button>
      </div>
    </div>
  </nav>
  );
}

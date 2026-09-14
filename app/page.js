import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Discovery from "@/components/Discovery";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Discovery />
      <Experience />
      <Projects />
      <Contact />
      <ClientEffects />
    </>
  );
}

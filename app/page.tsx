// app/page.jsx
import Hero from "@/components/Hero";
import Horaires from "@/components/Horaires";
import Praticiens from "@/components/Praticiens";
import MentionsLegales from "@/components/MentionsLegales";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Praticiens />
      <Horaires />
      <MentionsLegales />
      <Footer />
    </main>
  );
}

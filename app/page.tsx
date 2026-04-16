// app/page.jsx
import Hero from "@/components/Hero";
import Horaires from "@/components/Horaires";
import Praticiens from "@/components/Praticiens";
import MentionsLegales from "@/components/MentionsLegales";
import Footer from "@/components/Footer";
import Articles from "@/components/articles";
export default function Home() {
  return (
    <main>
      <Hero />
      <Praticiens />
      <Horaires />
      <Articles/> 
      <MentionsLegales />
      <Articles />
      <Footer />
    </main>
  );
}

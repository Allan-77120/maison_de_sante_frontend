import Hero from "@/components/Hero";
import Horaires from "@/components/Horaires";
import Praticiens from "@/components/Praticiens";
import MentionsLegales from "@/components/MentionsLegales";
import Footer from "@/components/Footer";
import Acces from "@/components/Acces";
import MobileBottomNavClient from "@/components/MobileBottomNavClient";
import Articles from "@/components/articles";
export default function Home() {
  return (
    <main className="pb-[76px] md:pb-0">
      <Hero />
      <Praticiens />
      <Horaires />
      <Acces />
      <Articles />
      <MentionsLegales />
      <Footer />
      <MobileBottomNavClient />
    </main>
  );
}

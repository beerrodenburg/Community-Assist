import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { SlideJourney } from "@/components/slides/SlideJourney";
import { Finale } from "@/components/finale/Finale";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <SlideJourney />
      <Finale />
    </main>
  );
}

import AtmosphereGallery from "./components/AtmosphereGallery";
import HeroSection from "./components/HeroSection";
import StoryTimeline from "./components/StoryTimeline";

export default function CustomerHomePage() {
  return (
    <main>
      <HeroSection />
      <StoryTimeline />
      <AtmosphereGallery />
    </main>
  );
}

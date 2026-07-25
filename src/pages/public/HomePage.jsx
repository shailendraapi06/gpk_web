import {
  ContactSection,
  DepartmentSection,
  GallerySection,
  HeroSection,
  LeadershipSection,
  LatestNoticesSection,
  NotificationBar,
  PlacementSection,
  PrincipalSection,
  QuickLinksSection
} from "../../components/home";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <NotificationBar />
      <LeadershipSection />
      <QuickLinksSection />
      <LatestNoticesSection />
      <DepartmentSection />
      <PlacementSection />
      <PrincipalSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}

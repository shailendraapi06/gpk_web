import { Footer } from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { ContentWrapper } from "./ContentWrapper";

export function MainLayout() {
  return (
    <div className="layout-shell layout-shell--public">
      <Navbar />
      <ContentWrapper as="main" className="layout-main" contentClassName="layout-main__inner">
        <Outlet />
      </ContentWrapper>
      <Footer />
    </div>
  );
}

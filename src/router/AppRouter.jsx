import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { MainLayout } from "../layouts/MainLayout";

// Import Admin Pages
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminHomepageMgmtPage } from "../pages/admin/AdminHomepageMgmtPage";
import { AdminFooterMgmtPage } from "../pages/admin/AdminFooterMgmtPage";
import { AdminAboutMgmtPage } from "../pages/admin/AdminAboutMgmtPage";
import { AdminAdmissionMgmtPage } from "../pages/admin/AdminAdmissionMgmtPage";
import { AdminDepartmentMgmtPage } from "../pages/admin/AdminDepartmentMgmtPage";
import { AdminFacultyPage } from "../pages/admin/AdminFacultyPage";
import { AdminPlacementPage } from "../pages/admin/AdminPlacementPage";
import { AdminGalleryPage } from "../pages/admin/AdminGalleryPage";

import {
  AboutPage,
  AdmissionsPage,
  ContactPage,
  DepartmentDetailPage,
  DepartmentsPage,
  FacultyPage,
  FacilitiesPage,
  GalleryPage,
  HomePage,
  PlacementPage
} from "../pages/public";
import { NotFoundPage } from "../pages/system/NotFoundPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentDetailPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="homepage" element={<AdminHomepageMgmtPage />} />
          <Route path="footer" element={<AdminFooterMgmtPage />} />
          <Route path="about" element={<AdminAboutMgmtPage />} />
          <Route path="admission" element={<AdminAdmissionMgmtPage />} />
          <Route path="departments" element={<AdminDepartmentMgmtPage />} />
          <Route path="faculty" element={<AdminFacultyPage />} />
          <Route path="placement" element={<AdminPlacementPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

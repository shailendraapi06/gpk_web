import React, { useState, useEffect } from "react";
import { PlusIcon, EditIcon, DeleteIcon, SearchIcon, DocumentIcon } from "../../components/admin/Icons";
import { DeleteConfirmationModal } from "../../components/admin/DeleteConfirmationModal";
import { apiRequest } from "../../services/api/client";

export function AdminHomepageMgmtPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [alertInfo, setAlertInfo] = useState({ show: false, text: "", type: "success" });
  const [loading, setLoading] = useState(true);

  const triggerAlert = (text, type = "success") => {
    setAlertInfo({ show: true, text, type });
    setTimeout(() => setAlertInfo({ show: false, text: "", type: "success" }), 3000);
  };

  // --- STATE 1: Hero Slides (id, src) ---
  const [slides, setSlides] = useState([
    { id: "hero-campus-2", src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop" },
    { id: "hero-campus-1", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop" },
    { id: "hero-campus-3", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" }
  ]);
  const [isHeroFormOpen, setIsHeroFormOpen] = useState(false);
  const [isHeroDeleteOpen, setIsHeroDeleteOpen] = useState(false);
  const [currentHero, setCurrentHero] = useState(null);
  const [heroToDelete, setHeroToDelete] = useState(null);
  const [heroFormData, setHeroFormData] = useState({ src: "" });

  // --- STATE 2: Leadership (id, name, designation, photo: {src}) ---
  const [leadersList, setLeadersList] = useState([
    { id: "yogi-adityanath", name: "Shri Yogi Adityanath", designation: "Hon'ble Chief Minister of Uttar Pradesh", photo: { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop" } },
    { id: "ashish-patel", name: "Shri Ashish Patel", designation: "Hon'ble Minister of Technical Education, Uttar Pradesh", photo: { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" } },
    { id: "mk-shanmuga-sundaram", name: "Dr. M.K. Shanmuga Sundaram, IAS", designation: "Principal Secretary, Technical Education Department, U.P.", photo: { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" } }
  ]);
  const [isLeaderFormOpen, setIsLeaderFormOpen] = useState(false);
  const [isLeaderDeleteOpen, setIsLeaderDeleteOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState(null);
  const [leaderToDelete, setLeaderToDelete] = useState(null);
  const [leaderFormData, setLeaderFormData] = useState({ name: "", designation: "", src: "" });

  // --- STATE 3: Latest Notices (id, title, description, publishDate, isNew, actionLabel, actionHref) ---
  const [notices, setNotices] = useState([
    { id: "notice-1", title: "Admission Counseling Schedule Released", description: "Updated counseling rounds and reporting instructions for incoming diploma students.", publishDate: "12 Jul 2026", isNew: true, actionLabel: "View PDF", actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "notice-2", title: "Semester Registration Notice", description: "Registration dates, document checklist, and fee submission instructions for all departments.", publishDate: "10 Jul 2026", isNew: true, actionLabel: "View PDF", actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "notice-3", title: "Academic Calendar Published", description: "Session timeline covering commencement dates, holidays, examinations, and internal assessments.", publishDate: "06 Jul 2026", isNew: false, actionLabel: "View PDF", actionHref: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ]);
  const [noticeSearch, setNoticeSearch] = useState("");
  const [isNoticeFormOpen, setIsNoticeFormOpen] = useState(false);
  const [isNoticeDeleteOpen, setIsNoticeDeleteOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({ title: "", description: "", publishDate: "", isNew: false, actionLabel: "View PDF", actionHref: "" });

  // --- STATE 4: Recruiter Network (id, name, logo) ---
  const [recruiters, setRecruiters] = useState([
    { id: "recruiter-1", name: "TechNova", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop" },
    { id: "recruiter-2", name: "BuildCore", logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=150&auto=format&fit=crop" },
    { id: "recruiter-3", name: "PowerGrid Works", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop" },
    { id: "recruiter-4", name: "InfraAxis", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150&auto=format&fit=crop" }
  ]);
  const [isRecruiterFormOpen, setIsRecruiterFormOpen] = useState(false);
  const [isRecruiterDeleteOpen, setIsRecruiterDeleteOpen] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState(null);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [recruiterFormData, setRecruiterFormData] = useState({ name: "", logo: "" });

  // --- STATE 5: Principal Section (sectionTitle, name, designation, message, actionLabel, actionTo, photo: {src}) ---
  const [principal, setPrincipal] = useState({
    sectionTitle: "Principal's Message",
    name: "Dr. A. K. Sharma",
    designation: "Principal, Government Polytechnic Kanpur",
    message: "At Government Polytechnic Kanpur, we are committed to creating an academic environment where technical knowledge, discipline, and practical learning work together to shape capable professionals. Our focus remains on student growth, responsible innovation, and preparing learners for meaningful careers in a rapidly changing world.",
    actionLabel: "Read Full Message",
    actionTo: "/about",
    photo: {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
    }
  });

  // --- STATE 6: Campus Gallery (id, title, category, src) ---
  const [galleryItems, setGalleryItems] = useState([
    { id: "campus", title: "Main Campus", category: "Campus", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop" },
    { id: "labs", title: "Technical Laboratories", category: "Labs", src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
    { id: "events", title: "Institutional Events", category: "Events", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop" }
  ]);
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);
  const [isGalleryDeleteOpen, setIsGalleryDeleteOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [galleryFormData, setGalleryFormData] = useState({ title: "", category: "Campus", src: "" });

  // --- STATE 7: Get In Touch (id, label, value, icon) ---
  const [contactItems, setContactItems] = useState([
    { id: "address", label: "Address", value: "GT Road, Near Gurudev Palace, Vikas Nagar, Kanpur(U.P.) - 208002", icon: "address" },
    { id: "phone", label: "Phone", value: "+91 00000 00000", icon: "phone" },
    { id: "email", label: "Email", value: "newprincipalgpknp18@gmail.com", icon: "email" },
    { id: "hours", label: "Office Hours", value: "Monday to Saturday, 10:00 AM to 5:00 PM", icon: "hours" }
  ]);

  // Load initial data from APIs
  useEffect(() => {
    async function loadData() {
      try {
        const hpRes = await apiRequest("/homepage");
        if (hpRes && hpRes.data) {
          if (hpRes.data.heroSlides) setSlides(hpRes.data.heroSlides);
          if (hpRes.data.leadership) setLeadersList(hpRes.data.leadership);
          if (hpRes.data.principal) setPrincipal(hpRes.data.principal);
          if (hpRes.data.recruiters) setRecruiters(hpRes.data.recruiters);
          if (hpRes.data.gallery) setGalleryItems(hpRes.data.gallery);
          if (hpRes.data.contact) setContactItems(hpRes.data.contact);
        }

        const noticeRes = await apiRequest("/notices");
        if (noticeRes && noticeRes.notices) {
          setNotices(noticeRes.notices);
        }
      } catch (err) {
        console.warn("Failed to fetch initial homepage data from API, using fallback state:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);


  // ==========================================
  // --- HANDLERS 1: Hero Slides ---
  // ==========================================
  const handleHeroAdd = () => {
    setCurrentHero(null);
    setHeroFormData({ src: "" });
    setIsHeroFormOpen(true);
  };
  const handleHeroEdit = (slide) => {
    setCurrentHero(slide);
    setHeroFormData({ src: slide.src || slide.image || "" });
    setIsHeroFormOpen(true);
  };
  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    if (!heroFormData.src) return;

    try {
      if (currentHero) {
        const res = await apiRequest(`/homepage/hero/${currentHero.id || currentHero._id}`, "PUT", {
          src: heroFormData.src,
          image: heroFormData.src,
          imageUrl: heroFormData.src
        });
        setSlides(prev => prev.map(s => (s.id === currentHero.id || s._id === currentHero._id) ? { ...s, src: heroFormData.src, image: heroFormData.src } : s));
        triggerAlert(res.message || "Hero Slide updated successfully!");
      } else {
        const res = await apiRequest("/homepage/hero", "POST", {
          src: heroFormData.src,
          image: heroFormData.src,
          imageUrl: heroFormData.src
        });
        if (res.slide) {
          setSlides(prev => [...prev, res.slide]);
        } else {
          setSlides(prev => [...prev, { id: `hero-${Date.now()}`, src: heroFormData.src, image: heroFormData.src }]);
        }
        triggerAlert(res.message || "New Hero Slide added successfully!");
      }
    } catch (err) {
      triggerAlert(err.message || "Failed to save Hero Slide", "error");
    } finally {
      setIsHeroFormOpen(false);
    }
  };
  const handleHeroDelete = (slide) => {
    setHeroToDelete(slide);
    setIsHeroDeleteOpen(true);
  };
  const handleHeroConfirmDelete = async () => {
    if (!heroToDelete) return;
    try {
      await apiRequest(`/homepage/hero/${heroToDelete.id || heroToDelete._id}`, "DELETE");
      setSlides(prev => prev.filter(s => s.id !== heroToDelete.id && s._id !== heroToDelete._id));
      triggerAlert("Hero Slide deleted successfully!", "error");
    } catch (err) {
      triggerAlert(err.message || "Failed to delete Hero Slide", "error");
    } finally {
      setIsHeroDeleteOpen(false);
    }
  };

  // ==========================================
  // --- HANDLERS 2: Leadership ---
  // ==========================================
  const handleLeaderAdd = () => {
    setCurrentLeader(null);
    setLeaderFormData({ name: "", designation: "", src: "" });
    setIsLeaderFormOpen(true);
  };
  const handleLeaderEdit = (ldr) => {
    setCurrentLeader(ldr);
    setLeaderFormData({ name: ldr.name, designation: ldr.designation, src: ldr.photo?.src || ldr.photoUrl || "" });
    setIsLeaderFormOpen(true);
  };
  const handleLeaderSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: leaderFormData.name,
      designation: leaderFormData.designation,
      src: leaderFormData.src,
      photoUrl: leaderFormData.src,
      photo: { src: leaderFormData.src }
    };

    try {
      if (currentLeader) {
        const res = await apiRequest(`/homepage/leadership/${currentLeader.id || currentLeader._id}`, "PUT", payload);
        setLeadersList(prev => prev.map(l => (l.id === currentLeader.id || l._id === currentLeader._id) ? { ...l, ...payload } : l));
        triggerAlert(res.message || "Leader Profile updated successfully!");
      } else {
        const res = await apiRequest("/homepage/leadership", "POST", payload);
        if (res.leader) {
          setLeadersList(prev => [...prev, res.leader]);
        } else {
          setLeadersList(prev => [...prev, { id: `ldr-${Date.now()}`, ...payload }]);
        }
        triggerAlert(res.message || "New Leader Profile added successfully!");
      }
    } catch (err) {
      triggerAlert(err.message || "Failed to save leader profile", "error");
    } finally {
      setIsLeaderFormOpen(false);
    }
  };
  const handleLeaderDelete = (ldr) => {
    setLeaderToDelete(ldr);
    setIsLeaderDeleteOpen(true);
  };
  const handleLeaderConfirmDelete = async () => {
    if (!leaderToDelete) return;
    try {
      await apiRequest(`/homepage/leadership/${leaderToDelete.id || leaderToDelete._id}`, "DELETE");
      setLeadersList(prev => prev.filter(l => l.id !== leaderToDelete.id && l._id !== leaderToDelete._id));
      triggerAlert("Leader Profile deleted successfully!", "error");
    } catch (err) {
      triggerAlert(err.message || "Failed to delete leader", "error");
    } finally {
      setIsLeaderDeleteOpen(false);
    }
  };

  // ==========================================
  // --- HANDLERS 3: Latest Notices ---
  // ==========================================
  const handleNoticeAdd = () => {
    setCurrentNotice(null);
    setNoticeFormData({ title: "", description: "", publishDate: "", isNew: false, actionLabel: "View PDF", actionHref: "" });
    setIsNoticeFormOpen(true);
  };
  const handleNoticeEdit = (ntc) => {
    setCurrentNotice(ntc);
    setNoticeFormData({ title: ntc.title, description: ntc.description, publishDate: ntc.publishDate || ntc.date || "", isNew: ntc.isNew || ntc.isNewNotice || false, actionLabel: ntc.actionLabel || "View PDF", actionHref: ntc.actionHref || ntc.link || "" });
    setIsNoticeFormOpen(true);
  };
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: noticeFormData.title,
      description: noticeFormData.description,
      date: noticeFormData.publishDate,
      publishDate: noticeFormData.publishDate,
      isNew: noticeFormData.isNew,
      isNewNotice: noticeFormData.isNew,
      link: noticeFormData.actionHref,
      actionHref: noticeFormData.actionHref,
      pdfUrl: noticeFormData.actionHref
    };

    try {
      if (currentNotice) {
        const res = await apiRequest(`/notices/${currentNotice.id || currentNotice._id}`, "PUT", payload);
        setNotices(prev => prev.map(n => (n.id === currentNotice.id || n._id === currentNotice._id) ? { ...n, ...noticeFormData } : n));
        triggerAlert(res.message || "Notice updated successfully!");
      } else {
        const res = await apiRequest("/notices", "POST", payload);
        if (res.notice) {
          setNotices(prev => [res.notice, ...prev]);
        } else {
          setNotices(prev => [{ id: `notice-${Date.now()}`, ...noticeFormData }, ...prev]);
        }
        triggerAlert(res.message || "Notice posted successfully!");
      }
    } catch (err) {
      triggerAlert(err.message || "Failed to save notice", "error");
    } finally {
      setIsNoticeFormOpen(false);
    }
  };
  const handleNoticeDelete = (ntc) => {
    setNoticeToDelete(ntc);
    setIsNoticeDeleteOpen(true);
  };
  const handleNoticeConfirmDelete = async () => {
    if (!noticeToDelete) return;
    try {
      await apiRequest(`/notices/${noticeToDelete.id || noticeToDelete._id}`, "DELETE");
      setNotices(prev => prev.filter(n => n.id !== noticeToDelete.id && n._id !== noticeToDelete._id));
      triggerAlert("Notice deleted successfully!", "error");
    } catch (err) {
      triggerAlert(err.message || "Failed to delete notice", "error");
    } finally {
      setIsNoticeDeleteOpen(false);
    }
  };

  // ==========================================
  // --- HANDLERS 4: Recruiters ---
  // ==========================================
  const handleRecruiterAdd = () => {
    setCurrentRecruiter(null);
    setRecruiterFormData({ name: "", logo: "" });
    setIsRecruiterFormOpen(true);
  };
  const handleRecruiterEdit = (rec) => {
    setCurrentRecruiter(rec);
    setRecruiterFormData({ name: rec.name, logo: rec.logo || rec.logoUrl || "" });
    setIsRecruiterFormOpen(true);
  };
  const handleRecruiterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: recruiterFormData.name,
      logo: recruiterFormData.logo,
      logoUrl: recruiterFormData.logo
    };

    try {
      if (currentRecruiter) {
        const res = await apiRequest(`/homepage/recruiters/${currentRecruiter.id || currentRecruiter._id}`, "PUT", payload);
        setRecruiters(prev => prev.map(r => (r.id === currentRecruiter.id || r._id === currentRecruiter._id) ? { ...r, ...payload } : r));
        triggerAlert(res.message || "Recruiter updated successfully!");
      } else {
        const res = await apiRequest("/homepage/recruiters", "POST", payload);
        if (res.recruiter) {
          setRecruiters(prev => [...prev, res.recruiter]);
        } else {
          setRecruiters(prev => [...prev, { id: `rec-${Date.now()}`, ...payload }]);
        }
        triggerAlert(res.message || "Recruiter added successfully!");
      }
    } catch (err) {
      triggerAlert(err.message || "Failed to save recruiter", "error");
    } finally {
      setIsRecruiterFormOpen(false);
    }
  };
  const handleRecruiterDelete = (rec) => {
    setRecruiterToDelete(rec);
    setIsRecruiterDeleteOpen(true);
  };
  const handleRecruiterConfirmDelete = async () => {
    if (!recruiterToDelete) return;
    try {
      await apiRequest(`/homepage/recruiters/${recruiterToDelete.id || recruiterToDelete._id}`, "DELETE");
      setRecruiters(prev => prev.filter(r => r.id !== recruiterToDelete.id && r._id !== recruiterToDelete._id));
      triggerAlert("Recruiter deleted successfully!", "error");
    } catch (err) {
      triggerAlert(err.message || "Failed to delete recruiter", "error");
    } finally {
      setIsRecruiterDeleteOpen(false);
    }
  };

  // ==========================================
  // --- HANDLERS 5: Principal Section ---
  // ==========================================
  const handlePrincipalSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sectionTitle: principal.sectionTitle,
      name: principal.name,
      designation: principal.designation,
      message: principal.message,
      actionLabel: principal.actionLabel,
      actionTo: principal.actionTo,
      photoUrl: principal.photo?.src || principal.photoUrl || "",
      src: principal.photo?.src || principal.photoUrl || ""
    };

    try {
      const res = await apiRequest("/homepage/principal", "PUT", payload);
      triggerAlert(res.message || "Principal message updated successfully!");
    } catch (err) {
      triggerAlert(err.message || "Failed to update principal message", "error");
    }
  };

  // ==========================================
  // --- HANDLERS 6: Campus Gallery ---
  // ==========================================
  const handleGalleryAdd = () => {
    setCurrentGallery(null);
    setGalleryFormData({ title: "", category: "Campus", src: "" });
    setIsGalleryFormOpen(true);
  };
  const handleGalleryEdit = (item) => {
    setCurrentGallery(item);
    setGalleryFormData({ title: item.title, category: item.category, src: item.src });
    setIsGalleryFormOpen(true);
  };
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: galleryFormData.title,
      category: galleryFormData.category,
      src: galleryFormData.src
    };

    try {
      if (currentGallery) {
        const res = await apiRequest(`/homepage/gallery/${currentGallery.id || currentGallery._id}`, "PUT", payload);
        setGalleryItems(prev => prev.map(g => (g.id === currentGallery.id || g._id === currentGallery._id) ? { ...g, ...payload } : g));
        triggerAlert(res.message || "Gallery item updated successfully!");
      } else {
        const res = await apiRequest("/homepage/gallery", "POST", payload);
        if (res.galleryItem) {
          setGalleryItems(prev => [...prev, res.galleryItem]);
        } else {
          setGalleryItems(prev => [...prev, { id: `gal-${Date.now()}`, ...payload }]);
        }
        triggerAlert(res.message || "Gallery image uploaded successfully!");
      }
    } catch (err) {
      triggerAlert(err.message || "Failed to save gallery item", "error");
    } finally {
      setIsGalleryFormOpen(false);
    }
  };
  const handleGalleryDelete = (item) => {
    setGalleryToDelete(item);
    setIsGalleryDeleteOpen(true);
  };
  const handleGalleryConfirmDelete = async () => {
    if (!galleryToDelete) return;
    try {
      await apiRequest(`/homepage/gallery/${galleryToDelete.id || galleryToDelete._id}`, "DELETE");
      setGalleryItems(prev => prev.filter(g => g.id !== galleryToDelete.id && g._id !== galleryToDelete._id));
      triggerAlert("Gallery item deleted successfully!", "error");
    } catch (err) {
      triggerAlert(err.message || "Failed to delete gallery item", "error");
    } finally {
      setIsGalleryDeleteOpen(false);
    }
  };

  // ==========================================
  // --- HANDLERS 7: Get In Touch ---
  // ==========================================
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest("/homepage/contact-info", "PUT", { items: contactItems });
      triggerAlert(res.message || "Get In Touch details saved!");
    } catch (err) {
      triggerAlert(err.message || "Failed to save contact details", "error");
    }
  };

  return (
    <div>
      {/* Toast alert indicator */}
      {alertInfo.show && (
        <div className={`admin-badge ${alertInfo.type === "success" ? "admin-badge--success" : "admin-badge--error"}`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1100, padding: "0.75rem 1.5rem", boxShadow: "var(--shadow-md)" }}>
          {alertInfo.text}
        </div>
      )}

      <div className="admin-page-header">
        <div className="admin-page-header__info">
          <h1 className="admin-page-header__title">Homepage Editor</h1>
          <p className="admin-page-header__desc">Directly manage content components synchronized with the main public homepage structure.</p>
        </div>
      </div>

      {/* TABS MENU */}
      <div className="admin-settings-tabs" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <button className={`admin-settings-tab ${activeTab === "hero" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("hero")}>Hero Banners</button>
        <button className={`admin-settings-tab ${activeTab === "leaders" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("leaders")}>Leadership</button>
        <button className={`admin-settings-tab ${activeTab === "notices" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("notices")}>Latest Notices</button>
        <button className={`admin-settings-tab ${activeTab === "recruiters" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("recruiters")}>Recruiter Network</button>
        <button className={`admin-settings-tab ${activeTab === "principal" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("principal")}>Principal Message</button>
        <button className={`admin-settings-tab ${activeTab === "gallery" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("gallery")}>Campus Gallery</button>
        <button className={`admin-settings-tab ${activeTab === "contact" ? "admin-settings-tab--active" : ""}`} onClick={() => setActiveTab("contact")}>Get In Touch</button>
      </div>

      {/* ========================== TAB 1: HERO SLIDES ========================== */}
      {activeTab === "hero" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Home Hero Carousel</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleHeroAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Banner Slide
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Slide Image URL</th>
                  <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide) => (
                  <tr key={slide.id}>
                    <td>
                      <code style={{ fontSize: "12px", wordBreak: "break-all" }}>{slide.src}</code>
                    </td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleHeroEdit(slide)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleHeroDelete(slide)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 2: LEADERSHIP ========================== */}
      {activeTab === "leaders" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>State & Department Leadership</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleLeaderAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Leader Profile
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Leader Name</th>
                  <th>Designation</th>
                  <th>Photo URL</th>
                  <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadersList.map((leader) => (
                  <tr key={leader.id}>
                    <td style={{ fontWeight: "bold" }}>{leader.name}</td>
                    <td><span className="admin-badge admin-badge--info" style={{ fontSize: "11px" }}>{leader.designation}</span></td>
                    <td><code style={{ fontSize: "11px" }}>{leader.photo.src}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleLeaderEdit(leader)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleLeaderDelete(leader)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 3: LATEST NOTICES ========================== */}
      {activeTab === "notices" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Latest Notices & Bulletins</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleNoticeAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Post Notice
            </button>
          </div>

          <div className="admin-filter-bar" style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}>
            <div className="admin-search-wrapper" style={{ width: "100%" }}>
              <SearchIcon className="admin-search-icon" />
              <input type="text" className="admin-search-input" placeholder="Search notices by keyword..." value={noticeSearch} onChange={(e) => setNoticeSearch(e.target.value)} />
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "110px" }}>Date</th>
                  <th>Title / Link</th>
                  <th>Brief Description</th>
                  <th style={{ width: "80px" }}>Is New</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.filter(n => n.title.toLowerCase().includes(noticeSearch.toLowerCase())).map((ntc) => (
                  <tr key={ntc.id}>
                    <td>{ntc.publishDate}</td>
                    <td>
                      <div style={{ fontWeight: "bold" }}>{ntc.title}</div>
                      {ntc.actionHref && (
                        <div style={{ fontSize: "11px", marginTop: "4px" }}>
                          <a href={ntc.actionHref} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "var(--color-primary-500)", display: "flex", alignItems: "center", gap: "2px" }}>
                            <DocumentIcon style={{ width: "11px", height: "11px" }} /> {ntc.actionLabel || "Download Document"}
                          </a>
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: "13px" }}>{ntc.description}</td>
                    <td>
                      {ntc.isNew ? <span className="admin-badge admin-badge--success">New</span> : <span style={{ color: "var(--color-text-muted)" }}>No</span>}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-table__action-btn admin-table__action-btn--edit" onClick={() => handleNoticeEdit(ntc)}><EditIcon /></button>
                        <button className="admin-table__action-btn admin-table__action-btn--delete" onClick={() => handleNoticeDelete(ntc)}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 4: RECRUITER NETWORK ========================== */}
      {activeTab === "recruiters" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Home Recruiter Blocks</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleRecruiterAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Recruiter
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Logo Preview</th>
                  <th>Company Name</th>
                  <th>Logo URL</th>
                  <th style={{ width: "150px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((rec) => (
                  <tr key={rec.id}>
                    <td>
                      <img src={rec.logo} alt="" style={{ height: "30px", objectFit: "contain", maxWidth: "100px", background: "#f8f9fb", padding: "2px", borderRadius: "4px" }} />
                    </td>
                    <td style={{ fontWeight: "bold" }}>{rec.name}</td>
                    <td><code style={{ fontSize: "11px" }}>{rec.logo}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleRecruiterEdit(rec)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleRecruiterDelete(rec)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 5: PRINCIPAL MESSAGE ========================== */}
      {activeTab === "principal" && (
        <form onSubmit={handlePrincipalSubmit} className="admin-card" style={{ maxWidth: "700px" }}>
          <h3 className="admin-card__title">Principal Desk Editor</h3>

          <div className="admin-form-group">
            <label className="admin-label">Section Header Title</label>
            <input type="text" className="admin-input" value={principal.sectionTitle} onChange={(e) => setPrincipal({ ...principal, sectionTitle: e.target.value })} required />
          </div>

          <div className="admin-form-group--row">
            <div className="admin-form-group">
              <label className="admin-label">Principal Name</label>
              <input type="text" className="admin-input" value={principal.name} onChange={(e) => setPrincipal({ ...principal, name: e.target.value })} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Official Designation</label>
              <input type="text" className="admin-input" value={principal.designation} onChange={(e) => setPrincipal({ ...principal, designation: e.target.value })} required />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label font-bold">Principal Photo</label>
            <input
              type="file"
              accept="image/*"
              className="admin-input"
              style={{ marginBottom: "0.5rem" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPrincipal(prev => ({ ...prev, photo: { src: reader.result } }));
                  reader.readAsDataURL(file);
                }
              }}
            />
            <input
              type="text"
              className="admin-input"
              value={principal.photo.src}
              onChange={(e) => setPrincipal({ ...principal, photo: { src: e.target.value } })}
              placeholder="Or paste image URL (https://...)"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Principal message speech</label>
            <textarea className="admin-textarea" value={principal.message} onChange={(e) => setPrincipal({ ...principal, message: e.target.value })} style={{ minHeight: "150px" }} required />
          </div>

          <div className="admin-form-group--row">
            <div className="admin-form-group">
              <label className="admin-label">Read More Link Text</label>
              <input type="text" className="admin-input" value={principal.actionLabel} onChange={(e) => setPrincipal({ ...principal, actionLabel: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Link Path</label>
              <input type="text" className="admin-input" value={principal.actionTo} onChange={(e) => setPrincipal({ ...principal, actionTo: e.target.value })} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save Desk Info</button>
          </div>
        </form>
      )}

      {/* ========================== TAB 6: CAMPUS GALLERY ========================== */}
      {activeTab === "gallery" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "var(--color-primary-900)" }}>Home Gallery Showcase</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={handleGalleryAdd}>
              <PlusIcon style={{ width: "14px", height: "14px" }} /> Add Image
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Gallery Title</th>
                  <th>Category</th>
                  <th>Image URL</th>
                  <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {galleryItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: "bold" }}>{item.title}</td>
                    <td><span className="admin-badge admin-badge--info">{item.category}</span></td>
                    <td><code style={{ fontSize: "11px", wordBreak: "break-all" }}>{item.src}</code></td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => handleGalleryEdit(item)}><EditIcon /> Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleGalleryDelete(item)}><DeleteIcon /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================== TAB 7: GET IN TOUCH ========================== */}
      {activeTab === "contact" && (
        <form onSubmit={handleContactSubmit} className="admin-card" style={{ maxWidth: "600px" }}>
          <h3 className="admin-card__title">Get In Touch Information</h3>

          {contactItems.map((item) => (
            <div key={item.id} className="admin-form-group">
              <label className="admin-label">{item.label} Value</label>
              <textarea 
                className="admin-textarea" 
                style={{ minHeight: item.id === "address" ? "60px" : "40px" }}
                value={item.value} 
                onChange={(e) => {
                  const val = e.target.value;
                  setContactItems(prev => prev.map(c => c.id === item.id ? { ...c, value: val } : c));
                }}
                required 
              />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="admin-btn admin-btn--primary">Save Information</button>
          </div>
        </form>
      )}


      {/* ========================================================
          MODALS & FORM DRAWERS (No Image Previews - Sticky Buttons)
          ======================================================== */}
      
      {/* Hero Modal */}
      {isHeroFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "460px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentHero ? "Edit Slide Image" : "Add Slide Image"}</h3>
              <span className="admin-modal__close" onClick={() => setIsHeroFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleHeroSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Slide Image File or URL *</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-input"
                    style={{ marginBottom: "0.5rem" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setHeroFormData({ src: reader.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={heroFormData.src}
                    onChange={(e) => setHeroFormData({ src: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    required
                  />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsHeroFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leader Modal */}
      {isLeaderFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentLeader ? "Edit Leader Profile" : "Add Leader Profile"}</h3>
              <span className="admin-modal__close" onClick={() => setIsLeaderFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleLeaderSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Leader Name *</label>
                  <input type="text" className="admin-input" value={leaderFormData.name} onChange={(e) => setLeaderFormData({ ...leaderFormData, name: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Designation *</label>
                  <input type="text" className="admin-input" value={leaderFormData.designation} onChange={(e) => setLeaderFormData({ ...leaderFormData, designation: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label font-bold">Leader Photo File or URL *</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-input"
                    style={{ marginBottom: "0.5rem" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setLeaderFormData(prev => ({ ...prev, src: reader.result }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={leaderFormData.src}
                    onChange={(e) => setLeaderFormData({ ...leaderFormData, src: e.target.value })}
                    placeholder="Or paste photo URL (https://...)"
                    required
                  />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsLeaderFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {isNoticeFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentNotice ? "Edit Notice Details" : "Publish Notice"}</h3>
              <span className="admin-modal__close" onClick={() => setIsNoticeFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleNoticeSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Notice Title Headline *</label>
                  <input type="text" className="admin-input" value={noticeFormData.title} onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Brief Description Summary *</label>
                  <textarea className="admin-textarea" value={noticeFormData.description} onChange={(e) => setNoticeFormData({ ...noticeFormData, description: e.target.value })} required style={{ minHeight: "80px" }} />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Publishing Date *</label>
                    <input type="text" className="admin-input" value={noticeFormData.publishDate} onChange={(e) => setNoticeFormData({ ...noticeFormData, publishDate: e.target.value })} placeholder="e.g. 12 Jul 2026" required />
                  </div>
                  <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "24px" }}>
                    <input type="checkbox" id="isNew" checked={noticeFormData.isNew} onChange={(e) => setNoticeFormData({ ...noticeFormData, isNew: e.target.checked })} style={{ width: "18px", height: "18px" }} />
                    <label htmlFor="isNew" className="admin-label" style={{ margin: 0, cursor: "pointer" }}>Mark as 'New'</label>
                  </div>
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Link Action Label</label>
                    <input type="text" className="admin-input" value={noticeFormData.actionLabel} onChange={(e) => setNoticeFormData({ ...noticeFormData, actionLabel: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Action PDF Document or URL</label>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="admin-input"
                      style={{ marginBottom: "0.5rem" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNoticeFormData(prev => ({ ...prev, actionHref: reader.result }));
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={noticeFormData.actionHref}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, actionHref: e.target.value })}
                      placeholder="Or paste document URL (https://...)"
                    />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsNoticeFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recruiter Modal */}
      {isRecruiterFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up" style={{ maxWidth: "420px" }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentRecruiter ? "Edit Recruiter" : "Add Recruiter"}</h3>
              <span className="admin-modal__close" onClick={() => setIsRecruiterFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleRecruiterSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Company Name *</label>
                  <input type="text" className="admin-input" value={recruiterFormData.name} onChange={(e) => setRecruiterFormData({ ...recruiterFormData, name: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Logo File or URL *</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-input"
                    style={{ marginBottom: "0.5rem" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setRecruiterFormData(prev => ({ ...prev, logo: reader.result }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={recruiterFormData.logo}
                    onChange={(e) => setRecruiterFormData({ ...recruiterFormData, logo: e.target.value })}
                    placeholder="Or paste logo URL (https://...)"
                    required
                  />
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsRecruiterFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Recruiter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryFormOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal animate-slide-up">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{currentGallery ? "Edit Gallery Item" : "Add Gallery Item"}</h3>
              <span className="admin-modal__close" onClick={() => setIsGalleryFormOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleGallerySubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label className="admin-label">Gallery Title *</label>
                  <input type="text" className="admin-input" value={galleryFormData.title} onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })} required />
                </div>
                <div className="admin-form-group--row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Category</label>
                    <select className="admin-select" value={galleryFormData.category} onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}>
                      <option value="Campus">Campus</option>
                      <option value="Labs">Labs</option>
                      <option value="Events">Events</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Image File or URL *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-input"
                      style={{ marginBottom: "0.5rem" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setGalleryFormData(prev => ({ ...prev, src: reader.result }));
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={galleryFormData.src}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, src: e.target.value })}
                      placeholder="Or paste image URL"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="admin-form-actions" style={{ flexShrink: 0, borderTop: "1px solid var(--color-neutral-100)" }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => setIsGalleryFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn--primary">Save Gallery Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Warning Dialogs */}
      <DeleteConfirmationModal isOpen={isHeroDeleteOpen} onClose={() => setIsHeroDeleteOpen(false)} onConfirm={handleHeroConfirmDelete} itemName="banner slide" itemType="hero banner slide" />
      <DeleteConfirmationModal isOpen={isLeaderDeleteOpen} onClose={() => setIsLeaderDeleteOpen(false)} onConfirm={handleLeaderConfirmDelete} itemName={leaderToDelete?.name || ""} itemType="leader profile" />
      <DeleteConfirmationModal isOpen={isNoticeDeleteOpen} onClose={() => setIsNoticeDeleteOpen(false)} onConfirm={handleNoticeConfirmDelete} itemName={noticeToDelete?.title || ""} itemType="academic notice" />
      <DeleteConfirmationModal isOpen={isRecruiterDeleteOpen} onClose={() => setIsRecruiterDeleteOpen(false)} onConfirm={handleRecruiterConfirmDelete} itemName={recruiterToDelete?.name || ""} itemType="corporate recruiter partner" />
      <DeleteConfirmationModal isOpen={isGalleryDeleteOpen} onClose={() => setIsGalleryDeleteOpen(false)} onConfirm={handleGalleryConfirmDelete} itemName={galleryToDelete?.title || ""} itemType="homepage gallery item" />
    </div>
  );
}

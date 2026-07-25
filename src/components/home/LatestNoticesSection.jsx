import { useState, useEffect } from "react";
import { latestNotices, noticesSectionContent } from "../../data/home/notices";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { NoticeBoard } from "./NoticeBoard";
import { apiRequest } from "../../services/api/client";

export function LatestNoticesSection() {
  const [notices, setNotices] = useState(latestNotices.slice(0, 3));

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await apiRequest("/notices?limit=3");
        if (res && res.notices && res.notices.length > 0) {
          setNotices(res.notices);
        }
      } catch (err) {
        console.warn("Using fallback notices:", err);
      }
    }
    fetchNotices();
  }, []);

  return (
    <Section className="home-section notices-section" aria-labelledby="latest-notices-title">
      <Container>
        <NoticeBoard {...noticesSectionContent} notices={notices} />
      </Container>
    </Section>
  );
}

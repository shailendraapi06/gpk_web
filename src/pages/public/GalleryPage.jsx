import { useMemo, useState, useEffect } from "react";
import { Container } from "../../components/layout/Container";
import {
  FeaturedGallery,
  GalleryFilter,
  GalleryGrid,
  Lightbox
} from "../../components/gallery";
import {
  galleryCategories,
  galleryItems as defaultGalleryItems,
  galleryPageContent
} from "../../data/gallery";
import { Section } from "../../layouts/Section";
import { apiRequest } from "../../services/api/client";

const INITIAL_VISIBLE_ITEMS = 6;
const LOAD_MORE_STEP = 3;

export function GalleryPage() {
  const [items, setItems] = useState(defaultGalleryItems);
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const [activeItemId, setActiveItemId] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await apiRequest("/gallery");
        if (res && res.items && res.items.length > 0) {
          setItems(res.items);
        }
      } catch (err) {
        console.warn("Could not fetch gallery items from API:", err);
      }
    }
    fetchGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const featuredItems = useMemo(
    () => filteredItems.filter((item) => item.featured),
    [filteredItems]
  );

  const masonryItems = useMemo(
    () => filteredItems.filter((item) => !item.featured),
    [filteredItems]
  );

  const visibleItems = useMemo(
    () => masonryItems.slice(0, visibleCount),
    [masonryItems, visibleCount]
  );

  const activeIndex = filteredItems.findIndex((item) => item.id === activeItemId);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
    setActiveItemId(null);
  }

  function handlePrevious() {
    if (!filteredItems.length || activeIndex === -1) {
      return;
    }

    const previousIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItemId(filteredItems[previousIndex].id);
  }

  function handleNext() {
    if (!filteredItems.length || activeIndex === -1) {
      return;
    }

    const nextIndex = (activeIndex + 1) % filteredItems.length;
    setActiveItemId(filteredItems[nextIndex].id);
  }

  return (
    <Section className="gallery-page" aria-labelledby="gallery-page-title">
      <Container>
        <div className="gallery-page__header">
          <p className="gallery-page__eyebrow">{galleryPageContent.eyebrow}</p>
          <h1 id="gallery-page-title" className="gallery-page__title">
            {galleryPageContent.title}
          </h1>
          <p className="gallery-page__intro">{galleryPageContent.introduction}</p>
        </div>

        <div className="gallery-page__content">
          <GalleryFilter
            categories={galleryCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <FeaturedGallery items={featuredItems} onOpen={setActiveItemId} />

          <GalleryGrid items={visibleItems} onOpen={setActiveItemId} />

          {visibleCount < masonryItems.length ? (
            <div className="gallery-page__load-more">
              <button
                type="button"
                className="gallery-page__load-more-button"
                onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </Container>

      <Lightbox
        items={filteredItems}
        currentId={activeItemId}
        onClose={() => setActiveItemId(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </Section>
  );
}

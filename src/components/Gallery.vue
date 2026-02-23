<template>
  <section id="gallery" class="gallery" ref="section">
    <div class="gallery-inner" :class="{ visible: inView }">

      <!-- Section Header -->
      <div class="section-header">
        <div class="section-label">
          <span class="accent">05 —</span>
          <span class="muted">Captured Frames</span>
        </div>
        <h2 class="section-title">My <span class="accent">Gallery</span></h2>
        <p class="section-sub">Moments worth keeping. Frames worth revisiting.</p>

        <!-- Filter Pills -->
        <div class="filters">
          <button
            v-for="tag in tags"
            :key="tag"
            class="filter-pill"
            :class="{ active: activeTag === tag }"
            @click="setTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Masonry Grid -->
      <div class="masonry" ref="grid">
        <div
          class="photo-card"
          v-for="(photo, i) in filteredPhotos"
          :key="photo.id"
          :class="['span-' + photo.span]"
          :style="{ animationDelay: `${i * 0.07}s` }"
          @click="openLightbox(photo)"
        >
          <div class="photo-inner">
            <img :src="photo.src" :alt="photo.caption" loading="lazy" />
            <div class="photo-overlay">
              <div class="overlay-content">
                <p class="photo-caption">{{ photo.caption }}</p>
                <span class="photo-tag">{{ photo.tag }}</span>
              </div>
              <div class="expand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredPhotos.length === 0" class="empty-state">
        <p>📷 No frames in this collection yet.</p>
      </div>

    </div>

    <!-- Lightbox -->
    <transition name="lb-fade">
      <div v-if="lightbox" class="lightbox" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="lb-nav lb-prev" @click="prevPhoto" :disabled="lightboxIndex === 0">‹</button>
        <div class="lb-content">
          <transition name="lb-img" mode="out-in">
            <img :src="lightbox.src" :alt="lightbox.caption" :key="lightbox.id" class="lb-img" />
          </transition>
          <div class="lb-info">
            <p class="lb-caption">{{ lightbox.caption }}</p>
            <span class="lb-tag">{{ lightbox.tag }}</span>
            <span class="lb-counter">{{ lightboxIndex + 1 }} / {{ filteredPhotos.length }}</span>
          </div>
        </div>
        <button class="lb-nav lb-next" @click="nextPhoto" :disabled="lightboxIndex === filteredPhotos.length - 1">›</button>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      inView: false,
      activeTag: "All",
      lightbox: null,
      lightboxIndex: 0,

      // ─────────────────────────────────────────────
      // ADD YOUR PHOTOS HERE
      // src   → image URL or relative path (e.g. '/photos/img1.jpg')
      // caption → short description
      // tag   → category label (must match one in `tags` below)
      // span  → grid size: 1 = normal, 2 = wide, 3 = tall-wide (use sparingly)
      // ─────────────────────────────────────────────
      photos: [
        // ── aespa ──
        { id: 1,  src: "/photos/karina1.jpg",  caption: "Karina — aespa",   tag: "aespa",       span: 2 },
        { id: 2,  src: "/photos/karina2.jpg",  caption: "Karina — aespa",   tag: "aespa",       span: 1 },
        { id: 3,  src: "/photos/karina3.jpg",  caption: "Karina — aespa",   tag: "aespa",       span: 1 },
        { id: 4,  src: "/photos/winter1.jpg",  caption: "Winter — aespa",   tag: "aespa",       span: 1 },
        { id: 5,  src: "/photos/winter2.jpg",  caption: "Winter — aespa",   tag: "aespa",       span: 2 },
        { id: 6,  src: "/photos/winter3.jpg",  caption: "Winter — aespa",   tag: "aespa",       span: 1 },

        // ── Le Sserafim ──
        { id: 7,  src: "/photos/yunjin1.jpg",  caption: "Yunjin — Le Sserafim",  tag: "Le Sserafim", span: 1 },
        { id: 8,  src: "/photos/yunjin2.jpg",  caption: "Yunjin — Le Sserafim",  tag: "Le Sserafim", span: 2 },
        { id: 9,  src: "/photos/yunjin3.jpg",  caption: "Yunjin — Le Sserafim",  tag: "Le Sserafim", span: 1 },
        { id: 10, src: "/photos/chaewon1.jpg", caption: "Chaewon — Le Sserafim", tag: "Le Sserafim", span: 1 },
        { id: 11, src: "/photos/chaewon2.jpg", caption: "Chaewon — Le Sserafim", tag: "Le Sserafim", span: 1 },
        { id: 12, src: "/photos/chaewon3.jpg", caption: "Chaewon — Le Sserafim", tag: "Le Sserafim", span: 2 },

        // ── IVE ──
        { id: 13, src: "/photos/liz1.jpg",     caption: "Liz — IVE",        tag: "IVE",         span: 2 },
        { id: 14, src: "/photos/liz2.jpg",     caption: "Liz — IVE",        tag: "IVE",         span: 1 },
        { id: 15, src: "/photos/liz3.jpg",     caption: "Liz — IVE",        tag: "IVE",         span: 1 },
        { id: 16, src: "/photos/won1.jpg",     caption: "Wonyoung — IVE",   tag: "IVE",         span: 1 },
        { id: 17, src: "/photos/won2.jpg",     caption: "Wonyoung — IVE",   tag: "IVE",         span: 1 },
        { id: 18, src: "/photos/won3.jpg",     caption: "Wonyoung — IVE",   tag: "IVE",         span: 2 },
      ],

      tags: ["All", "aespa", "Le Sserafim", "IVE"],
    };
  },

  computed: {
    filteredPhotos() {
      if (this.activeTag === "All") return this.photos;
      return this.photos.filter((p) => p.tag === this.activeTag);
    },
  },

  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView = true;
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(this.$refs.section);

    // Keyboard nav for lightbox
    window.addEventListener("keydown", this.handleKey);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKey);
  },

  methods: {
    setTag(tag) {
      this.activeTag = tag;
      this.closeLightbox();
    },
    openLightbox(photo) {
      this.lightboxIndex = this.filteredPhotos.indexOf(photo);
      this.lightbox = photo;
      document.body.style.overflow = "hidden";
    },
    closeLightbox() {
      this.lightbox = null;
      document.body.style.overflow = "";
    },
    prevPhoto() {
      if (this.lightboxIndex > 0) {
        this.lightboxIndex--;
        this.lightbox = this.filteredPhotos[this.lightboxIndex];
      }
    },
    nextPhoto() {
      if (this.lightboxIndex < this.filteredPhotos.length - 1) {
        this.lightboxIndex++;
        this.lightbox = this.filteredPhotos[this.lightboxIndex];
      }
    },
    handleKey(e) {
      if (!this.lightbox) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.prevPhoto();
      if (e.key === "ArrowRight") this.nextPhoto();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* ── Section shell ── */
.gallery {
  background: #080808;
  padding: 120px 32px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

.gallery::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(29,185,84,0.25), transparent);
}

/* Ambient orb */
.gallery::after {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29,185,84,0.05) 0%, transparent 65%);
  top: -100px; right: -200px;
  pointer-events: none;
}

/* ── Entrance animation ── */
.gallery-inner {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}
.gallery-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Header ── */
.section-header {
  margin-bottom: 56px;
}
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 20px;
}
.accent { color: #1DB954; }
.muted  { color: #555; }

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -2px;
  margin: 0 0 8px;
}
.section-sub {
  color: #555;
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 32px;
}

/* ── Filter pills ── */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filter-pill {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #666;
  padding: 7px 20px;
  border-radius: 50px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
}
.filter-pill:hover {
  border-color: rgba(29,185,84,0.35);
  color: #aaa;
}
.filter-pill.active {
  background: rgba(29,185,84,0.1);
  border-color: rgba(29,185,84,0.4);
  color: #1DB954;
  box-shadow: 0 0 18px rgba(29,185,84,0.12);
}

/* ── Masonry grid ── */
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 14px;
}

/* Card spans */
.span-1 { grid-column: span 1; }
.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; grid-row: span 2; }

/* ── Photo card ── */
.photo-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  position: relative;
}
@keyframes cardIn {
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.photo-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
}

.photo-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  filter: brightness(0.88) saturate(0.9);
}

/* Overlay */
.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.82) 0%,
    rgba(0,0,0,0.2) 45%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 22px;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.overlay-content {
  transform: translateY(8px);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.photo-caption {
  color: #fff;
  font-size: 0.88rem;
  font-weight: 500;
  margin: 0 0 5px;
  line-height: 1.3;
}
.photo-tag {
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1DB954;
  font-weight: 500;
}

.expand-icon {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-end;
  transform: translateY(8px) scale(0.8);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover states */
.photo-card:hover .photo-inner img {
  transform: scale(1.06);
  filter: brightness(0.75) saturate(1.05);
}
.photo-card:hover .photo-overlay {
  opacity: 1;
}
.photo-card:hover .overlay-content {
  transform: translateY(0);
}
.photo-card:hover .expand-icon {
  transform: translateY(0) scale(1);
  background: rgba(29,185,84,0.2);
  border-color: rgba(29,185,84,0.4);
  color: #1DB954;
}

/* ── Empty state ── */
.empty-state {
  text-align: center;
  color: #444;
  padding: 80px 20px;
  font-size: 0.9rem;
}

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 5, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
}

.lb-close {
  position: absolute;
  top: 24px; right: 28px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: #aaa;
  width: 42px; height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}
.lb-close:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

.lb-nav {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #aaa;
  width: 50px; height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  line-height: 1;
  padding-bottom: 2px;
}
.lb-nav:hover:not(:disabled) {
  background: rgba(29,185,84,0.12);
  border-color: rgba(29,185,84,0.3);
  color: #1DB954;
}
.lb-nav:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.lb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  max-width: 860px;
  width: 100%;
}

.lb-img {
  max-height: 72vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: 14px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.06),
    0 30px 80px rgba(0,0,0,0.7);
}

.lb-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.lb-caption {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
}
.lb-tag {
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1DB954;
  font-weight: 500;
  background: rgba(29,185,84,0.1);
  border: 1px solid rgba(29,185,84,0.2);
  padding: 3px 10px;
  border-radius: 20px;
}
.lb-counter {
  color: #444;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
}

/* ── Transitions ── */
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.3s ease;
}
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}

.lb-img-enter-active,
.lb-img-leave-active {
  transition: all 0.25s ease;
}
.lb-img-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.lb-img-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .masonry {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 220px;
  }
  .span-3 { grid-column: span 2; }
}
@media (max-width: 560px) {
  .masonry {
    grid-template-columns: 1fr;
    grid-auto-rows: 240px;
  }
  .span-2,
  .span-3 { grid-column: span 1; }
  .lb-nav { display: none; }
}
</style>

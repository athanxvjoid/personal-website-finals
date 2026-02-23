<template>
  <section id="hero" class="hero">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="visualizer">
      <span v-for="n in 24" :key="n" class="bar" :style="{ animationDelay: `${n * 0.08}s` }"></span>
    </div>

    <div class="hero-inner">
      <div class="hero-text" :class="{ 'visible': mounted }">
        <p class="now-playing">
          <span class="dot"></span> NOW PLAYING
        </p>
        <h1 class="name">
          <span class="name-first">Patrick</span>
          <span class="name-last">Pahayupan</span>
        </h1>
        <p class="tagline">
          BSIT Sophomore · <span class="hl">WebDev</span> & <span class="hl">AppDev</span> · Asia Pacific College
        </p>
        <div class="actions">
          <button class="btn-connect" @click="toggleConnect">
            <span class="btn-icon">{{ connected ? '⏸' : '▶' }}</span>
            {{ connected ? 'Pause Connection' : 'Connect' }}
          </button>
          <a href="#about" class="btn-ghost">Read Bio →</a>
        </div>
        <p class="status-label" :class="{ active: connected }">
          <span v-if="connected">🎵 Listening to user request...</span>
          <span v-else>Status: Idle</span>
        </p>
      </div>

      <div class="hero-visual" :class="{ 'visible': mounted }">
        <div class="vinyl-wrapper">
          <div class="vinyl-ring ring-3"></div>
          <div class="vinyl-ring ring-2"></div>
          <div class="vinyl-ring ring-1"></div>
          <img
            src="https://github.com/user-attachments/assets/f1e35a73-fd88-4816-916b-8b245bc281ab"
            alt="Patrick Pahayupan"
            class="vinyl-photo"
            :class="{ 'spinning': connected }"
          />
          <div class="vinyl-center"></div>
        </div>
      </div>
    </div>

    <div class="scroll-cue">
      <span>scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      connected: false,
      mounted: false,
    }
  },
  mounted() {
    setTimeout(() => { this.mounted = true; }, 100);
  },
  methods: {
    toggleConnect() {
      this.connected = !this.connected;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

.hero {
  position: relative;
  min-height: 100vh;
  background: #080808;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 100px 32px 80px;
  font-family: 'DM Sans', sans-serif;
}

/* --- Ambient orbs --- */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(29,185,84,0.18) 0%, transparent 70%);
  top: -100px; left: -150px;
  animation: drift 12s ease-in-out infinite alternate;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(29,185,84,0.08) 0%, transparent 70%);
  bottom: -80px; right: -100px;
  animation: drift 16s ease-in-out infinite alternate-reverse;
}
.orb-3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, rgba(100,60,200,0.1) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
@keyframes drift {
  from { transform: translate(0, 0); }
  to   { transform: translate(40px, 30px); }
}

/* --- Visualizer --- */
.visualizer {
  position: absolute;
  bottom: 60px; left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 3px;
  opacity: 0.25;
  height: 40px;
}
.bar {
  width: 3px;
  background: linear-gradient(to top, #1DB954, #9be0ba);
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite alternate;
  min-height: 4px;
}
@keyframes wave {
  0%   { height: 4px; }
  100% { height: 38px; }
}

/* --- Main layout --- */
.hero-inner {
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  position: relative;
  z-index: 2;
}

/* --- Text side --- */
.hero-text {
  flex: 1;
  min-width: 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.9s cubic-bezier(0.16,1,0.3,1);
}
.hero-text.visible {
  opacity: 1;
  transform: translateY(0);
}

.now-playing {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #1DB954;
  margin-bottom: 20px;
}
.dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #1DB954;
  animation: blink 1.5s ease-in-out infinite;
  box-shadow: 0 0 8px #1DB954;
  flex-shrink: 0;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.name {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  line-height: 1;
  margin: 0 0 20px;
}
.name-first {
  display: block;
  font-size: clamp(2.8rem, 6vw, 6rem);
  color: #fff;
  letter-spacing: -2px;
}
.name-last {
  display: block;
  font-size: clamp(2.8rem, 6vw, 6rem);
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.3);
  letter-spacing: -2px;
}

.tagline {
  color: #888;
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 40px;
  line-height: 1.6;
}
.hl { color: #fff; font-weight: 500; }

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-connect {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #1DB954;
  color: #000;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(29,185,84,0.3);
}
.btn-connect:hover {
  background: #1ed760;
  transform: scale(1.04);
  box-shadow: 0 0 50px rgba(29,185,84,0.5);
}
.btn-icon { font-size: 1rem; }

.btn-ghost {
  color: #888;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding-bottom: 2px;
  transition: all 0.3s;
}
.btn-ghost:hover { color: #fff; border-color: #fff; }

.status-label {
  font-size: 0.78rem;
  color: #555;
  font-style: italic;
  transition: color 0.3s;
}
.status-label.active { color: #1DB954; }

/* --- Visual side --- */
.hero-visual {
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(30px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1) 0.2s;
}
.hero-visual.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Vinyl wrapper scales naturally with clamp */
.vinyl-wrapper {
  position: relative;
  width: clamp(220px, 28vw, 340px);
  height: clamp(220px, 28vw, 340px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(29,185,84,0.15);
  animation: rotate-ring 20s linear infinite;
}
/* Rings scale relative to wrapper via percentages */
.ring-1 { width: 100%;    height: 100%;    animation-duration: 20s; }
.ring-2 { width: 85%;     height: 85%;     animation-duration: 30s; animation-direction: reverse; }
.ring-3 { width: 112%;    height: 112%;    border-color: rgba(29,185,84,0.07); animation-duration: 40s; }

@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.vinyl-photo {
  width: 74%;
  height: 74%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 4px solid #1a1a1a;
  box-shadow:
    0 0 0 8px rgba(29,185,84,0.08),
    0 0 60px rgba(29,185,84,0.25),
    0 20px 60px rgba(0,0,0,0.8);
  transition: all 0.5s ease;
  position: relative;
  z-index: 2;
}
.vinyl-photo.spinning {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.vinyl-center {
  position: absolute;
  width: 7%; height: 7%;
  border-radius: 50%;
  background: #1DB954;
  z-index: 3;
  box-shadow: 0 0 16px #1DB954;
}

/* --- Scroll cue --- */
.scroll-cue {
  position: absolute;
  bottom: 36px; right: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  writing-mode: vertical-lr;
}
.scroll-line {
  width: 1px; height: 50px;
  background: linear-gradient(to bottom, #fff, transparent);
  animation: scroll-anim 2s ease-in-out infinite;
}
@keyframes scroll-anim {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50%       { opacity: 1;   transform: scaleY(0.5); }
}

/* --- Tablet --- */
@media (max-width: 900px) {
  .hero-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }
  .hero-visual {
    transform: none;
  }
  .actions { justify-content: center; }
  .scroll-cue { display: none; }
}

/* --- Mobile --- */
@media (max-width: 480px) {
  .hero {
    padding: 90px 24px 70px;
  }
}
</style>

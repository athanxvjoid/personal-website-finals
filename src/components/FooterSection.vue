<template>
  <footer class="footer">
    <div class="footer-glow"></div>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="brand-dot"></span>
          <span class="brand-text">Patrick<span class="accent">.</span></span>
        </div>
        <p class="footer-tagline">BSIT Sophomore · Asia Pacific College</p>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p class="footer-copy">
          &copy; 2026 Patrick Pahayupan. Produced at <span class="accent">APC</span>.
        </p>
        <p class="footer-sub">
          Built with <span class="accent">Vue.js</span> · Hosted on <span class="accent">Vercel</span> · Powered by <span class="accent">Supabase</span>
        </p>
        <div class="now-playing-bar">
          <span class="np-dot"></span>
          <span class="np-text">IT243 — WEBPROG Finals</span>
          <div class="mini-viz">
            <span v-for="n in 8" :key="n" :style="{ animationDelay: n * 0.1 + 's' }"></span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default { name: "FooterSection" }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

.footer {
  background: #050505;
  padding: 60px 32px 40px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(29,185,84,0.1);
}

.footer-glow {
  position: absolute;
  bottom: -100px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(29,185,84,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #1DB954;
  box-shadow: 0 0 10px #1DB954;
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.4); }
}

.brand-text {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: #fff;
  letter-spacing: -0.5px;
}
.accent { color: #1DB954; }

.footer-tagline {
  color: #444;
  font-size: 0.82rem;
  font-weight: 300;
  margin: 0;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  margin-bottom: 32px;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

.footer-copy {
  color: #555;
  font-size: 0.82rem;
  margin: 0;
}

.footer-sub {
  color: #333;
  font-size: 0.75rem;
  margin: 0;
}

.now-playing-bar {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 8px 18px;
  border: 1px solid rgba(29,185,84,0.15);
  border-radius: 30px;
  background: rgba(29,185,84,0.04);
}

.np-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #1DB954;
  box-shadow: 0 0 8px #1DB954;
  animation: pulse 1.5s ease-in-out infinite;
}

.np-text {
  color: #1DB954;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
}

.mini-viz {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.mini-viz span {
  display: block;
  width: 2px;
  background: #1DB954;
  border-radius: 1px;
  animation: mwave 0.9s ease-in-out infinite alternate;
  min-height: 2px;
}
@keyframes mwave {
  from { height: 2px; }
  to   { height: 12px; }
}
</style>

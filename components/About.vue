<template>
  <section id="about" class="about" ref="section">
    <div class="about-inner" :class="{ 'visible': inView }">

      <div class="section-label">
        <span class="label-num accent">02 —</span>
        <span class="label-text">Liner Notes</span>
      </div>

      <div class="about-grid">
        <!-- Left: Text -->
        <div class="about-content">
          <h2 class="section-title">About <span class="accent">Me</span></h2>
          <p class="bio-text">
            I'm a 19-year-old BSIT sophomore at <span class="hl">Asia Pacific College</span>, 
            exploring the intersection of secure systems and mobile development. 
            Like crafting a complex arrangement, I believe great code demands 
            <span class="hl">structure, creativity, and rhythm</span>.
          </p>
          <p class="bio-text">
            Currently on a <span class="hl">13-week fitness journey</span> that mirrors my approach 
            to coding — discipline, consistency, and pushing past limits.
          </p>

          <div class="goals">
            <h3 class="goals-title">Current Tracks</h3>
            <div class="goal-item" v-for="(goal, i) in goals" :key="i" :style="{ animationDelay: `${i * 0.1 + 0.3}s` }">
              <span class="goal-icon">{{ goal.icon }}</span>
              <div>
                <p class="goal-name">{{ goal.name }}</p>
                <p class="goal-desc">{{ goal.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info card -->
        <div class="info-card">
          <div class="card-glow"></div>
          <h3 class="card-title">Profile</h3>
          <div class="info-row" v-for="(item, i) in info" :key="i">
            <span class="info-key">{{ item.key }}</span>
            <span class="info-val">{{ item.val }}</span>
          </div>
          <div class="card-footer">
            <span class="status-indicator"></span>
            <span class="status-text">Available for Collabs</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      inView: false,
      goals: [
        { icon: "💪", name: "13-Week Fitness Journey", desc: "Discipline & Consistency" },
        { icon: "📱", name: "Flutter / Dart", desc: "Mobile App Development" },
        { icon: "🔒", name: "Cybersecurity", desc: "Secure Systems Design" },
      ],
      info: [
        { key: "Name",    val: "Patrick Pahayupan" },
        { key: "School",  val: "Asia Pacific College" },
        { key: "Course",  val: "BSIT — Year 2" },
        { key: "Focus",   val: "WebDev · AppDev" },
        { key: "Subject", val: "IT243 · WEBPROG" },
      ]
    }
  },
  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inView = true;
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(this.$refs.section);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

.about {
  background: #0a0a0a;
  padding: 120px 32px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(29,185,84,0.3), transparent);
}

.about-inner {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1);
}
.about-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
}
.label-num.accent { color: #1DB954; }
.label-text { color: #555; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 80px;
  align-items: start;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.4rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -2px;
  margin-bottom: 28px;
  line-height: 1;
}
.accent { color: #1DB954; }

.bio-text {
  color: #888;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 16px;
  font-weight: 300;
}
.hl { color: #d0d0d0; font-weight: 500; }

.goals { margin-top: 48px; }
.goals-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #1DB954;
  margin-bottom: 20px;
  font-weight: 700;
}

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  animation: fadeUp 0.6s ease both;
}
.goal-icon { font-size: 1.2rem; margin-top: 2px; }
.goal-name {
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  margin: 0 0 2px;
}
.goal-desc {
  color: #555;
  font-size: 0.8rem;
  margin: 0;
  font-style: italic;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* --- Info Card --- */
.info-card {
  position: relative;
  background: linear-gradient(145deg, #141414, #0f0f0f);
  border: 1px solid rgba(29,185,84,0.15);
  border-radius: 20px;
  padding: 36px 32px;
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(29,185,84,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.card-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #1DB954;
  margin-bottom: 28px;
  font-weight: 700;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 0.85rem;
}
.info-key {
  color: #555;
  font-weight: 400;
  white-space: nowrap;
  min-width: 60px;
}
.info-val {
  color: #d0d0d0;
  font-weight: 500;
  text-align: right;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(29,185,84,0.1);
}
.status-indicator {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #1DB954;
  box-shadow: 0 0 10px #1DB954;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.4); }
}
.status-text {
  color: #1DB954;
  font-size: 0.78rem;
  letter-spacing: 1px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .info-card { max-width: 100%; }
}
</style>

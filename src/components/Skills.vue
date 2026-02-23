<template>
  <section id="skills" class="skills" ref="section">
    <div class="skills-inner" :class="{ 'visible': inView }">

      <div class="section-label">
        <span class="accent">03 —</span>
        <span class="muted">Top Tracks</span>
      </div>

      <h2 class="section-title">My <span class="accent">Skills</span></h2>
      <p class="section-sub">A playlist of technologies I've been vibing with.</p>

      <div class="tracks-list">
        <div
          class="track"
          v-for="(skill, i) in skills"
          :key="i"
          :class="{ 'playing': activeTrack === i }"
          @click="setActive(i)"
          :style="{ transitionDelay: `${i * 0.06}s` }"
        >
          <div class="track-num">
            <span v-if="activeTrack !== i" class="num">{{ String(i+1).padStart(2,'0') }}</span>
            <span v-else class="eq">
              <span class="bar-s"></span><span class="bar-s"></span><span class="bar-s"></span>
            </span>
          </div>
          <div class="track-info">
            <p class="track-name">{{ skill.name }}</p>
            <p class="track-artist">{{ skill.category }}</p>
          </div>
          <div class="track-bar-wrap">
            <div class="track-bar-bg">
              <div class="track-bar-fill" :style="{ width: activeTrack === i ? skill.level + '%' : '0%' }"></div>
            </div>
            <span class="track-level">{{ skill.level }}%</span>
          </div>
          <span class="track-duration">{{ skill.time }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "Skills",
  data() {
    return {
      inView: false,
      activeTrack: 0,
      skills: [
        { name: "Cybersecurity Fundamentals", category: "Security",          level: 78, time: "3:45" },
        { name: "MySQL & Database Design",    category: "Backend / Data",    level: 82, time: "4:20" },
        { name: "Flutter (Dart)",             category: "Mobile Dev",        level: 70, time: "2:55" },
        { name: "Embedded Systems (Arduino)", category: "Hardware / IoT",    level: 65, time: "3:10" },
        { name: "HTML5 & CSS3 (Bootstrap)",   category: "Frontend",          level: 90, time: "5:00" },
        { name: "Vue.js",                     category: "Frontend Framework",level: 72, time: "4:05" },
        { name: "Supabase / REST APIs",       category: "Backend / BaaS",    level: 68, time: "3:30" },
      ]
    }
  },
  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inView = true;
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(this.$refs.section);
  },
  methods: {
    setActive(i) { this.activeTrack = i; }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

.skills {
  background: #080808;
  padding: 120px 32px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
}

.skills::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(29,185,84,0.2), transparent);
}

.skills-inner {
  max-width: 900px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1);
}
.skills-inner.visible { opacity: 1; transform: translateY(0); }

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
  margin-bottom: 48px;
}

/* --- Track list header --- */
.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.track {
  display: grid;
  grid-template-columns: 44px 1fr 200px 56px;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.5s ease both;
}

@keyframes slideIn {
  to { opacity: 1; transform: translateY(0); }
}

.track:hover {
  background: rgba(255,255,255,0.03);
}

.track.playing {
  background: rgba(29,185,84,0.06);
  border-color: rgba(29,185,84,0.15);
}

.track-num {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
}
.num {
  font-size: 0.78rem;
  color: #444;
  font-weight: 500;
  font-family: 'Syne', sans-serif;
}

/* Mini equalizer animation */
.eq {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}
.bar-s {
  width: 3px;
  background: #1DB954;
  border-radius: 1px;
  animation: eq-bounce 0.8s ease-in-out infinite alternate;
}
.bar-s:nth-child(2) { animation-delay: 0.2s; }
.bar-s:nth-child(3) { animation-delay: 0.4s; }
@keyframes eq-bounce {
  from { height: 4px; }
  to   { height: 14px; }
}

.track-info { min-width: 0; }
.track-name {
  color: #e0e0e0;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}
.track.playing .track-name { color: #1DB954; }
.track-artist {
  color: #555;
  font-size: 0.75rem;
  margin: 0;
}

.track-bar-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.track-bar-bg {
  flex: 1;
  height: 3px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  overflow: hidden;
}
.track-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1DB954, #9be0ba);
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
}
.track-level {
  color: #444;
  font-size: 0.72rem;
  font-weight: 500;
  min-width: 30px;
  text-align: right;
}

.track-duration {
  color: #444;
  font-size: 0.78rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Responsive */
@media (max-width: 768px) {
  .track {
    grid-template-columns: 36px 1fr 50px;
    gap: 12px;
  }
  .track-bar-wrap { display: none; }
  .track-duration {
    display: block;
    color: #444;
    font-size: 0.75rem;
  }
}
</style>

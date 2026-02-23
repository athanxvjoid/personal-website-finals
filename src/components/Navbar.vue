<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <a class="brand" href="#hero">
        <span class="brand-dot"></span>
        <span class="brand-text">Patrick<span class="accent">.</span></span>
      </a>

      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ 'open': menuOpen }">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links" :class="{ 'open': menuOpen }">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click="menuOpen = false">
            <span class="link-num">{{ link.num }}</span>{{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
      menuOpen: false,
      links: [
        { href: "#hero",       num: "01", label: "Home"      },
        { href: "#about",      num: "02", label: "Bio"       },
        { href: "#skills",     num: "03", label: "Tracks"    },
        { href: "#guestbook",  num: "04", label: "Guestbook" },
      ]
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isScrolled = window.scrollY > 40;
    });
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 24px 0;
  transition: all 0.4s ease;
  font-family: 'DM Sans', sans-serif;
}

.navbar.scrolled {
  padding: 14px 0;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(29, 185, 84, 0.12);
  box-shadow: 0 4px 40px rgba(0,0,0,0.6);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-dot {
  width: 10px; height: 10px;
  background: #1DB954;
  border-radius: 50%;
  box-shadow: 0 0 12px #1DB954, 0 0 24px rgba(29,185,84,0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.brand-text {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  color: #fff;
  letter-spacing: -0.5px;
}

.accent { color: #1DB954; }

.nav-links {
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 0; padding: 0;
}

.nav-links a {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links a .link-num {
  color: #1DB954;
  font-size: 0.65rem;
  font-weight: 700;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: #1DB954;
  transition: width 0.3s ease;
}

.nav-links a:hover { color: #fff; }
.nav-links a:hover::after { width: 100%; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-links {
    position: fixed;
    top: 0; right: -100%;
    width: 260px; height: 100vh;
    background: rgba(12,12,12,0.97);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 40px;
    gap: 32px;
    transition: right 0.4s cubic-bezier(0.77,0,0.175,1);
    border-left: 1px solid rgba(29,185,84,0.15);
  }

  .nav-links.open { right: 0; }

  .nav-links a { font-size: 1.1rem; }
}
</style>

<template>
  <div>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Guestbook />
    <FooterSection />
  </div>
</template>

<script>
import Navbar        from './components/Navbar.vue'
import Hero          from './components/Hero.vue'
import About         from './components/About.vue'
import Skills        from './components/Skills.vue'
import Guestbook     from './components/Guestbook.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    About,
    Skills,
    Guestbook,
    FooterSection,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #080808;
  color: #ffffff;
  scroll-behavior: smooth;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #1DB954; border-radius: 3px; }
</style>

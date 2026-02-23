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
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Guestbook from './components/Guestbook.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  components: {
    Navbar,
    Hero,
    About,
    Skills,
    Guestbook,
    FooterSection
  }
}
</script>
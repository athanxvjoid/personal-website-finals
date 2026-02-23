<template>
  <section id="guestbook" class="guestbook" ref="section">
    <div class="gb-inner" :class="{ 'visible': inView }">

      <div class="section-label">
        <span class="accent">04 —</span>
        <span class="muted">Guestbook</span>
      </div>

      <h2 class="section-title">Leave a <span class="accent">Note</span></h2>
      <p class="section-sub">Drop your thoughts. It's like signing a liner notes booklet.</p>

      <!-- Post Form -->
      <form class="gb-form" @submit.prevent="submitEntry">
        <div class="form-group full">
          <label>Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name..."
            maxlength="50"
            required
          />
        </div>
        <div class="form-group full">
          <label>Message</label>
          <textarea
            v-model="form.message"
            placeholder="Leave a message..."
            rows="4"
            maxlength="300"
            required
          ></textarea>
          <span class="char-count">{{ form.message.length }}/300</span>
        </div>
        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="!loading">✉ Post Message</span>
          <span v-else class="loading-dots">
            <span></span><span></span><span></span>
          </span>
        </button>
        <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>

      <!-- Entries -->
      <div class="entries-header">
        <span class="entries-count accent">{{ entries.length }}</span>
        <span class="muted"> messages in the book</span>
      </div>

      <div v-if="fetchLoading" class="fetch-loading">
        <span class="loading-dots"><span></span><span></span><span></span></span>
      </div>

      <div v-else class="entries-list">
        <div class="entry-card" v-for="(entry, i) in entries" :key="entry.id || i">
          <div class="entry-header">
            <div class="entry-avatar">{{ entry.name.charAt(0).toUpperCase() }}</div>
            <div>
              <p class="entry-name">{{ entry.name }}</p>
              <p class="entry-meta">{{ formatDate(entry.created_at) }}</p>
            </div>
          </div>
          <p class="entry-message">{{ entry.message }}</p>
        </div>

        <div v-if="entries.length === 0 && !fetchLoading" class="empty-state">
          <p>🎵 No notes yet. Be the first to sign!</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
const API = 'https://guestbook-api-iwgh.onrender.com/guestbook'

export default {
  name: "Guestbook",
  data() {
    return {
      inView: false,
      loading: false,
      fetchLoading: false,
      successMsg: '',
      errorMsg: '',
      form: { name: '', message: '' },
      entries: [],
    }
  },
  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.fetchEntries();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(this.$refs.section);
  },
  methods: {
    async fetchEntries() {
      this.fetchLoading = true;
      try {
        const res = await fetch(API)
        if (!res.ok) throw new Error('Failed to fetch')
        this.entries = await res.json()
      } catch (e) {
        this.errorMsg = "Could not load entries.";
        console.error('Fetch Error:', e);
      } finally {
        this.fetchLoading = false;
      }
    },

    async submitEntry() {
      if (!this.form.name.trim() || !this.form.message.trim()) return;
      this.loading = true;
      this.successMsg = '';
      this.errorMsg = '';
      try {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    this.form.name.trim(),
            message: this.form.message.trim(),
          })
        })
        if (!res.ok) throw new Error('Failed to post')
        this.form = { name: '', message: '' };
        this.successMsg = '🎵 Your note has been added to the book!';
        setTimeout(() => this.successMsg = '', 4000);
        await this.fetchEntries();
      } catch (e) {
        this.errorMsg = 'Something went wrong. Try again.';
        console.error('Insert Error:', e);
      } finally {
        this.loading = false;
      }
    },

    formatDate(iso) {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

.guestbook {
  background: #0a0a0a;
  padding: 120px 32px;
  font-family: 'DM Sans', sans-serif;
  position: relative;
}

.guestbook::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(29,185,84,0.25), transparent);
}

.gb-inner {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16,1,0.3,1);
}
.gb-inner.visible { opacity: 1; transform: translateY(0); }

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

/* --- Form --- */
.gb-form {
  background: linear-gradient(145deg, #141414, #0f0f0f);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 36px;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
}

.gb-form::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(29,185,84,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
.form-group.full { margin-bottom: 20px; }

label {
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #555;
  font-weight: 500;
}

input, textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 12px 16px;
  color: #e0e0e0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s;
  resize: none;
}

input:focus, textarea:focus {
  border-color: rgba(29,185,84,0.4);
  background: rgba(29,185,84,0.04);
  box-shadow: 0 0 0 3px rgba(29,185,84,0.08);
}

input::placeholder, textarea::placeholder { color: #444; }

.char-count {
  position: absolute;
  bottom: 10px; right: 12px;
  font-size: 0.7rem;
  color: #444;
}

.btn-submit {
  background: #1DB954;
  color: #000;
  border: none;
  padding: 14px 36px;
  border-radius: 50px;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 30px rgba(29,185,84,0.2);
  min-width: 180px;
}
.btn-submit:hover:not(:disabled) {
  background: #1ed760;
  transform: scale(1.03);
  box-shadow: 0 0 50px rgba(29,185,84,0.4);
}
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.success-msg { color: #1DB954; font-size: 0.85rem; margin-top: 14px; }
.error-msg   { color: #e74c3c; font-size: 0.85rem; margin-top: 14px; }

/* --- Loading dots --- */
.loading-dots {
  display: inline-flex;
  gap: 5px;
  align-items: center;
}
.loading-dots span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: bounce 0.8s ease-in-out infinite alternate;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  from { transform: translateY(0); }
  to   { transform: translateY(-5px); }
}

/* --- Entries --- */
.entries-header {
  font-size: 0.85rem;
  margin-bottom: 24px;
  font-weight: 500;
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entry-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 20px 24px;
  transition: all 0.3s;
  animation: fadeUp 0.5s ease both;
}
.entry-card:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(29,185,84,0.1);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.entry-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1DB954, #0d7a33);
  color: #000;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.entry-name {
  color: #e0e0e0;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 2px;
}
.entry-meta {
  color: #555;
  font-size: 0.75rem;
  margin: 0;
}

.entry-message {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
}

.empty-state {
  text-align: center;
  color: #444;
  padding: 60px 20px;
  font-size: 0.9rem;
}

.fetch-loading {
  display: flex;
  justify-content: center;
  padding: 60px;
  color: #1DB954;
}

/* Responsive */
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .gb-form { padding: 24px 20px; }
}
</style>

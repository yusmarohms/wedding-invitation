// Menunggu seluruh struktur HTML selesai dimuat sebelum mencari elemen halaman.
document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const page = document.getElementById("weddingPage");
  const openButton = document.getElementById("openInvitation");
  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");

  // Menyamakan tampilan tombol musik dengan status audio yang sebenarnya.
  function setMusicState(playing) {
    musicToggle.classList.toggle("is-playing", playing);
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicToggle.title = playing ? "Jeda musik" : "Putar musik";
    musicToggle.innerHTML = playing ? "| | <span>Musik</span>" : "♫ <span>Musik</span>";
  }

  // Memutar atau menjeda musik ketika tombol musik ditekan.
  async function toggleMusic() {
    if (music.paused) {
      try {
        await music.play();
        setMusicState(true);
      } catch (error) {
        setMusicState(false);
        alert("audio not found.");
      }
    } else {
      music.pause();
      setMusicState(false);
    }
  }

  // Saat undangan dibuka: tampilkan konten, jalankan animasi, lalu coba putar musik.
  openButton.addEventListener("click", () => {
    page.classList.remove("d-none");
    cover.classList.add("cover-opening");
    // Setelah tombol "Buka Undangan" diklik, musik diputar.
    music.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    window.setTimeout(() => {
      cover.classList.add("d-none");
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    }, 650);
  });
  musicToggle.addEventListener("click", toggleMusic);
  music.addEventListener("ended", () => setMusicState(false));
  music.addEventListener("pause", () => setMusicState(false));
  music.addEventListener("play", () => setMusicState(true));

  // ANIMASI SCROLL: IntersectionObserver mendeteksi elemen yang masuk ke layar.
  // Elemen diberi kelas is-visible agar CSS menjalankan transisi kemunculan.
  const revealTargets = document.querySelectorAll(".hero-copy, .hero-image, .intro > div, .portrait-card, .couple-copy, .story-heading, .timeline-item, .event-heading, .event-grid article, .countdown-wrap, .gallery-heading, .gallery-item, .rsvp-panel, .wishes-panel, .footer > *");
  revealTargets.forEach((element) => element.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  // COUNTDOWN: hitung selisih waktu dari sekarang hingga tanggal acara.
  // Format tanggal menggunakan zona waktu WIB (+07:00).
  const targetDate = new Date("2026-12-12T08:00:00+07:00").getTime();
  const countdownUnits = [["days", 86400000], ["hours", 3600000], ["minutes", 60000], ["seconds", 1000]];
  // Mengubah sisa milidetik menjadi hari, jam, menit, dan detik untuk ditampilkan.
  function updateCountdown() {
    const distance = Math.max(targetDate - Date.now(), 0);
    countdownUnits.forEach(([id, unit], index) => {
      const divisor = index === 1 ? 24 : 60;
      const value = index === 0 ? Math.floor(distance / unit) : Math.floor(distance / unit) % divisor;
      document.getElementById(id).textContent = String(value).padStart(2, "0");
    });
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // RSVP DEMO: mencegah reload halaman dan menampilkan konfirmasi.
  // Catatan: data tidak dikirim ke server maupun disimpan secara permanen.
  const rsvpForm = document.getElementById("rsvpForm");
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!rsvpForm.checkValidity()) { rsvpForm.reportValidity(); return; }
    rsvpForm.classList.add("d-none");
    document.getElementById("rsvpSuccess").classList.remove("d-none");
  });

  // UCAPAN TAMU: menambahkan ucapan baru ke halaman selama halaman masih terbuka.
  // Karena belum memakai database, ucapan akan hilang saat halaman di-refresh
  const wishForm = document.getElementById("wishForm");
  wishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("wishName");
    const messageInput = document.getElementById("wishMessage");
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || !message) { if (!name) nameInput.reportValidity(); else messageInput.reportValidity(); return; }
    const quote = document.createElement("blockquote");
    const text = document.createElement("p");
    const author = document.createElement("cite");
    text.textContent = `“${message}”`;
    author.textContent = name;
    quote.append(text, author);
    document.getElementById("wishList").prepend(quote);
    wishForm.reset();
  });

  // DATA GALERI: setiap item berisi URL foto dan teks alternatif (alt).
  const gallery = [
    ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", "Couple walking together outdoors"],
    ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", "Wedding rings and flowers"],
    ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85", "Wedding table details"],
    ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85", "Bride and groom celebrating"],
    ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85", "Elegant wedding reception setting"],
    ["https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85", "Wedding bouquet in soft light"],
  ];
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let currentPhoto = 0;

  // Menampilkan foto berdasarkan indeks; modulo membuat galeri berputar dari akhir ke awal.
  function showPhoto(index) {
    currentPhoto = (index + gallery.length) % gallery.length;
    const [src, alt] = gallery[currentPhoto];
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCounter.textContent = `${currentPhoto + 1} / ${gallery.length}`;
  }
  // Membuka lightbox dan mencegah halaman belakang ikut bergulir.
  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.remove("d-none");
    document.body.style.overflow = "hidden";
    document.getElementById("closeLightbox").focus();
  }
  // Menutup lightbox dan mengembalikan scroll halaman seperti semula.
  function closeLightbox() {
    lightbox.classList.add("d-none");
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
  });
  document.getElementById("prevPhoto").addEventListener("click", () => showPhoto(currentPhoto - 1));
  document.getElementById("nextPhoto").addEventListener("click", () => showPhoto(currentPhoto + 1));
  document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("d-none")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
    if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  });
});

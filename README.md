# Wedding Invitation --- Aruna & Bima

Website undangan pernikahan digital dengan desain minimalis bernuansa
**sage green** dan **cream**. Proyek ini dibuat sebagai tugas UTS mata
kuliah **Pemrograman Berbasis Platform**.

-   **Live Demo:**
    [bima-aruna.vercel.app](https://bima-aruna.vercel.app)
-   **Repository:**
    [yusmarohms/wedding-invitation](https://github.com/yusmarohms/wedding-invitation)

## Tentang Proyek

Website ini menyajikan informasi undangan pernikahan dalam satu halaman
yang dapat di-scroll. Pengunjung dapat melihat profil pasangan, cerita
cinta, jadwal dan lokasi acara, galeri foto, serta mencoba formulir RSVP
dan ucapan.

## Fitur

-   **Cover undangan** dengan tombol *Buka Undangan* dan animasi
    transisi.
-   **Background music** dengan kontrol putar/jeda.
-   **Desain responsif** untuk desktop dan perangkat mobile.
-   **Profil pasangan** dan cerita perjalanan hubungan.
-   **Detail acara** dengan jadwal, alamat, dan peta Google Maps.
-   **Countdown** menuju tanggal acara.
-   **Galeri foto** dengan lightbox, navigasi foto
    sebelumnya/berikutnya, dan tombol tutup.
-   **Animasi saat scroll** ketika elemen masuk ke area pandang.
-   **Form RSVP** untuk simulasi konfirmasi kehadiran.
-   **Form ucapan** untuk menampilkan pesan tamu pada halaman.

> **Catatan:** RSVP dan ucapan masih berupa demo sisi klien. Data tidak
> dikirim ke server atau disimpan secara permanen; ucapan yang
> ditambahkan akan hilang ketika halaman dimuat ulang. Nama, tanggal,
> dan lokasi acara juga dapat disesuaikan dengan kebutuhan.

## Teknologi

-   **HTML5** --- struktur dan konten halaman.
-   **CSS3** --- tampilan, layout, animasi, dan responsivitas.
-   **JavaScript** --- interaksi, countdown, pemutar musik, form demo,
    dan galeri.
-   **Bootstrap 5** --- stylesheet dan utilitas antarmuka.
-   **Google Fonts** --- tipografi DM Sans dan Playfair Display.
-   **Google Maps Embed** --- peta lokasi acara.
-   **Unsplash** --- gambar contoh pada bagian visual dan galeri.

## Struktur File

``` text
wedding-invitation/
├── index.html          # Struktur dan konten website
├── README.md           # Informasi mengenai aplikasi
├── style.css           # Styling, layout, dan animasi
├── script.js           # Logika interaktif website
└── wedding-music.mp3   # Background Music
```

## Cara Menjalankan Secara Lokal

1.  Clone repository:

    ``` bash
    git clone https://github.com/yusmarohms/wedding-invitation.git
    ```

2.  Masuk ke folder proyek:

    ``` bash
    cd wedding-invitation
    ```

3.  Pastikan file `index.html`, `style.css`, `script.js`, dan
    `wedding-music.mp3` tersedia.

4.  Buka `index.html` di browser. Kamu juga bisa menggunakan ekstensi
    **Live Server** di Visual Studio Code untuk menjalankan website
    melalui server lokal sederhana.

Website ini tidak memerlukan Node.js atau proses build khusus.

## Menyesuaikan Konten

Sebelum menggunakan website untuk acara sebenarnya, sesuaikan:

-   Nama pasangan dan informasi keluarga di `index.html`.
-   Tanggal, jam, alamat, dan tautan Google Maps acara.
-   Target tanggal countdown di `script.js`.
-   Foto contoh dengan foto yang sesuai.
-   File musik latar. Pastikan sumber musik memiliki izin penggunaan
    yang sesuai.

Pastikan tanggal target countdown sesuai dengan waktu acara dan zona
waktu yang digunakan.

## Catatan Fitur dan Pengembangan

-   Browser dapat membatasi pemutaran audio otomatis. Musik dicoba
    diputar setelah pengunjung menekan tombol **Buka Undangan**.
-   Jika musik tidak terdengar, periksa apakah file `wedding-music.mp3`
    tersedia dan dapat diputar.
-   Agar RSVP dan ucapan tersimpan permanen, website perlu dihubungkan
    ke layanan penyimpanan atau backend.
-   Pastikan peta dan alamat yang ditampilkan sudah benar sebelum
    membagikan undangan.

## Informasi Tugas

  Keterangan    Detail
  ------------- --------------------------------------
  Proyek        Aplikasi Website Undangan Pernikahan
  Mata Kuliah   Pemrograman Berbasis Platform
  Nama          Yusma Rohmatus Sholiha
  Kelas         TIA (2025A)
  NIM           25051204445

------------------------------------------------------------------------

Dibuat untuk keperluan pembelajaran dan tugas UTS.

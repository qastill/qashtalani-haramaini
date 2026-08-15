# Panduan SEO & GEO — qashtalani-haramaini.com

Dokumen ini mencatat apa yang **sudah dikerjakan di dalam repo** dan apa yang
**harus dikerjakan di luar repo** agar nama Dr. Qashtalani Haramaini muncul
paling atas — baik di mesin pencari klasik (Google, Bing) maupun di mesin
jawaban generatif (ChatGPT, Claude, Perplexity, Google AI Overviews).

---

## Bagian 1 — Sudah selesai di repo

### Fondasi teknis
| Berkas | Fungsi |
| --- | --- |
| `robots.txt` | Mengizinkan crawler pencarian **dan** crawler AI secara eksplisit (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, dll). Menunjuk ke sitemap. |
| `sitemap.xml` | Mendaftarkan seluruh halaman yang diindeks, lengkap dengan anotasi `hreflang` dan gambar. |
| `llms.txt` | Ringkasan terstruktur khusus untuk model bahasa: kredensial, publikasi, temuan yang bisa dikutip, dan kontak. Ini artefak GEO utama. |
| `vercel.json` | Header `Content-Type` dan cache yang benar untuk `robots.txt`, `sitemap.xml`, `llms.txt`. |

### Structured data (JSON-LD)
- `index.html` — graf lengkap: `WebSite`, `ProfilePage`, `Person` (dengan
  `jobTitle` konsultan/advisor, `knowsAbout`, `hasCredential`, `award`,
  `hasOccupation`, `sameAs`, `alumniOf`, `memberOf`), `ItemList` berisi 10
  `ScholarlyArticle`, dan `FAQPage`.
- `energy-expert.html` dan `ahli-energi.html` — `ProfilePage`,
  `BreadcrumbList`, `Person` dengan `makesOffer` (enam layanan advisory),
  dan `FAQPage`.
- `expertise.html` dan `interest.html` — `WebPage` + `BreadcrumbList`.

`Person` memakai `@id` yang sama (`https://qashtalani-haramaini.com/#person`)
di semua halaman, sehingga mesin pencari menggabungkannya menjadi **satu
entitas** — syarat untuk mendapatkan knowledge panel.

### Halaman advisory (Inggris + mode Indonesia)
- **`energy-expert.html`** (Inggris, bahasa utama) dan **`ahli-energi.html`**
  (Bahasa Indonesia) — halaman "answer-first" yang memposisikan Anda sebagai
  **konsultan energi & expert advisor**: jawaban singkat di paling atas,
  angka kunci, enam bidang advisory beserta bukti tiap bidang, daftar pihak
  yang didampingi, temuan yang bisa dikutip, tabel kredensial, dan FAQ.
- **Toggle EN/ID** ada di nav kedua halaman dan di homepage. Sengaja dibuat
  sebagai dua URL terpisah, bukan tombol yang menukar teks di satu halaman —
  crawler perlu URL berbeda per bahasa agar `hreflang` bekerja dan kedua
  bahasa terindeks. Bagi pengunjung, efeknya tetap terasa seperti "mode".
- Desainnya editorial terang (ivory + tipografi ringan + garis rambut),
  berbeda dari homepage portofolio yang gelap — lebih sesuai untuk halaman
  konsultan.
- Penekanan yang sengaja ditambahkan untuk pasar luar negeri: label
  **"Available for engagements worldwide · English & Bahasa Indonesia ·
  remote or on site"** di hero, baris **International** pada tabel
  kredensial (Monash, Griffith, IEEE, konferensi KL/Bali/Istanbul/Nagoya),
  catatan zona waktu UTC+7 yang beririsan dengan jam kerja Asia-Pasifik dan
  pagi Eropa, serta FAQ **"Does he take on international clients outside
  Indonesia?"**.
- `Person.makesOffer` berisi enam `Service` dengan `areaServed: Worldwide`
  dan `availableLanguage: [en, id]` — ini yang dibaca mesin jawaban ketika
  seseorang bertanya "siapa yang bisa saya sewa untuk ...".

### On-page
- `<title>` dan meta description ditulis ulang mengandung kata kunci target.
- `canonical`, `hreflang`, `meta robots` (`max-snippet:-1`,
  `max-image-preview:large`) di seluruh halaman.
- Bagian **FAQ** yang terlihat di `index.html`, cocok persis dengan
  `FAQPage` JSON-LD (wajib — schema tanpa konten kasat mata bisa kena
  penalti).
- `alt` gambar hero/about dilengkapi kata kunci; `width`/`height` diisi untuk
  menekan CLS.
- `index-classic.html` diberi `noindex` + canonical ke `/` supaya tidak
  bersaing sebagai konten duplikat.

---

## Bagian 2 — Harus dikerjakan di luar repo

Peringkat #1 untuk kueri seperti *"ahli transisi energi Indonesia"* tidak
ditentukan oleh kode saja. Sinyal off-site di bawah ini yang menentukan, dan
semuanya perlu dikerjakan manual.

### Prioritas 1 — verifikasi & pengindeksan (lakukan minggu ini)
1. **Google Search Console** — daftarkan `qashtalani-haramaini.com`, kirim
   `sitemap.xml`, lalu minta indexing untuk `/`, `/energy-expert.html`,
   `/ahli-energi.html`.
2. **Bing Webmaster Tools** — sama. Bing memberi makan Copilot dan sebagian
   ChatGPT search, jadi ini jalur GEO langsung.
3. Cek hasil rich result di `search.google.com/test/rich-results` untuk
   ketiga halaman utama.

### Prioritas 2 — konsistensi entitas (yang membangun knowledge panel)
Mesin pencari dan LLM mempercayai fakta yang **sama persis** di banyak
sumber independen. Samakan penulisan nama, jabatan, dan afiliasi di:
- **LinkedIn** — headline yang menyebut **"Energy Consultant & Expert
  Advisor · Energy Transition · EV · AI for Energy"** (samakan persis dengan
  `jobTitle` di JSON-LD), dan taruh `qashtalani-haramaini.com` di bagian
  website. Tulis profil LinkedIn dalam Bahasa Inggris agar terbaca perekrut
  dan klien luar negeri.
- **Google Scholar** — pastikan profil publik, foto sama, dan ada tautan ke
  situs. Ini sumber yang paling sering dikutip LLM untuk kredibilitas.
- **ORCID** — belum ada di situs. **Buat ORCID iD**, isi lengkap, lalu
  tambahkan URL-nya ke daftar `sameAs` di JSON-LD (`index.html`) dan ke
  `llms.txt`. Ini salah satu celah terbesar yang tersisa.
- **ResearchGate, Scopus, Semantic Scholar, SINTA** — klaim profil, tautkan
  ke situs, tambahkan ke `sameAs`.
- **Wikidata** — buat item untuk dirinya (peneliti dengan publikasi
  terindeks umumnya memenuhi syarat notabilitas Wikidata). Wikidata dibaca
  langsung oleh Google Knowledge Graph dan banyak LLM.
- **GitHub, YouTube** — pastikan bio menyebut peran yang sama dan menautkan
  situs.

Setiap kali profil baru dibuat, tambahkan URL-nya ke array `sameAs` pada
JSON-LD `index.html` dan ke bagian *Contact* di `llms.txt`.

### Prioritas 3 — sitasi pihak ketiga (bahan baku GEO)
LLM mengutip apa yang **orang lain** tulis tentang seseorang, bukan hanya
situs pribadinya. Yang paling berdampak:
- Wawancara atau kutipan di media energi Indonesia (Katadata, Bisnis
  Indonesia, CNBC Indonesia, Dunia Energi, Kontan).
- Artikel opini bertanda tangan tentang net metering, tarif ToU, atau
  ekosistem EV — kirim ke media yang sama.
- Profil di situs Monash / RACE for 2030 / Universitas Indonesia.
- Menjadi narasumber webinar atau panel yang halamannya bisa diindeks.
- Siaran pers PLN terkait penghargaan inovasi.

Ukurannya sederhana: kalau sebuah halaman menyebut namanya **bersama**
frasa "transisi energi", "kendaraan listrik", atau "AI energi", halaman itu
memperkuat asosiasi entitas yang dipakai LLM.

### Prioritas 4 — pemantauan
- Setiap bulan, tanyakan langsung ke ChatGPT, Claude, Perplexity, dan Gemini:
  *"Siapa ahli transisi energi di Indonesia?"*, *"Siapa peneliti ekosistem
  EV Indonesia?"*, *"Who works on AI for utilities at PLN?"* — catat apakah
  namanya muncul dan sumber apa yang dikutip.
- Pantau posisi di Search Console untuk kueri nama dan kueri non-nama.
- Kalau LLM mengutip sumber yang salah atau usang, perbaiki sumber itu —
  bukan hanya situs ini.

---

## Merawat berkas ini

Ketika ada capaian baru (publikasi, penghargaan, jabatan, profil baru):
1. Perbarui `index.html` — JSON-LD `Person` (`award`, `hasCredential`,
   `sameAs`) dan `ItemList` publikasi.
2. Perbarui `llms.txt` — bagian kredensial, rekam riset, dan temuan.
3. Perbarui `energy-expert.html` + `ahli-energi.html` — tabel kredensial dan
   angka di blok fakta.
4. Perbarui `lastmod` di `sitemap.xml` dan `dateModified` di JSON-LD.

Angka yang muncul di banyak tempat sekaligus — jumlah publikasi, sitasi,
h-index, tahun jabatan — harus **selalu sama persis** di semua berkas.
Angka yang tidak konsisten membuat LLM ragu mengutip.

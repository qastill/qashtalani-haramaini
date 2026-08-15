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
  `knowsAbout`, `hasCredential`, `award`, `hasOccupation`, `sameAs`,
  `alumniOf`, `memberOf`), `ItemList` berisi 10 `ScholarlyArticle`, dan
  `FAQPage`.
- `energy-expert.html` dan `ahli-energi.html` — `ProfilePage`,
  `BreadcrumbList`, `Person`, `FAQPage`.
- `expertise.html` dan `interest.html` — `WebPage` + `BreadcrumbList`.

`Person` memakai `@id` yang sama (`https://qashtalani-haramaini.com/#person`)
di semua halaman, sehingga mesin pencari menggabungkannya menjadi **satu
entitas** — syarat untuk mendapatkan knowledge panel.

### Halaman baru
- **`energy-expert.html`** (Inggris) dan **`ahli-energi.html`** (Indonesia) —
  halaman "answer-first": jawaban singkat di paling atas, angka kunci, tiga
  pilar keahlian (transisi energi / EV / AI energi), temuan yang bisa
  dikutip beserta sumbernya, tabel kredensial, dan FAQ. Format ini yang
  paling mudah dikutip utuh oleh LLM.
- Keduanya saling terhubung lewat `hreflang` sehingga pencarian berbahasa
  Indonesia mendarat di halaman Indonesia.

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
- **LinkedIn** — headline yang menyebut "Energy Transition · EV · AI for
  Energy", dan taruh `qashtalani-haramaini.com` di bagian website.
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

// MyKos — data contoh + logika cari, saring, urutkan, dan booking demo.
// Di versi produksi, data ini datang dari API dan ketersediaan diperbarui pemilik secara real-time.

const KOS = [
  {
    id: 1, nama: "Kos Griya Asri", kota: "Depok", area: "Margonda, 600 m dari UI",
    tipe: "Campur", harga: 1450000, rating: 4.8, ulasan: 132, sisa: 4,
    fasilitas: ["AC", "Kamar mandi dalam", "WiFi", "Parkir motor", "Dapur bersama"],
    aturan: "Jam tamu sampai 22.00. Listrik token ditanggung penyewa, air dan WiFi termasuk.",
    foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 2, nama: "Kos Putri Melati 88", kota: "Yogyakarta", area: "Seturan, 800 m dari UGM",
    tipe: "Putri", harga: 950000, rating: 4.7, ulasan: 98, sisa: 2,
    fasilitas: ["WiFi", "Kamar mandi dalam", "Dapur bersama", "Laundry"],
    aturan: "Khusus putri. Tamu lawan jenis hanya di ruang tamu sampai 21.00. Air dan WiFi termasuk.",
    foto: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 3, nama: "Dago Living", kota: "Bandung", area: "Dago, 500 m dari ITB",
    tipe: "Campur", harga: 1750000, rating: 4.9, ulasan: 211, sisa: 6,
    fasilitas: ["AC", "Kamar mandi dalam", "WiFi", "Parkir motor", "Laundry"],
    aturan: "Bebas jam pulang dengan akses kartu. Listrik, air, dan WiFi sudah termasuk.",
    foto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 4, nama: "Kos Tebet Garden", kota: "Jakarta", area: "Tebet, 1,2 km dari Stasiun Tebet",
    tipe: "Putri", harga: 2100000, rating: 4.6, ulasan: 76, sisa: 3,
    fasilitas: ["AC", "Kamar mandi dalam", "WiFi", "Dapur bersama"],
    aturan: "Khusus putri, khusus karyawan dan mahasiswi. Listrik token, air termasuk.",
    foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 5, nama: "Kos Putra Barokah", kota: "Surabaya", area: "Gebang, 700 m dari ITS",
    tipe: "Putra", harga: 900000, rating: 4.5, ulasan: 64, sisa: 8,
    fasilitas: ["WiFi", "Parkir motor", "Dapur bersama"],
    aturan: "Khusus putra. Kipas angin di setiap kamar. Air dan WiFi termasuk, listrik iuran flat Rp50 rb.",
    foto: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 6, nama: "Semarang Atas Residence", kota: "Semarang", area: "Tembalang, 400 m dari Undip",
    tipe: "Campur", harga: 1200000, rating: 4.7, ulasan: 143, sisa: 5,
    fasilitas: ["AC", "WiFi", "Parkir motor", "Laundry", "Dapur bersama"],
    aturan: "Kamar mandi luar per lantai, dibersihkan setiap hari. Semua biaya utilitas termasuk.",
    foto: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 7, nama: "Kos Eksklusif Kemang Pratama", kota: "Jakarta", area: "Kemang, dekat kawasan kantor dan kuliner",
    tipe: "Campur", harga: 2850000, rating: 4.9, ulasan: 187, sisa: 2,
    fasilitas: ["AC", "Kamar mandi dalam", "WiFi", "Parkir motor", "Laundry"],
    aturan: "Untuk profesional. Pembersihan kamar seminggu sekali termasuk. Listrik token.",
    foto: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 8, nama: "Kos Mahasiswa Lowokwaru", kota: "Malang", area: "Lowokwaru, 900 m dari UB",
    tipe: "Putra", harga: 700000, rating: 4.4, ulasan: 51, sisa: 10,
    fasilitas: ["WiFi", "Parkir motor", "Dapur bersama"],
    aturan: "Khusus putra. Harga sudah termasuk air, listrik pemakaian wajar, dan WiFi.",
    foto: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=70"
  },
  {
    id: 9, nama: "Paviliun Putri Sagan", kota: "Yogyakarta", area: "Sagan, 1 km dari UGM dan pusat kota",
    tipe: "Putri", harga: 1350000, rating: 4.8, ulasan: 119, sisa: 1,
    fasilitas: ["AC", "Kamar mandi dalam", "WiFi", "Laundry"],
    aturan: "Khusus putri, maksimal 1 orang per kamar. Semua utilitas termasuk kecuali laundry.",
    foto: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=70"
  }
];

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const grid = document.getElementById("kosGrid");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const activeFacilities = new Set();

function getFilters() {
  return {
    kota: document.getElementById("fKota").value,
    tipe: document.getElementById("fTipe").value,
    harga: Number(document.getElementById("fHarga").value || 0),
    sort: document.getElementById("fSort").value
  };
}

function render() {
  const f = getFilters();
  let list = KOS.filter((k) =>
    (!f.kota || k.kota === f.kota) &&
    (!f.tipe || k.tipe === f.tipe) &&
    (!f.harga || k.harga <= f.harga) &&
    [...activeFacilities].every((fac) => k.fasilitas.includes(fac))
  );
  if (f.sort === "murah") list.sort((a, b) => a.harga - b.harga);
  if (f.sort === "mahal") list.sort((a, b) => b.harga - a.harga);
  if (f.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  if (f.sort === "rekomendasi") list.sort((a, b) => (b.rating * Math.log(b.ulasan + 1)) - (a.rating * Math.log(a.ulasan + 1)));

  resultCount.textContent = list.length;
  emptyState.hidden = list.length > 0;
  grid.innerHTML = list.map((k) => `
    <article class="kos-card">
      <img src="${k.foto}" alt="Foto kamar ${k.nama}" width="900" height="560" loading="lazy">
      <div class="kos-body">
        <div class="kos-top">
          <div>
            <h3 class="kos-name">${k.nama}</h3>
            <p class="kos-loc">${k.area}</p>
          </div>
          <span class="badge-tipe">${k.tipe}</span>
        </div>
        <p class="kos-rating"><strong>★ ${k.rating.toFixed(1)}</strong> <span>(${k.ulasan} ulasan)</span></p>
        <p class="kos-fac">${k.fasilitas.join(" · ")}</p>
        <p class="kos-avail ${k.sisa <= 2 ? "low" : ""}">${k.sisa <= 2 ? "Hampir habis — " : ""}Sisa ${k.sisa} kamar</p>
        <div class="kos-foot">
          <p class="kos-price"><strong>${rupiah(k.harga)}</strong><span>per bulan</span></p>
          <button class="btn btn-dark btn-detail" type="button" data-detail="${k.id}">Lihat Detail</button>
        </div>
      </div>
    </article>`).join("");

  grid.querySelectorAll("[data-detail]").forEach((btn) =>
    btn.addEventListener("click", () => openDetail(Number(btn.dataset.detail)))
  );
}

// Pencarian utama
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  render();
  document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
});
["fKota", "fTipe", "fHarga", "fSort"].forEach((id) =>
  document.getElementById(id).addEventListener("change", render)
);

// Filter fasilitas (chip)
document.querySelectorAll("#facilityChips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const fac = chip.dataset.fac;
    if (activeFacilities.has(fac)) { activeFacilities.delete(fac); chip.classList.remove("active"); }
    else { activeFacilities.add(fac); chip.classList.add("active"); }
    render();
  });
});

// Reset filter
document.getElementById("resetFilter").addEventListener("click", () => {
  document.getElementById("searchForm").reset();
  activeFacilities.clear();
  document.querySelectorAll("#facilityChips .chip").forEach((c) => c.classList.remove("active"));
  render();
});

// Area populer -> saring katalog
document.querySelectorAll("[data-area]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("fKota").value = btn.dataset.area;
    render();
    document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
  });
});

// Detail + booking (dialog)
const dialog = document.getElementById("bookingDialog");
let currentKos = null;
function openDetail(id) {
  currentKos = KOS.find((k) => k.id === id);
  if (!currentKos) return;
  const durasi = Number(document.getElementById("fDurasi").value || 1);
  document.getElementById("dNama").textContent = currentKos.nama;
  const foto = document.getElementById("dFoto");
  foto.src = currentKos.foto;
  foto.alt = "Foto kamar " + currentKos.nama;
  document.getElementById("dMeta").textContent =
    `${currentKos.area} — Kos ${currentKos.tipe} — ★ ${currentKos.rating.toFixed(1)} (${currentKos.ulasan} ulasan) — Sisa ${currentKos.sisa} kamar`;
  document.getElementById("dFasilitas").textContent = "Fasilitas: " + currentKos.fasilitas.join(", ") + ".";
  document.getElementById("dAturan").textContent = currentKos.aturan;
  document.getElementById("dTotal").textContent =
    `${rupiah(currentKos.harga)} (${durasi} bulan dipilih, dibayar per bulan)`;
  document.getElementById("bookingDone").hidden = true;
  dialog.showModal();
}
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
document.getElementById("btnBooking").addEventListener("click", () => {
  document.getElementById("bookingDone").hidden = false;
});

// Form pemilik (demo)
document.getElementById("ownerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("ownerNote");
  note.textContent = "Terima kasih, pendaftaran demo diterima. Di versi produksi, tim MyKos akan menghubungimu lewat WhatsApp untuk verifikasi kos.";
  note.classList.add("success");
  e.target.reset();
});

render();

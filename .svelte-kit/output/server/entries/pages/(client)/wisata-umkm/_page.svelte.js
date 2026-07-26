import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, i as derived, o as head, t as attr_class, w as attr } from "../../../../chunks/server.js";
//#region src/lib/components/PetaWisata.svelte
function PetaWisata($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1dt5xhd", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/> `);
			$$renderer.push(`<style>
    /* Reset gaya default popup leaflet agar padding lebih rapi */
    .leaflet-popup-content-wrapper {
      padding: 0 !important;
      border-radius: 0.75rem !important;
      overflow: hidden;
    }
    .leaflet-popup-content {
      margin: 10px !important;
      line-height: normal;
    }
    .custom-wisata-icon {
      background: transparent;
      border: none;
    }
  </style>`);
		});
		$$renderer.push(`<section class="w-full bg-[#f8fcf9] py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-10"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#005c2d] mb-4">Peta Wisata &amp; UMKM Desa Mengeruda</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Jelajahi berbagai destinasi wisata dan UMKM menarik di Desa Mengeruda melalui peta interaktif di bawah ini.</p></div> <div class="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 z-0"><div class="w-full h-full z-0"></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ListWisataUmkm.svelte
function ListWisataUmkm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const dataWisata = [
			{
				id: 1,
				nama: "Wisata Air Panas Mengeruda",
				kategori: "Wisata",
				lokasi: "Mengeruda",
				harga: "Rp10.000",
				foto: "http://localhost:5173/hero-1.jpg"
			},
			{
				id: 2,
				nama: "Taman Ziarah Maria Fatima",
				kategori: "Wisata",
				lokasi: "Mengeruda",
				harga: "Gratis",
				foto: "http://localhost:5173/hero-2.png"
			},
			{
				id: 3,
				nama: "Restaurant Khas Mengeruda",
				kategori: "Restaurant",
				lokasi: "Mengeruda",
				harga: "Bervariasi",
				foto: "http://localhost:5173/hero-1.jpg"
			},
			{
				id: 4,
				nama: "Penginapan Asri Mengeruda",
				kategori: "Penginapan",
				lokasi: "Mengeruda",
				harga: "Rp150.000",
				foto: "http://localhost:5173/hero-2.png"
			}
		];
		let searchQuery = "";
		let selectedCategory = "Semua";
		const categories = [
			"Semua",
			"Kerajinan",
			"Wisata",
			"Restaurant",
			"Penginapan"
		];
		let filteredData = derived(() => dataWisata.filter((item) => {
			return item.nama.toLowerCase().includes(searchQuery.toLowerCase());
		}));
		$$renderer.push(`<section class="w-full bg-white py-16 md:py-20"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[44px] font-serif font-bold text-black mb-8 leading-tight">Wisata &amp; UMKM Desa Mengeruda</h2> <div class="flex flex-col md:flex-row gap-4 mb-6"><input type="text"${attr("value", searchQuery)} placeholder="Cari tempat wisata..." class="flex-grow border-2 border-[#00a651] rounded-full px-8 py-3.5 font-serif italic text-gray-700 text-lg outline-none focus:ring-2 focus:ring-[#00a651] focus:ring-opacity-50 transition-shadow w-full"/> <button class="bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-xl px-12 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap w-full md:w-auto">Cari</button></div> <div class="flex flex-wrap gap-4 mb-12"><!--[-->`);
		const each_array = ensure_array_like(categories);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let cat = each_array[$$index];
			$$renderer.push(`<button${attr_class(`px-8 py-2.5 rounded-full font-bold text-[17px] transition-all duration-300 border-2 border-[#00a651] ${selectedCategory === cat ? "bg-[#00a651] text-white shadow-md" : "bg-white text-[#00a651] hover:bg-green-50 hover:shadow-sm"}`)}>${escape_html(cat)}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"><!--[-->`);
		const each_array_1 = ensure_array_like(filteredData());
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			let item = each_array_1[i];
			$$renderer.push(`<div class="bg-white rounded-[28px] border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"><div class="h-[200px] md:h-[220px] w-full overflow-hidden rounded-t-[28px] rounded-b-[28px] z-10 bg-gray-100"><img${attr("src", item.foto)}${attr("alt", item.nama)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"/></div> <div class="p-5 flex-grow flex flex-col -mt-4 pt-8"><div class="flex justify-between items-center mb-4"><div class="flex items-center text-gray-800 font-serif font-semibold text-[14px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#00a651] mr-1.5"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg> ${escape_html(item.lokasi)}</div> <span class="bg-[#c8ebd6] text-[#008f45] px-3 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold">${escape_html(item.kategori)}</span></div> <h3 class="text-xl md:text-[24px] font-serif font-bold text-[#444444] mb-5 leading-tight group-hover:text-[#00a651] transition-colors duration-300">${escape_html(item.nama)}</h3> <div class="mt-auto"></div> <div class="w-auto -mx-5 h-px bg-gray-300 mb-5 mt-3"></div> <div class="flex justify-between items-center"><div><p class="text-[13px] md:text-sm font-serif text-[#444444] font-bold mb-0.5">Harga Tiket</p> <p class="text-xl md:text-[24px] font-serif font-bold text-[#008f45] leading-none">${escape_html(item.harga)}</p></div> <a href="https://maps.google.com" target="_blank" class="bg-[#00a651] hover:bg-[#008f45] text-white px-4 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg> Lokasi</a></div></div></div>`);
		}
		$$renderer.push(`<!--]--> `);
		if (filteredData().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="col-span-full text-center py-20"><p class="text-xl font-serif text-gray-500">Tidak ada tempat wisata yang cocok dengan pencarian Anda.</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="w-full border-2 border-[#00a651] rounded-[2rem] p-8 md:p-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-12 bg-white shadow-sm mt-20"><div class="w-full md:w-3/5 flex flex-col items-start"><h3 class="text-3xl md:text-4xl font-serif font-bold text-[#006430] mb-4 leading-tight">Daftarkan UMKM &amp; Tempat Wisata</h3> <p class="text-[17px] md:text-lg font-serif text-gray-800 leading-relaxed mb-8 text-justify md:text-left">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure.</p> <a href="/umkm/daftar" class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-8 py-3.5 rounded-full transition-colors shadow-md inline-block">Daftar Sekarang</a></div> <div class="w-full md:w-2/5 flex justify-center"><img src="/ilustrasi-toko.png" alt="Ilustrasi Pendaftaran UMKM" class="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain"/></div></div></div></section>`);
	});
}
//#endregion
//#region src/routes/(client)/wisata-umkm/+page.svelte
function _page($$renderer) {
	head("90b5em", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Wisata dan UMKM Desa Mengeruda</title>`);
		});
	});
	$$renderer.push(`<main class="pb-10 bg-white min-h-screen">`);
	PetaWisata($$renderer, {});
	$$renderer.push(`<!----> `);
	ListWisataUmkm($$renderer, {});
	$$renderer.push(`<!----></main>`);
}
//#endregion
export { _page as default };

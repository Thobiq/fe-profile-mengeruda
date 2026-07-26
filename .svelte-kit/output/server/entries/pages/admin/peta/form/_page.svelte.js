import "../../../../../chunks/index-server.js";
import { T as escape_html, c as store_get, i as derived, o as head, u as unsubscribe_stores, w as attr } from "../../../../../chunks/server.js";
import { t as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/api.js";
//#region src/routes/admin/peta/form/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("id"));
		let form = {
			name: "",
			category: "Fasilitas Umum",
			description: "",
			latitude: "",
			longitude: ""
		};
		let isLoading = false;
		head("1tqrfqo", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin - Form Peta Desa</title>`);
			});
			$$renderer.push(`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>`);
		});
		$$renderer.push(`<div class="max-w-6xl mx-auto pb-12"><a href="/admin/peta" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#006e33] font-bold text-[15px] mb-6 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd"></path></svg> Kembali ke Tabel Peta</a> <div class="flex flex-col lg:flex-row gap-8"><div class="w-full lg:w-[55%] flex flex-col gap-3"><div class="flex justify-between items-end"><div><h2 class="text-2xl font-serif font-bold text-[#006e33]">Pilih Lokasi di Peta</h2> <p class="text-gray-500 font-serif text-sm">Klik di mana saja untuk menempatkan penanda (Pin). Anda bisa menggeser pin tersebut untuk mengatur posisinya dengan akurat.</p></div></div> <div class="w-full h-[450px] md:h-[600px] rounded-3xl border-4 border-white shadow-xl z-10"></div> <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><div class="flex-1"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Latitude</label> <input type="text" readonly=""${attr("value", form.latitude)} placeholder="Klik peta" class="w-full bg-gray-50 rounded-lg px-3 py-2 text-gray-700 font-mono text-sm outline-none cursor-not-allowed"/></div> <div class="flex-1"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Longitude</label> <input type="text" readonly=""${attr("value", form.longitude)} placeholder="Klik peta" class="w-full bg-gray-50 rounded-lg px-3 py-2 text-gray-700 font-mono text-sm outline-none cursor-not-allowed"/></div></div></div> <div class="w-full lg:w-[45%]"><div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm sticky top-6"><h3 class="text-xl font-bold text-gray-800 mb-6 font-serif">Detail Tempat</h3> <form class="flex flex-col gap-5"><div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-bold text-sm">Nama Tempat</label> <input type="text"${attr("value", form.name)} placeholder="Contoh: Air Panas Mengeruda" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-bold text-sm">Kategori Lokasi</label> `);
		$$renderer.select({
			value: form.category,
			class: "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all bg-white"
		}, ($$renderer) => {
			$$renderer.option({ value: "Fasilitas Umum" }, ($$renderer) => {
				$$renderer.push(`Fasilitas Umum`);
			});
			$$renderer.option({ value: "Wisata" }, ($$renderer) => {
				$$renderer.push(`Wisata`);
			});
			$$renderer.option({ value: "UMKM" }, ($$renderer) => {
				$$renderer.push(`UMKM`);
			});
			$$renderer.option({ value: "Batas Desa" }, ($$renderer) => {
				$$renderer.push(`Batas Desa`);
			});
			$$renderer.option({ value: "Area Pertanian" }, ($$renderer) => {
				$$renderer.push(`Area Pertanian`);
			});
			$$renderer.option({ value: "Lainnya" }, ($$renderer) => {
				$$renderer.push(`Lainnya`);
			});
		});
		$$renderer.push(`</div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-bold text-sm">Foto / Thumbnail (Opsional)</label> <input type="file" accept="image/*" class="hidden"/>  <div class="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative group">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-400 mb-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path></svg> <span class="text-gray-500 font-medium text-sm">Pilih Gambar</span>`);
		$$renderer.push(`<!--]--></div></div> <div class="flex flex-col gap-1.5 mb-2"><label class="text-[#006e33] font-bold text-sm">Deskripsi Singkat (Opsional)</label> <textarea rows="4" placeholder="Jelaskan mengenai tempat ini..." class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all resize-none">`);
		const $$body = escape_html(form.description);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-auto">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`Simpan Data Lokasi`);
		$$renderer.push(`<!--]--></button></form></div></div></div></div>  `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

import "../../../../../chunks/index-server.js";
import { E as escape_html, a as ensure_array_like, c as store_get, i as derived, o as head, u as unsubscribe_stores, w as attr } from "../../../../../chunks/server.js";
import { t as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/api.js";
//#region src/routes/admin/apb-desa/form/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let queryYear = derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("year"));
		let selectedYear = (/* @__PURE__ */ new Date()).getFullYear();
		let isSaving = false;
		const getEmptyData = () => ({
			pelaksanaan: [
				{
					title: "Pendapatan",
					anggaran: 0,
					realisasi: 0
				},
				{
					title: "Belanja",
					anggaran: 0,
					realisasi: 0
				},
				{
					title: "Pembiayaan",
					anggaran: 0,
					realisasi: 0
				}
			],
			pendapatan: [{
				title: "Pendapatan Asli desa",
				anggaran: 0,
				realisasi: 0
			}, {
				title: "Pendapatan Transfer",
				anggaran: 0,
				realisasi: 0
			}],
			pembelanjaan: []
		});
		let formData = getEmptyData();
		head("1f4ov9x", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin - APB Desa</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-[1200px] mx-auto pb-20"><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h2 class="text-3xl font-serif font-bold text-gray-800">${escape_html(queryYear() ? "Edit Data APB Desa" : "Tambah Data APB Desa")}</h2> <p class="text-gray-500 font-serif">Kelola data Anggaran Pendapatan dan Belanja Desa</p></div> <div class="flex items-center gap-4"><a href="/admin/apb-desa" class="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors">Kembali ke Tabel</a> <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm"><label for="year" class="font-bold text-[#00a651] font-serif">Tahun APB:</label> <input type="number" id="year"${attr("value", selectedYear)}${attr("disabled", !!queryYear(), true)} class="w-24 border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#00a651] disabled:bg-gray-100 disabled:text-gray-500"/></div></div></div> `);
		{
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-8"><div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"><div class="bg-[#00a651] px-6 py-4"><h3 class="font-serif font-bold text-white text-xl">Bagian 1: Pelaksanaan Induk</h3></div> <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
			const each_array = ensure_array_like(formData.pelaksanaan);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<div class="border border-gray-200 p-4 rounded-xl"><h4 class="font-bold text-gray-800 mb-3">${escape_html(item.title)}</h4> <div class="space-y-3"><div><label class="block text-xs font-bold text-gray-500 mb-1">Anggaran (Rp)</label> <input type="number"${attr("value", item.anggaran)} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div> <div><label class="block text-xs font-bold text-gray-500 mb-1">Realisasi (Rp)</label> <input type="number"${attr("value", item.realisasi)} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"><div class="bg-[#00a651] px-6 py-4 flex justify-between items-center"><h3 class="font-serif font-bold text-white text-xl">Bagian 2: Sumber Pendapatan</h3> <button class="bg-white text-[#00a651] px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">+ Tambah</button></div> <div class="p-6">`);
			if (formData.pendapatan.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-gray-400 text-center py-4">Belum ada item pendapatan.</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
			const each_array_1 = ensure_array_like(formData.pendapatan);
			for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
				let item = each_array_1[idx];
				$$renderer.push(`<div class="border border-gray-200 p-4 rounded-xl relative group"><button class="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd"></path></svg></button> <div class="space-y-3 pt-2"><div><label class="block text-xs font-bold text-gray-500 mb-1">Nama Pendapatan</label> <input type="text"${attr("value", item.title)} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" placeholder="cth: Pendapatan Asli Desa"/></div> <div><label class="block text-xs font-bold text-gray-500 mb-1">Anggaran (Rp)</label> <input type="number"${attr("value", item.anggaran)} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div> <div><label class="block text-xs font-bold text-gray-500 mb-1">Realisasi (Rp)</label> <input type="number"${attr("value", item.realisasi)} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div></div></div> <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"><div class="bg-[#00a651] px-6 py-4 flex justify-between items-center"><h3 class="font-serif font-bold text-white text-xl">Bagian 3: Rincian Pembelanjaan</h3> <button class="bg-white text-[#00a651] px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">+ Tambah Bidang</button></div> <div class="p-6 space-y-6">`);
			if (formData.pembelanjaan.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-gray-400 text-center py-4">Belum ada item pembelanjaan.</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array_2 = ensure_array_like(formData.pembelanjaan);
			for (let bIdx = 0, $$length = each_array_2.length; bIdx < $$length; bIdx++) {
				let bidang = each_array_2[bIdx];
				$$renderer.push(`<div class="border-2 border-[#00a651]/20 rounded-xl p-5 bg-green-50/30 relative"><button class="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-white p-1 rounded-full shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd"></path></svg></button> <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6"><div class="md:col-span-6"><label class="block text-xs font-bold text-gray-500 mb-1">Nama Bidang</label> <input type="text"${attr("value", bidang.title)} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]" placeholder="cth: Bidang Penyelenggaraan Pemerintah Desa"/></div> <div class="md:col-span-3"><label class="block text-xs font-bold text-gray-500 mb-1">Total Anggaran (Rp)</label> <input type="number"${attr("value", bidang.anggaran)} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div> <div class="md:col-span-3"><label class="block text-xs font-bold text-gray-500 mb-1">Total Realisasi (Rp)</label> <input type="number"${attr("value", bidang.realisasi)} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]"/></div></div> <div class="ml-0 md:ml-6 pl-4 border-l-2 border-gray-200 space-y-4"><div class="flex items-center justify-between mb-2"><h4 class="font-bold text-gray-700">Sub Bidang</h4> <button class="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 font-bold shadow-sm">+ Sub Bidang</button></div> <!--[-->`);
				const each_array_3 = ensure_array_like(bidang.subBidangList);
				for (let sIdx = 0, $$length = each_array_3.length; sIdx < $$length; sIdx++) {
					let sub = each_array_3[sIdx];
					$$renderer.push(`<div class="bg-white border border-gray-200 rounded-lg p-4 relative"><button class="absolute top-2 right-2 text-red-500 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button> <div class="mb-4 w-full pr-8"><label class="block text-xs font-bold text-gray-500 mb-1">Judul Sub Bidang</label> <input type="text"${attr("value", sub.judul)} class="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="cth: A. Penyelenggaraan Belanja..."/></div> <div class="bg-gray-50 rounded-lg p-3"><div class="flex items-center justify-between mb-2"><h5 class="font-bold text-gray-600 text-sm">Daftar Kegiatan</h5> <button class="text-[11px] bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-100 font-bold">+ Kegiatan</button></div> <div class="space-y-2"><!--[-->`);
					const each_array_4 = ensure_array_like(sub.kegiatan);
					for (let kIdx = 0, $$length = each_array_4.length; kIdx < $$length; kIdx++) {
						let keg = each_array_4[kIdx];
						$$renderer.push(`<div class="flex items-center gap-2"><input type="text"${attr("value", keg.nama)} class="flex-grow border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="Nama Kegiatan"/> <input type="number"${attr("value", keg.anggaran)} class="w-32 border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="Anggaran"/> <button class="text-red-500 hover:text-red-700 p-1 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div>`);
					}
					$$renderer.push(`<!--]--> `);
					if (sub.kegiatan.length === 0) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="text-xs text-gray-400 italic">Belum ada kegiatan.</div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div></div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="flex justify-end pt-4"><button${attr("disabled", isSaving, true)} class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-10 py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Simpan Perubahan`);
			$$renderer.push(`<!--]--></button></div></div>`);
		}
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

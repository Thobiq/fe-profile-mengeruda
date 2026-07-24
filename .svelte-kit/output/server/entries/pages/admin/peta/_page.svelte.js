import "../../../../chunks/index-server.js";
import { o as head, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/peta/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isImporting = false;
		head("rmw1n5", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin - Peta Desa</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-[1200px] mx-auto pb-20"><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h2 class="text-3xl font-serif font-bold text-gray-800">Manajemen Peta Desa</h2> <p class="text-gray-500 font-serif">Kelola titik lokasi spasial Desa Mengeruda</p></div> <div class="flex items-center gap-3"><input type="file" accept=".json,.geojson" class="hidden"/> <button${attr("disabled", isImporting, true)} class="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2.5 rounded-xl font-bold font-serif transition-colors border border-blue-200 flex items-center gap-2 disabled:opacity-50">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path></svg> Import GeoJSON`);
		$$renderer.push(`<!--]--></button> <a href="/admin/peta/form" class="bg-[#00a651] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-xl font-bold font-serif transition-colors shadow-sm flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.02.01.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd"></path></svg> Tambah Titik</a></div></div> <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-50 border-b border-gray-200 text-gray-600 font-serif"><th class="py-4 px-6 font-bold w-20 text-center">No</th><th class="py-4 px-6 font-bold">Nama Tempat</th><th class="py-4 px-6 font-bold">Kategori</th><th class="py-4 px-6 font-bold text-center">Koordinat</th><th class="py-4 px-6 font-bold w-48 text-center">Aksi</th></tr></thead><tbody>`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<tr><td colspan="5" class="py-16 text-center text-gray-400"><svg class="animate-spin h-8 w-8 mx-auto text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></td></tr>`);
		$$renderer.push(`<!--]--></tbody></table></div></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

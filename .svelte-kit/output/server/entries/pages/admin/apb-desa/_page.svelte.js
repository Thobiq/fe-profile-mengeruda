import "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/apb-desa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("13wmric", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin - Daftar APB Desa</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-[1200px] mx-auto pb-20"><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h2 class="text-3xl font-serif font-bold text-gray-800">Daftar APB Desa</h2> <p class="text-gray-500 font-serif">Kelola rincian Anggaran Pendapatan dan Belanja Desa (APB)</p></div> <div><a href="/admin/apb-desa/form" class="bg-[#00a651] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-xl font-bold font-serif transition-colors shadow-sm flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path></svg> Tambah Data APB</a></div></div> <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-50 border-b border-gray-200 text-gray-600 font-serif"><th class="py-4 px-6 font-bold w-20 text-center">No</th><th class="py-4 px-6 font-bold">Tahun APB</th><th class="py-4 px-6 font-bold w-48 text-center">Aksi</th></tr></thead><tbody>`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<tr><td colspan="3" class="py-16 text-center text-gray-400"><svg class="animate-spin h-8 w-8 mx-auto text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></td></tr>`);
		$$renderer.push(`<!--]--></tbody></table></div></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

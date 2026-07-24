import "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/demografi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1e9hncf", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Demografi Penduduk - Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-[1200px] pb-12"><div class="mb-8"><h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Demografi Penduduk</h1> <p class="text-gray-500 mt-2 text-[17px]">Perbarui data populasi, tambahkan dusun, statistik pekerjaan, dan agama secara dinamis.</p></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex items-center justify-center p-12"><svg class="animate-spin h-8 w-8 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span class="ml-3 text-gray-600 font-medium text-lg">Memuat Data...</span></div>`);
		$$renderer.push(`<!--]--></div>  `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

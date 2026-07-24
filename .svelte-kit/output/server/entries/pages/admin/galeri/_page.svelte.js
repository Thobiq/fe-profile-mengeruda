import "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/galeri/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("16t2iyb", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Galeri Desa - Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-gray-900 font-serif">Manajemen Galeri</h1> <p class="text-gray-500 mt-1">Unggah dan kelola dokumentasi foto desa.</p></div> <button class="flex items-center gap-2 bg-[#006e33] hover:bg-[#005225] text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd"></path></svg> Unggah Foto Baru</button></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex justify-center items-center py-20"><svg class="animate-spin h-10 w-10 text-[#006e33]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

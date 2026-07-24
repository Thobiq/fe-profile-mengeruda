import "../../../../chunks/index-server.js";
import { o as head, t as attr_class } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/administrator/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1hbc9e", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Administrator - Panel Admin</title>`);
			});
		});
		$$renderer.push(`<div class="max-w-[1400px] mx-auto pb-10"><div class="mb-8"><h2 class="text-3xl font-serif font-bold text-gray-800">Manajemen Administrator</h2> <p class="text-gray-500 font-serif">Kelola daftar pengguna sistem beserta peran dan hak akses mereka.</p></div> <div class="flex gap-2 mb-6 border-b border-gray-200"><button${attr_class(`px-6 py-3 font-semibold font-serif transition-colors border-b-2 border-[#00a651] text-[#00a651]`)}>Pengguna</button> <button${attr_class(`px-6 py-3 font-semibold font-serif transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`)}>Peran &amp; Hak Akses</button></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex justify-center items-center py-20"><svg class="animate-spin h-10 w-10 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

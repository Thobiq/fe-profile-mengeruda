import "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
//#endregion
//#region src/routes/(client)/demografi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("15nln8e", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Demografi Penduduk - Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<main class="pb-20"><div class="mx-auto px-6"><div class="text-center mb-10 mt-10"><h1 class="text-3xl md:text-[42px] font-serif font-bold text-black mb-3">Demografi Penduduk</h1> <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto">Informasi lengkap mengenai karakteristik demografi penduduk Desa Mengeruda</p></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="text-center py-20 text-gray-500 font-serif">Memuat data demografi...</div>`);
		$$renderer.push(`<!--]--></main>`);
	});
}
//#endregion
export { _page as default };

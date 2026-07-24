import "../../../../../chunks/index-server.js";
import { E as escape_html, c as store_get, i as derived, o as head, u as unsubscribe_stores } from "../../../../../chunks/server.js";
import { t as page } from "../../../../../chunks/stores.js";
//#region src/routes/(client)/berita/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		derived(() => store_get($$store_subs ??= {}, "$page", page).params.slug);
		head("1wf47kd", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html("")}Berita Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<main class="w-full bg-white pb-20 pt-10"><div class="max-w-[1300px] mx-auto px-6">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex flex-col items-center justify-center py-32 text-[#00a651]"><svg class="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span class="font-serif text-lg text-gray-500">Memuat detail berita...</span></div>`);
		$$renderer.push(`<!--]--></div></main>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

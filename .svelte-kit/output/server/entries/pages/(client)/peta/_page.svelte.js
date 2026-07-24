import "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
//#region src/routes/(client)/peta/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1ry4te8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Peta Digital - Desa Mengeruda</title>`);
			});
			$$renderer.push(`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>`);
		});
		$$renderer.push(`<section class="w-full bg-white py-12 md:py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-10"><h1 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-4">Peta Digital Desa Mengeruda</h1> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Peta interaktif wilayah administratif, infrastruktur jalan, dan persebaran fasilitas desa.</p></div> <div class="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 z-0"><div class="w-full h-full z-0"></div></div></div></section>`);
	});
}
//#endregion
export { _page as default };

import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, l as stringify, n as attr_style, o as head, w as attr } from "../../../../chunks/server.js";
//#region src/routes/(client)/peta/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let locations = [];
		head("1ry4te8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Peta Digital - Desa Mengeruda</title>`);
			});
			$$renderer.push(`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>`);
		});
		$$renderer.push(`<section class="w-full bg-white py-12 md:py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-10"><h1 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-4">Peta Digital Desa Mengeruda</h1> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Peta interaktif wilayah administratif, infrastruktur jalan, dan persebaran fasilitas desa.</p></div> <div class="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 z-0"><div class="w-full h-full z-0"></div></div></div></section> `);
		if (locations.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="w-full bg-gray-50 py-16 border-t border-gray-100"><div class="max-w-[1500px] mx-auto px-6"><div class="mb-10 border-b border-gray-200 pb-4"><h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900">Daftar Titik Lokasi</h2> <p class="text-gray-600 font-sans mt-2">Temukan berbagai fasilitas, destinasi wisata, dan UMKM yang ada di Desa Mengeruda.</p></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
			const each_array = ensure_array_like(locations);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let loc = each_array[$$index];
				$$renderer.push(`<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"><div class="w-full h-48 bg-gray-100 relative">`);
				if (loc.thumbnail) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", loc.thumbnail.startsWith("http") ? loc.thumbnail : `https://api-profile.mengeruda.id${loc.thumbnail}`)}${attr("alt", loc.name)} class="w-full h-full object-cover"/>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg> <span class="text-sm font-semibold">Tanpa Gambar</span></div>`);
				}
				$$renderer.push(`<!--]--> <div class="absolute top-4 right-4"><span class="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"${attr_style(`background-color: ${stringify(loc.color)}`)}>${escape_html(loc.category)}</span></div></div> <div class="p-5 flex flex-col flex-grow"><h3 class="font-bold text-lg text-gray-900 mb-2 leading-tight">${escape_html(loc.name)}</h3> `);
				if (loc.description) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">${escape_html(loc.description)}</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="mt-auto pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500 font-mono"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-emerald-500"><path fill-rule="evenodd" d="M11.986 3H12a2 2 0 012 2v6a2 2 0 01-1.5 1.937V7A2.5 2.5 0 0010 4.5H4.063A2 2 0 016 3h5.986zM6 7a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" clip-rule="evenodd"></path></svg> ${escape_html(parseFloat(loc.latitude).toFixed(4))}, ${escape_html(parseFloat(loc.longitude).toFixed(4))}</div></div></div>`);
			}
			$$renderer.push(`<!--]--></div></div></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

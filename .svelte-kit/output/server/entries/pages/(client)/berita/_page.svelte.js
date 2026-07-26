import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, l as stringify, n as attr_style, o as head, t as attr_class, w as attr } from "../../../../chunks/server.js";
//#region src/lib/components/HeroBerita.svelte
function HeroBerita($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let beritaTerbaru = [];
		let currentIndex = 0;
		$$renderer.push(`<section class="w-full bg-white pt-12 pb-8 md:pt-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-10"><h1 class="text-3xl md:text-[44px] font-serif font-bold text-black mb-4">Berita Desa Mengeruda</h1> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex 
        deserunt reprehenderit ad anim do adipiscing aute.</p></div> <div class="relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl bg-gray-100"><!--[-->`);
		const each_array = ensure_array_like(beritaTerbaru);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let berita = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"${attr_style(`opacity: ${stringify(index === currentIndex ? 1 : 0)}; pointer-events: ${index === currentIndex ? "auto" : "none"};`)}><img${attr("src", berita.img)}${attr("alt", berita.title)} class="absolute inset-0 w-full h-full object-cover"/>  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 md:via-black/20 to-transparent"></div> <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-start justify-end h-full"><h2 class="text-white font-serif font-bold text-2xl md:text-[38px] leading-tight md:leading-snug max-w-4xl mb-6 drop-shadow-md">${escape_html(berita.title)}</h2> <a${attr("href", `/berita/${berita.slug}`)} class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-medium text-base md:text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md">Baca Selengkapnya</a></div></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 z-10"><!--[-->`);
		const each_array_1 = ensure_array_like(beritaTerbaru);
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			each_array_1[i];
			$$renderer.push(`<button${attr_class(`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-[#00a651] w-8" : "bg-white/50 hover:bg-white"}`)}${attr("aria-label", `Ke slide ${stringify(i + 1)}`)}></button>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ListBerita.svelte
function ListBerita($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let daftarBerita = [];
		let searchQuery = "";
		let currentPage = 1;
		let totalPages = 1;
		$$renderer.push(`<section class="w-full bg-white pb-20"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-8">Semua Berita</h2> <form class="flex flex-col md:flex-row gap-4 mb-12"><div class="relative flex-grow"><input type="text"${attr("value", searchQuery)} placeholder="Cari berita desa..." class="w-full border-2 border-[#00a651] rounded-full px-6 py-3.5 text-[17px] font-serif font-medium text-gray-700 outline-none focus:ring-4 focus:ring-[#00a651]/20 transition-all placeholder:font-italic placeholder:text-gray-400"/></div> <button type="submit" class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-12 py-3.5 rounded-full transition-colors duration-300 shadow-sm shrink-0">Cari</button></form> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"><!--[-->`);
		const each_array = ensure_array_like(daftarBerita);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let berita = each_array[i];
			$$renderer.push(`<a${attr("href", `/berita/${berita.slug}`)} class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"><div class="w-full h-[240px] overflow-hidden bg-gray-100"><img${attr("src", berita.img)}${attr("alt", berita.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div> <div class="p-6 flex flex-col flex-grow"><div class="mb-4"><span class="inline-flex items-center gap-1.5 bg-[#00a651] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd"></path></svg> ${escape_html(berita.date)}</span></div> <h3 class="text-[#008f45] font-serif font-bold text-xl leading-snug mb-3 group-hover:text-[#00a651] transition-colors">${escape_html(berita.title)}</h3> <p class="text-gray-600 font-serif text-[15px] leading-relaxed line-clamp-3">${escape_html(berita.excerpt)}</p></div></a>`);
		}
		$$renderer.push(`<!--]--></div> <div class="flex items-center justify-center gap-2"><button${attr("disabled", true, true)} class="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-serif text-lg">&lt;</button> <!--[-->`);
		const each_array_1 = ensure_array_like(Array(totalPages));
		for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
			each_array_1[idx];
			const pageNum = idx + 1;
			$$renderer.push(`<button${attr_class(`w-10 h-10 flex items-center justify-center rounded border font-serif text-lg transition-colors ${currentPage === pageNum ? "bg-[#00a651] text-white border-[#00a651]" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`)}>${escape_html(pageNum)}</button>`);
		}
		$$renderer.push(`<!--]--> <button${attr("disabled", true, true)} class="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-serif text-lg">></button></div></div></section>`);
	});
}
//#endregion
//#region src/routes/(client)/berita/+page.svelte
function _page($$renderer) {
	head("mibzxf", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Berita - Desa Mengeruda</title>`);
		});
	});
	$$renderer.push(`<main class="pb-20">`);
	HeroBerita($$renderer, {});
	$$renderer.push(`<!----> `);
	ListBerita($$renderer, {});
	$$renderer.push(`<!----></main>`);
}
//#endregion
export { _page as default };

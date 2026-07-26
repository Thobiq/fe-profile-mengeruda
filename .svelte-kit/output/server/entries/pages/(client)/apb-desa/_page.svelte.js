import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, o as head } from "../../../../chunks/server.js";
//#endregion
//#region src/routes/(client)/apb-desa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let availableYears = [(/* @__PURE__ */ new Date()).getFullYear()];
		let selectedYear = (/* @__PURE__ */ new Date()).getFullYear();
		head("un0z63", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>APB Desa - Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<main class="w-full bg-[#fcfcfc] py-16 min-h-screen"><div class="max-w-[1100px] mx-auto px-4 md:px-8"><div class="border border-[#00a651] rounded-[2rem] bg-white p-6 md:p-10 shadow-sm mb-16"><div class="text-center mb-10"><h1 class="text-3xl md:text-4xl font-serif font-bold text-[#006e33] mb-3">APB Desa Mengeruda ${escape_html(selectedYear)}</h1> <p class="text-gray-800 font-serif text-sm md:text-base font-bold max-w-2xl mx-auto leading-relaxed">Desa Mengruda, Kecamatan Soa, Kabupaten Ngada,<br/> Provinsi Nusa Tenggara timur</p></div> <div class="flex items-center justify-center gap-3 mb-12"><label for="tahun" class="text-xl font-bold font-serif text-[#00a651]">Tahun</label> <div class="relative">`);
		$$renderer.select({
			id: "tahun",
			value: selectedYear,
			class: "appearance-none border border-[#00a651] text-xl font-bold font-serif text-gray-800 rounded-full py-1.5 pl-6 pr-10 outline-none focus:ring-2 focus:ring-[#00a651] bg-white cursor-pointer"
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(availableYears);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let year = each_array[$$index];
				$$renderer.option({ value: year }, ($$renderer) => {
					$$renderer.push(`${escape_html(year)}`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(` <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#00a651]"><svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div></div></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex justify-center items-center py-20 text-[#00a651]"><svg class="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></main>`);
	});
}
//#endregion
export { _page as default };

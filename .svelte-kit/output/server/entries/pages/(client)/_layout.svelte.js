import "../../../chunks/index-server.js";
import { o as public_env } from "../../../chunks/internal2.js";
import { E as escape_html, a as ensure_array_like, c as store_get, t as attr_class, u as unsubscribe_stores, w as attr } from "../../../chunks/server.js";
/* empty css                  */
import { t as page } from "../../../chunks/stores.js";
//#region src/lib/components/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const navLinks = [
			{
				name: "Home",
				path: "/"
			},
			{
				name: "Profil",
				path: "/profil"
			},
			{
				name: "Pariwisata",
				path: "https://tourism.mengeruda.id/"
			},
			{
				name: "Peta",
				path: "/peta"
			},
			{
				name: "Informasi",
				path: "#",
				dropdown: [
					{
						name: "Berita",
						path: "/berita"
					},
					{
						name: "Demografi",
						path: "/demografi"
					},
					{
						name: "APB Desa",
						path: "/apb-desa"
					}
				]
			}
		];
		$$renderer.push(`<nav class="bg-white w-full shadow-sm relative z-50"><div class="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between"><a href="/" class="flex items-center gap-3 hover:opacity-90 transition-opacity"><img${attr("src", "/logo.png")} alt="Logo Desa Mengeruda" class="w-12 h-14 object-contain"/> <div class="flex flex-col"><h1 class="text-[22px] font-serif font-bold text-emerald-800 leading-tight">Desa Mengeruda</h1> <p class="text-[13px] text-gray-900 font-serif">Kab. Ngada, Nusa Tenggara Timur</p></div></a> <ul class="hidden md:flex items-center gap-7"><!--[-->`);
		const each_array = ensure_array_like(navLinks);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let link = each_array[$$index_1];
			$$renderer.push(`<li class="relative group">`);
			if (link.dropdown) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button class="flex items-center gap-1 text-[17px] font-serif transition-colors duration-200 text-black hover:text-emerald-700 outline-none">${escape_html(link.name)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path></svg></button> <div class="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"><div class="bg-white border border-gray-100 shadow-xl rounded-xl py-3 w-48 flex flex-col"><!--[-->`);
				const each_array_1 = ensure_array_like(link.dropdown);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let dropLink = each_array_1[$$index];
					$$renderer.push(`<a${attr("href", dropLink.path)}${attr_class(`px-5 py-2.5 text-[15px] font-serif transition-colors ${store_get($$store_subs ??= {}, "$page", page).url.pathname === dropLink.path ? "font-bold text-emerald-800 bg-emerald-50" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"}`)}>${escape_html(dropLink.name)}</a>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<a${attr("href", link.path)}${attr_class(`text-[17px] font-serif transition-colors duration-200 ${store_get($$store_subs ??= {}, "$page", page).url.pathname === link.path ? "font-bold text-emerald-800" : "text-black hover:text-emerald-700"}`)}>${escape_html(link.name)}</a>`);
			}
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ul> <button class="md:hidden p-2 text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors" aria-label="Toggle Menu">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>`);
		$$renderer.push(`<!--]--></button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></nav>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/DevelopmentBanner.svelte
function DevelopmentBanner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		if (public_env.PUBLIC_APP_ENV === "development") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="w-full flex justify-center pb-4 pt-2 px-6 bg-transparent"><div class="w-full max-w-[1500px] flex items-center bg-[#dcf3e2]/85 backdrop-blur-md border-[1.5px] border-[#00a651]/50 rounded-full px-6 md:px-8 py-3 md:py-3.5 gap-4 md:gap-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 md:w-11 md:h-11 text-[#00a651] shrink-0"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path></svg> <div class="flex flex-col justify-center"><h3 class="font-serif font-bold text-[#006430] text-[17px] md:text-[20px] leading-tight mb-0.5">Under Development</h3> <p class="font-serif text-[#006430] text-[14px] md:text-[16px] leading-snug">Website ini sedang dalam pengembangan, data yang tertera merupakan data dummy/contoh</p></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/(client)/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	$$renderer.push(`<div class="min-h-screen bg-gray-50"><div class="sticky top-0 z-50 w-full flex flex-col">`);
	Navbar($$renderer, {});
	$$renderer.push(`<!----> `);
	DevelopmentBanner($$renderer, {});
	$$renderer.push(`<!----></div> <main>`);
	children($$renderer);
	$$renderer.push(`<!----></main></div>`);
}
//#endregion
export { _layout as default };

import "../../../chunks/index-server.js";
import { a as ensure_array_like, l as stringify, n as attr_style, o as head, u as unsubscribe_stores, w as attr } from "../../../chunks/server.js";
import "../../../chunks/stores.js";
import "../../../chunks/api.js";
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const bgImages = ["/hero-1.jpg", "/hero-2.png"];
		let currentIndex = 0;
		let email = "";
		let password = "";
		let isLoading = false;
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login Admin - Profil Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-serif py-10 px-4"><!--[-->`);
		const each_array = ensure_array_like(bgImages);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div> <div class="relative z-10 w-full max-w-md bg-stone-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 shadow-2xl text-white"><div class="text-center mb-6"><div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 mb-3 shadow-lg"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div> <h1 class="text-2xl font-bold tracking-wide text-amber-400 font-serif">Desa Mengeruda</h1> <p class="text-xs text-stone-300 mt-1 font-sans">Portal Administrasi &amp; Profil Desa</p></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-4 font-sans"><div><label for="email" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">Email Administrator</label> <input id="email" type="email"${attr("value", email)} required="" placeholder="admin@mengeruda.id" class="w-full px-4 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition text-sm"/></div> <div><label for="password" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">Kata Sandi</label> <div class="relative"><input id="password"${attr("type", "password")}${attr("value", password)} required="" placeholder="••••••••" class="w-full pl-4 pr-11 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition text-sm"/> <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full py-3.5 mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 disabled:opacity-50 transition-all text-sm flex items-center justify-center gap-2">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span>Masuk Sekarang</span> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`);
		$$renderer.push(`<!--]--></button></form> <div class="mt-6 pt-5 border-t border-stone-800 text-center font-sans"><a href="/" class="text-xs text-stone-400 hover:text-amber-400 transition inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> <span>Kembali ke Website Utama</span></a></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

import "../../../chunks/index-server.js";
import { T as escape_html, l as stringify, o as head, u as unsubscribe_stores, w as attr } from "../../../chunks/server.js";
import "../../../chunks/stores.js";
import "../../../chunks/api.js";
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let email = "";
		let password = "";
		let isLoading = false;
		let logoUrl = "/logo.png";
		let namaDesa = "Desa Mengeruda";
		let infoWilayah = "Kabupaten Ngada, NTT";
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login Admin | Pemerintah ${escape_html(namaDesa)}</title>`);
			});
			$$renderer.push(`<link rel="icon"${attr("href", logoUrl)}/>`);
		});
		$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#005a2b] via-[#00a651] to-[#024a22] relative overflow-hidden font-['Montserrat'] px-4 py-10"><div class="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-black/15 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px); background-size: 28px 28px;"></div> <div class="relative z-10 w-full max-w-md"><div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/60"><div class="flex justify-center mb-5"><img${attr("src", logoUrl)}${attr("alt", `Logo ${stringify(namaDesa)}`)} class="h-20 md:h-24 w-auto max-w-[160px] object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"/></div> <div class="text-center mb-8"><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Pemerintah ${escape_html(namaDesa)}</h1> <p class="text-xs font-bold text-[#00a651] uppercase tracking-wider mt-1.5">Portal Manajemen &amp; Administrasi Desa</p> <p class="text-xs text-gray-400 font-medium mt-0.5">${escape_html(infoWilayah)}</p></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-5"><div><label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alamat Email</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <input id="email" type="email"${attr("value", email)} placeholder="admin@mengeruda.id" required="" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/15 transition-all text-sm font-medium"/></div></div> <div><label for="password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kata Sandi</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <input id="password"${attr("type", "password")}${attr("value", password)} placeholder="••••••••" required="" class="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/15 transition-all text-sm font-medium"/> <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00a651] transition-colors"${attr("title", "Tampilkan kata sandi")}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full py-4 px-5 bg-[#00a651] hover:bg-[#008f45] active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-[#00a651]/25 hover:shadow-xl hover:shadow-[#00a651]/35 focus:outline-none focus:ring-4 focus:ring-[#00a651]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-2">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span>Masuk ke Dasbor</span> <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l7-7m-7 7h18"></path></svg>`);
		$$renderer.push(`<!--]--></button></form> <div class="mt-8 pt-6 border-t border-gray-100 text-center"><a href="/" class="text-xs font-bold text-gray-500 hover:text-[#00a651] transition-colors inline-flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> <span>Kembali ke Website Utama</span></a></div></div> <p class="text-center text-xs text-emerald-100/80 font-medium mt-6">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Pemerintah ${escape_html(namaDesa)}. Hak Cipta Dilindungi.</p></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

import "../../../../chunks/index-server.js";
import { T as escape_html, l as stringify, o as head, u as unsubscribe_stores, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/stores.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let email = "";
		let password = "";
		let isLoading = false;
		let logoUrl = "/logo.png";
		let namaDesa = "Desa Mengeruda";
		head("18c6u1m", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login Dasbor Admin | Profil Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans"><div class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px); background-size: 24px 24px;"></div> <div class="relative z-10 w-full max-w-md mx-4"><div class="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden"><div class="px-8 pt-8 pb-6 border-b border-slate-700/50 text-center relative"><div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/95 p-2 shadow-lg shadow-emerald-500/30 mb-4 border border-slate-600/50 overflow-hidden"><img${attr("src", logoUrl)}${attr("alt", `Logo ${stringify(namaDesa)}`)} class="w-full h-full object-contain"/></div> <h1 class="text-2xl font-bold text-white tracking-tight">Pemerintah ${escape_html(namaDesa)}</h1> <p class="text-sm text-slate-400 mt-1">Portal Manajemen Profil &amp; Administrasi Desa</p></div> <div class="p-8">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-5"><div><label for="email" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Alamat Email</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <input id="email" type="email"${attr("value", email)} placeholder="admin@mengeruda.id" required="" class="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"/></div></div> <div><label for="password" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Kata Sandi</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <input id="password"${attr("type", "password")}${attr("value", password)} placeholder="••••••••" required="" class="w-full pl-11 pr-12 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"/> <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"${attr("title", "Tampilkan password")}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span>Masuk ke Dasbor</span> <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`);
		$$renderer.push(`<!--]--></button></form> <div class="mt-8 pt-6 border-t border-slate-700/50 text-center"><a href="/" class="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> <span>Kembali ke Website Utama</span></a></div></div></div> <p class="text-center text-xs text-slate-500 mt-6">© 2026 Pemerintah Desa Mengeruda, Kabupaten Ngada, NTT.</p></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };

import "../../../chunks/index-server.js";
import { o as public_env } from "../../../chunks/internal2.js";
import { T as escape_html, a as ensure_array_like, c as store_get, l as stringify, t as attr_class, u as unsubscribe_stores, w as attr } from "../../../chunks/server.js";
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
//#region src/lib/components/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let profile = {
			nama_desa: "Mengeruda",
			kecamatan: "Soa",
			kabupaten: "Ngada",
			provinsi: "Nusa Tenggara Timur",
			alamat: "Mengeruda, Kec. Soa, Kabupaten Ngada, Nusa Tenggara Tim.",
			telp: "0812-3456-7890",
			email: "pemdes@mengeruda.id",
			logo_url: "/logo.png"
		};
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		$$renderer.push(`<footer class="bg-gradient-to-b from-[#0a2e1d] to-[#061d12] text-white font-serif border-t border-emerald-900/60 relative overflow-hidden"><div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div> <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div> <div class="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"><div class="lg:col-span-4 flex flex-col space-y-5"><a href="/" class="flex items-center gap-4 group"><div class="w-16 h-16 rounded-2xl bg-white/95 p-1.5 flex items-center justify-center shadow-lg border border-amber-400/30 group-hover:scale-105 transition-transform duration-300 shrink-0"><img${attr("src", profile.logo_url)}${attr("alt", `Logo Desa ${stringify(profile.nama_desa)}`)} class="w-full h-full object-contain"/></div> <div><span class="text-xs font-sans tracking-widest uppercase text-amber-400 font-bold block">Pemerintah Desa</span> <h2 class="text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">Desa ${escape_html(profile.nama_desa)}</h2> <p class="text-sm text-white mt-0.5">Kec. ${escape_html(profile.kecamatan)}, Kab. ${escape_html(profile.kabupaten)}, Prov. ${escape_html(profile.provinsi)}</p></div></a> <p class="text-white text-sm leading-relaxed font-sans pr-4">Portal Informasi dan Pelayanan Publik Resmi Pemerintah Desa ${escape_html(profile.nama_desa)}. Mewujudkan keterbukaan informasi, pelayanan optimal, dan tata kelola desa yang transparan serta partisipatif.</p></div> <div class="lg:col-span-3 flex flex-col space-y-4"><h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">Navigasi Utama</h3> <ul class="space-y-2.5 font-sans text-sm"><li><a href="/" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Beranda Utama</a></li> <li><a href="e-surat.mengeruda.id" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Layanan Surat</a></li> <li><a href="/profil" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Profil Desa</a></li> <li><a href="https://tourism.mengeruda.id/" target="_blank" rel="noopener noreferrer" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Pariwisata &amp; UMKM</a></li> <li><a href="/peta" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Peta Desa &amp; Batas Wilayah</a></li> <li><a href="/berita" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Berita &amp; Informasi Desa</a></li> <li><a href="/demografi" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> Demografi Penduduk</a></li> <li><a href="/apb-desa" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200"><span class="text-amber-400">›</span> APB Desa &amp; Transparansi</a></li></ul></div> <div class="lg:col-span-3 flex flex-col space-y-4"><h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">Alamat Kantor Desa</h3> <div class="flex items-start gap-3 text-sm font-sans text-emerald-100/85"><div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 mt-0.5 text-amber-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg></div> <div class="leading-relaxed"><span class="font-bold text-white block mb-0.5">Kantor Desa ${escape_html(profile.nama_desa)}</span> <p>${escape_html(profile.alamat)}</p></div></div> <div class="pt-2"><a href="https://maps.app.goo.gl/2FKPwhr54yxaQDq28" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs font-sans font-bold text-amber-400 hover:text-amber-300 bg-emerald-900/60 hover:bg-emerald-800/60 px-4 py-2 rounded-xl border border-amber-500/30 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"></path></svg> Buka di Google Maps</a></div></div> <div class="lg:col-span-2 flex flex-col space-y-4"><h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">Kontak Desa</h3> <div class="space-y-4 font-sans text-sm"><div class="flex items-start gap-3"><div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 text-amber-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg></div> <div><span class="text-xs text-emerald-300 block font-semibold">No. Telepon / WA</span> <a${attr("href", `tel:${stringify(profile.telp)}`)} class="text-white hover:text-amber-400 font-bold transition-colors">${escape_html(profile.telp)}</a></div></div> <div class="flex items-start gap-3"><div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 text-amber-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg></div> <div class="min-w-0"><span class="text-xs text-emerald-300 block font-semibold">Email Resmi</span> <a${attr("href", `mailto:${stringify(profile.email)}`)} class="text-white hover:text-amber-400 font-bold transition-colors truncate block">${escape_html(profile.email)}</a></div></div></div></div></div> <div class="mt-14 pt-8 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-emerald-200/70"><p>© ${escape_html(currentYear)} Pemerintah Desa ${escape_html(profile.nama_desa)}, Kab. ${escape_html(profile.kabupaten)}, NTT. All Rights Reserved.</p> <div class="flex items-center gap-6"><a href="/login" class="hover:text-white transition-colors">Portal Admin</a> <span>•</span> <a href="/profil" class="hover:text-white transition-colors">Visi &amp; Misi</a> <span>•</span> <a href="/peta" class="hover:text-white transition-colors">Batas Wilayah</a></div></div></div></footer>`);
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
	$$renderer.push(`<div class="min-h-screen bg-gray-50 flex flex-col justify-between"><div><div class="sticky top-0 z-50 w-full flex flex-col">`);
	Navbar($$renderer, {});
	$$renderer.push(`<!----> `);
	DevelopmentBanner($$renderer, {});
	$$renderer.push(`<!----></div> <main>`);
	children($$renderer);
	$$renderer.push(`<!----></main></div> `);
	Footer($$renderer, {});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _layout as default };

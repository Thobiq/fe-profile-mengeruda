import { n as onDestroy } from "../../../../chunks/index-server.js";
import { o as head } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
import "d3-org-chart";
//#region src/routes/admin/struktur-organisasi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let perangkatList = [];
		onDestroy(() => {
			delete window.adminOrgEdit;
			delete window.adminOrgAddSub;
			delete window.adminOrgDelete;
		});
		head("11ngs8i", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Admin - Struktur Organisasi Desa</title>`);
			});
			$$renderer.push(`<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="max-w-[1400px] mx-auto pb-10 h-full flex flex-col"><div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 shrink-0"><div><h2 class="text-3xl font-serif font-bold text-gray-800">Struktur Organisasi</h2> <p class="text-gray-500 font-serif">Klik tombol pada setiap profil di bagan untuk mengedit atau menambah bawahan secara langsung.</p></div> <div><button class="bg-[#00a651] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-xl font-bold font-serif transition-colors shadow-sm flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path></svg> Tambah Data Baru</button></div></div> <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex-grow min-h-[600px] relative">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="absolute inset-0 flex items-center justify-center bg-white/80 z-10"><svg class="animate-spin h-8 w-8 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
		$$renderer.push(`<!--]--> `);
		if (perangkatList.length === 0 && false);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="w-full h-full bg-slate-50 cursor-grab active:cursor-grabbing"></div> `);
		if (perangkatList.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute bottom-6 right-6 flex flex-col gap-2 z-10"><button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path></svg></button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

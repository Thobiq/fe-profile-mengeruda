import "../../../chunks/index-server.js";
import { T as escape_html, o as head } from "../../../chunks/server.js";
import "d3-org-chart";
//#region src/routes/struktur-organisasi/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("tipieq", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Struktur Organisasi - Desa Mengeruda</title>`);
			});
			$$renderer.push(`<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<section class="min-h-screen bg-gray-50 py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="mb-10"><a href="/" class="inline-flex items-center text-[#00a651] font-semibold hover:underline mb-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg> Kembali ke Beranda</a> <h1 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Struktur Organisasi Pemerintah Desa Mengeruda</h1> <p class="text-gray-600 font-serif text-lg max-w-3xl">Visualisasi interaktif bagan hierarki tata kerja pemerintah desa. Anda dapat menggeser (pan) dan memperbesar (zoom) bagian pada struktur ini.</p></div> <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-[75vh] w-full relative overflow-hidden">`);
		if (data.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute inset-0 flex items-center justify-center text-red-500 font-medium">Gagal memuat data: ${escape_html(data.error)}</div>`);
		} else if (!data.perangkat || data.perangkat.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg> <p class="text-lg font-medium">Belum ada data struktur organisasi desa.</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="w-full h-full bg-slate-50 rounded-xl cursor-grab active:cursor-grabbing"></div> `);
		if (data.perangkat && data.perangkat.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute bottom-8 right-8 flex flex-col gap-2"><button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors" title="Zoom In"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors" title="Zoom Out"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors" title="Fit to Screen"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path></svg></button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
export { _page as default };

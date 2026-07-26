import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, i as derived, o as head, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
//#region src/routes/admin/berita/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let beritaList = [];
		let searchQuery = "";
		let sortColumn = "tanggal";
		let filteredAndSortedBerita = derived(() => () => {
			return beritaList.filter((berita) => berita.judul.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => {
				let valA = a[sortColumn];
				let valB = b[sortColumn];
				valA = a.tanggal.split("/").reverse().join("");
				valB = b.tanggal.split("/").reverse().join("");
				if (valA < valB) return 1;
				if (valA > valB) return -1;
				return 0;
			});
		});
		head("rfaxfw", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Data Berita - Admin Panel</title>`);
			});
		});
		$$renderer.push(`<div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm"><div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6"><a href="/admin/berita/tambah" class="w-full md:w-auto bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-[15px] px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd"></path></svg> Tambah</a> <div class="w-full md:w-[300px] relative"><input type="text"${attr("value", searchQuery)} placeholder="Cari data" class="w-full border border-gray-400 rounded-full px-5 py-2.5 text-[15px] outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all"/></div></div> <div class="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm"><table class="w-full text-left border-collapse min-w-[800px]"><thead class="bg-[#00a651] text-white"><tr><th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors"><div class="flex items-center gap-2">Judul Berita `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span class="text-white/40 shrink-0">↕</span>`);
		$$renderer.push(`<!--]--></div></th><th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors"><div class="flex items-center gap-2">Link Berita `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span class="text-white/40 shrink-0">↕</span>`);
		$$renderer.push(`<!--]--></div></th><th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors"><div class="flex items-center gap-2">Tanggal dibuat `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<span class="text-white shrink-0">${escape_html("▼")}</span>`);
		$$renderer.push(`<!--]--></div></th><th class="py-4 px-6 font-bold text-[15px] w-24 text-center">Aksi</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(filteredAndSortedBerita()());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let berita = each_array[$$index];
			$$renderer.push(`<tr class="border-b border-gray-100 even:bg-[#f3f4f6] odd:bg-white hover:bg-[#eaf5ef] transition-colors"><td class="py-4 px-6 text-gray-700 font-medium">${escape_html(berita.judul)}</td><td class="py-4 px-6 text-gray-500 flex items-center gap-3"><span class="truncate max-w-[250px]"${attr("title", `https://mengeruda.id/berita/${berita.slug}`)}>https://mengeruda.id/berita/${escape_html(berita.slug)}</span> <button class="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Copy link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5h.008c.14.001.281.002.421.005a3 3 0 012.734 1.608zm-1.04 11.082V21a3 3 0 01-3 3H4.5a3 3 0 01-3-3v-9.642a3 3 0 013-3h9.123c1.55 0 2.825 1.157 2.986 2.673zM5.25 13.5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clip-rule="evenodd"></path></svg></button></td><td class="py-4 px-6 text-gray-700">${escape_html(berita.tanggal)}</td><td class="py-4 px-6 flex items-center justify-center gap-3"><a${attr("href", `/admin/berita/edit/${berita.id}`)} class="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition-colors" aria-label="Edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path></svg></a> <button class="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors" aria-label="Hapus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"></path></svg></button></td></tr>`);
		}
		$$renderer.push(`<!--]-->`);
		if (filteredAndSortedBerita()().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<tr><td colspan="4" class="py-8 text-center text-gray-500 font-medium">Data berita tidak ditemukan.</td></tr>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></tbody></table></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };

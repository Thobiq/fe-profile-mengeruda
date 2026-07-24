import { o as head, w as attr } from "../../../../../chunks/server.js";
import "../../../../../chunks/api.js";
import { t as QuillEditor } from "../../../../../chunks/QuillEditor.js";
//#region src/routes/admin/berita/tambah/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let form = {
			judul: "",
			slug: "",
			content: ""
		};
		let isLoading = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1v05z6e", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Tambah Berita - Admin Panel</title>`);
				});
			});
			$$renderer.push(`<div class="max-w-4xl pb-12"><a href="/admin/berita" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#006e33] font-bold text-[15px] mb-6 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd"></path></svg> Kembali ke Daftar Berita</a> <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"><form class="flex flex-col gap-7"><div class="flex flex-col gap-2"><label class="text-[#006e33] font-extrabold text-[17px]">Banner Berita</label> <input type="file" accept="image/*" class="hidden"/>  <div class="w-full h-[250px] md:h-[300px] bg-[#e5e5e5] border border-[#34a853]/60 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#dcdcdc] transition-colors overflow-hidden relative group">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 text-gray-400 mb-2"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd"></path></svg> <span class="text-gray-600 font-bold text-lg">Klik untuk menambahkan banner</span>`);
			$$renderer.push(`<!--]--></div></div>  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2"><div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[17px]">Judul Berita</label> <input type="text"${attr("value", form.judul)} placeholder="Masukkan Judul Berita" class="w-full border border-[#34a853] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[17px]">Slug Berita</label> <input type="text"${attr("value", form.slug)} placeholder="masukkan-judul-berita" class="w-full border border-[#34a853] rounded-xl px-4 py-3.5 text-gray-800 bg-gray-50 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div></div>  <div class="flex flex-col gap-2 mt-2"><label class="text-[#006e33] font-extrabold text-[17px]">Content Berita</label> `);
			QuillEditor($$renderer, {
				get content() {
					return form.content;
				},
				set content($$value) {
					form.content = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full mt-4 bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-[19px] py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-3">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Simpan &amp; Publish`);
			$$renderer.push(`<!--]--></button></form></div></div>  `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };

import "../../../../chunks/index-server.js";
import { o as head, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/api.js";
import "../../../../chunks/profile.js";
import { t as QuillEditor } from "../../../../chunks/QuillEditor.js";
//#region src/routes/admin/profil-desa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let logoPreview = "/logo.png";
		let formInfo = {
			nama_desa: "Mengeruda",
			kecamatan: "Soa",
			kabupaten: "Ngada",
			provinsi: "Nusa Tenggara Timur",
			telp: "081234567890",
			email: "pemdes@mengeruda.id",
			alamat: "Jl. Trans Bajawa - Soa, Desa Mengeruda, Kec. Soa"
		};
		let formNarasi = {
			tentang_desa: "",
			sejarah_desa: "",
			visi_desa: "",
			misi_desa: ""
		};
		let isSavingInfo = false;
		let isSavingNarasi = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("18jwr9t", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Profil Desa - Admin Panel</title>`);
				});
			});
			$$renderer.push(`<div class="max-w-4xl flex flex-col gap-8 pb-12"><div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"><form><div class="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10 mb-10"><div class="w-36 h-36 shrink-0 rounded-full border-[1.5px] border-[#34a853] p-2 flex items-center justify-center overflow-hidden bg-white shadow-sm"><img${attr("src", logoPreview)} alt="Preview Logo Desa" class="w-full h-full object-contain"/></div> <div class="w-full flex-grow"><label class="block text-[#006e33] font-extrabold text-[16px] mb-2">Logo Desa</label> <input type="file" accept="image/*" class="w-full border border-[#34a853] rounded-xl px-4 py-2.5 text-gray-700 bg-white cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#006e33]/10 file:text-[#006e33] hover:file:bg-[#006e33]/20 transition-all outline-none focus:ring-2 focus:ring-[#006e33]/20"/></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8"><div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">Nama Desa</label> <input type="text"${attr("value", formInfo.nama_desa)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">Kecamatan</label> <input type="text"${attr("value", formInfo.kecamatan)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">Kabupaten</label> <input type="text"${attr("value", formInfo.kabupaten)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">Provinsi</label> <input type="text"${attr("value", formInfo.provinsi)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">No. Telp Desa</label> <input type="tel"${attr("value", formInfo.telp)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all"/></div> <div class="flex flex-col gap-1.5"><label class="text-[#006e33] font-extrabold text-[15px]">Email Desa</label> <input type="email"${attr("value", formInfo.email)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all"/></div> <div class="flex flex-col gap-1.5 md:col-span-2"><label class="text-[#006e33] font-extrabold text-[15px]">Alamat Kantor Desa</label> <input type="text"${attr("value", formInfo.alamat)} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required=""/></div></div> <button type="submit"${attr("disabled", isSavingInfo, true)} class="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Simpan Informasi Desa`);
			$$renderer.push(`<!--]--></button></form></div>  <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"><form class="flex flex-col gap-8"><div class="flex flex-col gap-2"><label class="text-[#006e33] font-extrabold text-[17px]">Tentang Desa</label> `);
			QuillEditor($$renderer, {
				get content() {
					return formNarasi.tentang_desa;
				},
				set content($$value) {
					formNarasi.tentang_desa = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-2"><label class="text-[#006e33] font-extrabold text-[17px]">Sejarah Desa</label> `);
			QuillEditor($$renderer, {
				get content() {
					return formNarasi.sejarah_desa;
				},
				set content($$value) {
					formNarasi.sejarah_desa = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-2"><label class="text-[#006e33] font-extrabold text-[17px]">Visi Desa</label> `);
			QuillEditor($$renderer, {
				get content() {
					return formNarasi.visi_desa;
				},
				set content($$value) {
					formNarasi.visi_desa = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-2"><label class="text-[#006e33] font-extrabold text-[17px]">Misi Desa</label> `);
			QuillEditor($$renderer, {
				get content() {
					return formNarasi.misi_desa;
				},
				set content($$value) {
					formNarasi.misi_desa = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <button type="submit"${attr("disabled", isSavingNarasi, true)} class="w-full mt-2 bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Simpan Narasi Desa`);
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

import "../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, f as html, i as derived, l as stringify, n as attr_style, o as head, w as attr } from "../../../../chunks/server.js";
import "d3-org-chart";
//#region src/lib/components/HeroProfile.svelte
function HeroProfile($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { galleries = [] } = $$props;
		let images = derived(() => galleries && galleries.length > 0 ? galleries.slice(0, 5).map((g) => g.image_path.startsWith("http") ? g.image_path : `/storage/${g.image_path.replace("/storage/", "")}`) : ["/hero-1.jpg", "/hero-2.png"]);
		let currentIndex = 0;
		$$renderer.push(`<div class="max-w-[1500px] mx-auto px-6 w-full pt-10 pb-8"><h1 class="text-center text-4xl md:text-[44px] font-serif font-bold text-black mb-10">Profil Desa Mengeruda</h1> <div class="relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl"><!--[-->`);
		const each_array = ensure_array_like(images());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ProfilTentang.svelte
function ProfilTentang($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { profile = null } = $$props;
		let sejarahDesa = derived(() => profile && profile.sejarah_desa ? profile.sejarah_desa : `<p class="text-[17px] md:text-lg font-serif text-gray-900 leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing
          aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi
          eiusmod aute cillum consequat dolore et deserunt. In consequat excepteur in velit sint commodo minim duis.
        </p>`);
		$$renderer.push(`<section class="w-full bg-white py-12 md:py-16"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-6">Tentang Desa</h2> <div class="quill-content prose prose-lg max-w-none text-gray-900 font-serif leading-relaxed text-justify marker:text-black">${html(sejarahDesa())}</div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ProfilVisiMisi.svelte
function ProfilVisiMisi($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { profile = null } = $$props;
		let visiDesa = derived(() => profile && profile.visi_desa ? profile.visi_desa : `<p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.
        </p>`);
		let misiDesa = derived(() => profile && profile.misi_desa ? profile.misi_desa : `<p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.
        </p>`);
		$$renderer.push(`<section class="w-full bg-white pb-16 md:pb-24"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-8">Visi &amp; Misi Desa</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"><div class="flex items-center gap-5 mb-6"><div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 15a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" clip-rule="evenodd"></path><circle cx="12" cy="12" r="2.25"></circle></svg></div> <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">Visi</h3></div> <div class="quill-content prose prose-lg max-w-none prose-invert text-white font-serif leading-relaxed text-justify marker:text-white">${html(visiDesa())}</div></div> <div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"><div class="flex items-center gap-5 mb-6"><div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]"><path d="M3.75 21h16.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75zM12 17.25L17.25 8h-10.5L12 17.25zM15.75 7.5V3.375a.375.375 0 00-.625-.28l-3.125 2.813a.75.75 0 01-1.004 0L7.875 3.095a.375.375 0 00-.625.28v4.125h8.5z"></path></svg></div> <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">Misi</h3></div> <div class="quill-content prose prose-lg max-w-none prose-invert text-white font-serif leading-relaxed text-justify marker:text-white">${html(misiDesa())}</div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ProfilStruktur.svelte
function ProfilStruktur($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { struktur = [] } = $$props;
		let perangkatList = derived(() => struktur || []);
		head("1jklfu0", $$renderer, ($$renderer) => {
			$$renderer.push(`<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<section class="w-full py-10"><div class="max-w-[1300px] mx-auto px-4"><div class="text-center mb-8"><h2 class="text-3xl font-serif font-bold text-[#006e33] mb-2">Struktur Organisasi</h2> <p class="text-gray-600 font-medium">Pemerintah Desa Mengeruda</p></div> <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col relative w-full h-[600px]">`);
		if (perangkatList().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg> <p class="text-lg font-medium font-serif">Belum ada data struktur organisasi.</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="w-full h-full bg-[#f8f9fa] cursor-grab active:cursor-grabbing"></div> `);
		if (perangkatList().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute bottom-6 right-6 flex flex-col gap-2 z-10"><button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg></button> <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path></svg></button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/PemerintahDesa.svelte
function PemerintahDesa($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { struktur = [] } = $$props;
		let aparat = derived(() => struktur && struktur.length > 0 ? struktur.map((s) => ({
			name: s.nama,
			role: s.jabatan,
			img: s.foto ? s.foto.startsWith("http") ? s.foto : `/storage/${s.foto}` : "/user-placeholder.png"
		})) : [
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			},
			{
				name: "Nama Aparat Desa",
				role: "Jabatan",
				img: "/user-placeholder.png"
			}
		]);
		$$renderer.push(`<section class="w-full bg-[#eef8f1] py-16 md:py-20"><div class="max-w-[1300px] mx-auto px-6"><div class="text-center mb-12"><h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#005c2d] mb-4">Pemerintah Desa</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Daftar aparatur pemerintah desa yang bertugas melayani masyarakat Desa Mengeruda.</p></div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center"><!--[-->`);
		const each_array = ensure_array_like(aparat());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let person = each_array[$$index];
			$$renderer.push(`<div class="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"><div class="h-[280px] w-full flex items-end justify-center pt-6 bg-white"><img${attr("src", person.img)}${attr("alt", person.name)} class="object-cover h-full drop-shadow-md"/></div> <div class="bg-gradient-to-b from-[#00a651] to-[#005c2d] p-5 text-center flex-grow flex flex-col justify-between rounded-t-lg"><h3 class="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-4">${escape_html(person.name)}</h3> <div class="mt-auto"><span class="inline-block bg-white text-[#008f45] font-bold text-[13px] md:text-sm px-5 py-1.5 rounded-full shadow-sm">${escape_html(person.role)}</span></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/routes/(client)/profil/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("i1m2tq", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Profil - Desa Mengeruda</title>`);
			});
		});
		HeroProfile($$renderer, { galleries: data.galleries });
		$$renderer.push(`<!----> <main class="pb-10">`);
		ProfilTentang($$renderer, { profile: data.villageProfile });
		$$renderer.push(`<!----> `);
		ProfilVisiMisi($$renderer, { profile: data.villageProfile });
		$$renderer.push(`<!----> `);
		ProfilStruktur($$renderer, { struktur: data.strukturDesa });
		$$renderer.push(`<!----> `);
		PemerintahDesa($$renderer, { struktur: data.strukturDesa });
		$$renderer.push(`<!----></main>`);
	});
}
//#endregion
export { _page as default };

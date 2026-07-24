import { C as attr, a as head, c as stringify, i as ensure_array_like, n as attr_style, w as escape_html } from "../../../../chunks/server.js";
//#region src/lib/components/HeroProfile.svelte
function HeroProfile($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const images = ["/hero-1.jpg", "/hero-2.png"];
		let currentIndex = 0;
		$$renderer.push(`<div class="max-w-[1500px] mx-auto px-6 w-full pt-10 pb-8"><h1 class="text-center text-4xl md:text-[44px] font-serif font-bold text-black mb-10">Profil Desa Mengeruda</h1> <div class="relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl"><!--[-->`);
		const each_array = ensure_array_like(images);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ProfilTentang.svelte
function ProfilTentang($$renderer) {
	$$renderer.push(`<section class="w-full bg-white py-12 md:py-16"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-6">Tentang Desa</h2> <p class="text-[17px] md:text-lg font-serif text-gray-900 leading-relaxed text-justify">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing
      aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi
      eiusmod aute cillum consequat dolore et deserunt. In consequat excepteur in velit sint commodo minim duis.
      Lorem ipsum dolor sit amet, proident culpa exercitation sunt occaecat. Id ullamco ut laboris ut esse qui ut. Elit
      officia consectetur aliqua id duis et magna. Lorem ipsum dolor sit amet, proident culpa exercitation sunt occaecat.
      Id ullamco ut laboris ut esse qui ut. Elit officia consectetur aliqua id duis et magna.</p></div></section>`);
}
//#endregion
//#region src/lib/components/ProfilVisiMisi.svelte
function ProfilVisiMisi($$renderer) {
	$$renderer.push(`<section class="w-full bg-white pb-16 md:pb-24"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-8">Visi &amp; Misi Desa</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"><div class="flex items-center gap-5 mb-6"><div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 15a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" clip-rule="evenodd"></path><circle cx="12" cy="12" r="2.25"></circle></svg></div> <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">Visi</h3></div> <p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.</p></div> <div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"><div class="flex items-center gap-5 mb-6"><div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]"><path d="M3.75 21h16.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75zM12 17.25L17.25 8h-10.5L12 17.25zM15.75 7.5V3.375a.375.375 0 00-.625-.28l-3.125 2.813a.75.75 0 01-1.004 0L7.875 3.095a.375.375 0 00-.625.28v4.125h8.5z"></path></svg></div> <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">Misi</h3></div> <p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.</p></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/ProfilStruktur.svelte
function orgCard($$renderer, person) {
	$$renderer.push(`<div class="bg-white border border-gray-100 rounded-[20px] p-5 flex items-center gap-5 w-full md:w-[340px] shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#00a651] transition-all duration-300 z-10 relative"><img${attr("src", person.img)}${attr("alt", person.name)} class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover bg-gray-50 border border-gray-100"/> <div class="flex flex-col"><h3 class="font-serif font-bold text-[17px] md:text-lg text-black leading-tight mb-0.5">${escape_html(person.name)}</h3> <p class="font-serif text-[14px] md:text-[15px] text-gray-600">${escape_html(person.role)}</p></div></div>`);
}
function ProfilStruktur($$renderer) {
	const struktur = {
		top: {
			name: "Nama Aparat Desa",
			role: "Jabatan",
			img: "/user-placeholder.png"
		},
		middleLeft: {
			name: "Nama Aparat Desa",
			role: "Jabatan",
			img: "/user-placeholder.png"
		},
		middleRight: {
			name: "Nama Aparat Desa",
			role: "Jabatan",
			img: "/user-placeholder.png"
		},
		bottomLeft: {
			name: "Nama Aparat Desa",
			role: "Jabatan",
			img: "/user-placeholder.png"
		},
		bottomRight: {
			name: "Nama Aparat Desa",
			role: "Jabatan",
			img: "/user-placeholder.png"
		}
	};
	$$renderer.push(`<section class="w-full bg-gray-50/30 py-16 md:py-20"><div class="max-w-[1500px] mx-auto px-6"><h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-10 md:mb-16">Struktur Pemerintah Desa</h2> <div class="flex flex-col items-center w-full gap-5 md:gap-0">`);
	orgCard($$renderer, struktur.top);
	$$renderer.push(`<!----> <div class="hidden md:block w-px h-10 bg-gray-300"></div> <div class="flex flex-col md:flex-row items-center w-full max-w-4xl relative gap-5 md:gap-0"><div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 z-0"></div> <div class="w-full md:w-1/2 flex justify-center md:justify-end md:pr-12 relative"><div class="hidden md:block absolute top-1/2 right-0 w-12 h-px bg-gray-300 z-0"></div> `);
	orgCard($$renderer, struktur.middleLeft);
	$$renderer.push(`<!----></div> <div class="w-full md:w-1/2 flex justify-center md:justify-start md:pl-12 relative"><div class="hidden md:block absolute top-1/2 left-0 w-12 h-px bg-gray-300 z-0"></div> `);
	orgCard($$renderer, struktur.middleRight);
	$$renderer.push(`<!----></div></div> <div class="hidden md:block w-px h-10 bg-gray-300"></div> <div class="flex flex-col md:flex-row items-center w-full max-w-4xl relative gap-5 md:gap-0"><div class="hidden md:block absolute left-1/2 top-0 bottom-1/2 w-px bg-gray-300 -translate-x-1/2 z-0"></div> <div class="w-full md:w-1/2 flex justify-center md:justify-end md:pr-12 relative"><div class="hidden md:block absolute top-1/2 right-0 w-12 h-px bg-gray-300 z-0"></div> `);
	orgCard($$renderer, struktur.bottomLeft);
	$$renderer.push(`<!----></div> <div class="w-full md:w-1/2 flex justify-center md:justify-start md:pl-12 relative"><div class="hidden md:block absolute top-1/2 left-0 w-12 h-px bg-gray-300 z-0"></div> `);
	orgCard($$renderer, struktur.bottomRight);
	$$renderer.push(`<!----></div></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/PemerintahDesa.svelte
function PemerintahDesa($$renderer) {
	const aparat = [
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
	];
	$$renderer.push(`<section class="w-full bg-[#eef8f1] py-16 md:py-20"><div class="max-w-[1300px] mx-auto px-6"><div class="text-center mb-12"><h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#005c2d] mb-4">Pemerintah Desa</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
        reprehenderit ad anim do adipiscing aute.</p></div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center"><!--[-->`);
	const each_array = ensure_array_like(aparat);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let person = each_array[$$index];
		$$renderer.push(`<div class="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"><div class="h-[280px] w-full flex items-end justify-center pt-6 bg-white"><img${attr("src", person.img)}${attr("alt", person.name)} class="object-cover h-full drop-shadow-md"/></div> <div class="bg-gradient-to-b from-[#00a651] to-[#005c2d] p-5 text-center flex-grow flex flex-col justify-between rounded-t-lg"><h3 class="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-4">${escape_html(person.name)}</h3> <div class="mt-auto"><span class="inline-block bg-white text-[#008f45] font-bold text-[13px] md:text-sm px-5 py-1.5 rounded-full shadow-sm">${escape_html(person.role)}</span></div></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
//#region src/routes/(client)/profil/+page.svelte
function _page($$renderer) {
	head("i1m2tq", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Profil - Desa Mengeruda</title>`);
		});
	});
	HeroProfile($$renderer, {});
	$$renderer.push(`<!----> <main class="pb-10">`);
	ProfilTentang($$renderer, {});
	$$renderer.push(`<!----> `);
	ProfilVisiMisi($$renderer, {});
	$$renderer.push(`<!----> `);
	ProfilStruktur($$renderer, {});
	$$renderer.push(`<!----> `);
	PemerintahDesa($$renderer, {});
	$$renderer.push(`<!----></main>`);
}
//#endregion
export { _page as default };

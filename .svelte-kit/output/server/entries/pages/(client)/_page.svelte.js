import { T as escape_html, a as ensure_array_like, f as html, i as derived, l as stringify, n as attr_style, o as head, w as attr } from "../../../chunks/server.js";
//#region src/lib/components/Hero.svelte
function Hero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { galleries = [] } = $$props;
		let images = derived(() => galleries && galleries.length > 0 ? galleries.slice(0, 5).map((g) => g.image_path.startsWith("http") ? g.image_path : `/storage/${g.image_path.replace("/storage/", "")}`) : [
			"/hero-1.jpg",
			"/sinergi-mahasiswa-kkn.jpeg",
			"/diskusi-kantor-desa.png"
		]);
		let currentIndex = 0;
		$$renderer.push(`<div class="max-w-[1500px] mx-auto px-6 py-4 w-full"><div class="relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl"><!--[-->`);
		const each_array = ensure_array_like(images());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out w-full"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-black/30"></div> <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"><h2 class="text-white font-serif text-3xl md:text-[44px] font-bold leading-snug drop-shadow-lg mb-8">Selamat Datang di Website Resmi <br/> Desa Mengeruda</h2> <a href="/profil" class="bg-[#00a651] hover:bg-[#008f45] text-white font-medium text-lg py-3 px-10 rounded-full transition-colors duration-300 shadow-md">Selengkapnya</a></div></div></div>`);
	});
}
//#endregion
//#region src/lib/components/MenuUtama.svelte
function MenuUtama($$renderer) {
	const menus = [
		{
			title: "Layanan\nSurat",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>`,
			link: "https://e-surat.mengeruda.id"
		},
		{
			title: "Profil\nDesa",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 flex-shrink-0" style="stroke-width: 2px;">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
            </svg>`,
			link: "/profil"
		},
		{
			title: "Wisata &\nUMKM",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>`,
			link: "https://tourism.mengeruda.id"
		},
		{
			title: "APB\nDesa",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
              <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
            </svg>`,
			link: "/apb-desa"
		},
		{
			title: "Peta\nDesa",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
              <path fill-rule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clip-rule="evenodd" />
            </svg>`,
			link: "/peta"
		},
		{
			title: "Berita\nDesa",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
              <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>`,
			link: "/berita"
		}
	];
	$$renderer.push(`<section class="w-full bg-white pt-6 pb-12 md:pt-10 md:pb-16"><div class="max-w-[1500px] mx-auto px-6"><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5"><!--[-->`);
	const each_array = ensure_array_like(menus);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let menu = each_array[$$index];
		$$renderer.push(`<a${attr("href", menu.link)} class="border-2 border-[#00a651] rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-row items-center gap-3 md:gap-4 hover:bg-[#f0fbf4] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md bg-white group"><div class="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#00a651] flex-shrink-0 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">${html(menu.icon)}</div> <span class="font-serif font-bold text-[#006430] text-sm md:text-[17px] leading-tight whitespace-pre-line group-hover:text-[#008f45] transition-colors">${escape_html(menu.title)}</span></a>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
//#region src/lib/components/About.svelte
function About($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { profile = null } = $$props;
		let textNarasi = derived(() => profile && profile.tentang_desa ? profile.tentang_desa.replace(/<[^>]*>?/gm, "").substring(0, 300) + "..." : "Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure.");
		let imageUrl = derived(() => profile && profile.logo_url ? profile.logo_url.startsWith("http") ? profile.logo_url : `/storage/${profile.logo_url.replace("/storage/", "")}` : "/peta-mengeruda.png");
		$$renderer.push(`<section class="w-full bg-white py-16 md:py-24"><div class="max-w-[1500px] mx-auto px-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"><div class="flex flex-col items-start"><h2 class="text-4xl md:text-[42px] font-serif font-bold text-black mb-6">Tentang Mengeruda</h2> <p class="text-[17px] md:text-lg font-serif text-gray-800 leading-relaxed mb-8 text-justify">${escape_html(textNarasi())}</p> <a href="/profil" class="bg-[#00a651] hover:bg-[#008f45] text-white font-medium text-[17px] py-3 px-8 rounded-full transition-colors duration-300 shadow-sm inline-block">Selengkapnya</a></div> <div class="w-full flex justify-center"><img${attr("src", imageUrl())} alt="Ilustrasi Desa Mengeruda" class="w-full max-w-[600px] h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500"/></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/AdministrasiPenduduk.svelte
function AdministrasiPenduduk($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { demographic = null } = $$props;
		let totalPenduduk = derived(() => demographic?.total_penduduk ?? "1.999");
		let totalKk = derived(() => demographic?.total_kk ?? "999");
		let lakiLaki = derived(() => demographic?.laki_laki ?? "1.999");
		let perempuan = derived(() => demographic?.perempuan ?? "1.999");
		let statistik = derived(() => [
			{
				id: "penduduk",
				label: "Penduduk",
				value: totalPenduduk().toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
				icon: "<path fill-rule=\"evenodd\" d=\"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z\" clip-rule=\"evenodd\" /><path d=\"M12.5 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM14.47 16a4.5 4.5 0 01-1.97.46 4.5 4.5 0 01-1.97-.46A5.503 5.503 0 007 19.5a.5.5 0 001 0 4.5 4.5 0 119 0 .5.5 0 001 0 5.503 5.503 0 00-3.53-3.5z\" />"
			},
			{
				id: "laki-laki",
				label: "Laki-laki",
				value: lakiLaki().toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
				icon: "<path d=\"M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm2 5h-4c-1.1 0-2 .9-2 2v6h2v7h4v-7h2v-6c0-1.1-.9-2-2-2z\"/>"
			},
			{
				id: "kepala-keluarga",
				label: "Kepala Keluarga",
				value: totalKk().toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
				icon: "<path d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/>"
			},
			{
				id: "perempuan",
				label: "Perempuan",
				value: perempuan().toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
				icon: "<path d=\"M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 5h-8l-2 9h3v6h4v-6h3l-2-9z\"/>"
			}
		]);
		$$renderer.push(`<section class="w-full bg-white py-12"><div class="max-w-[1500px] mx-auto px-6"><div class="bg-[#eef8f1] border-2 border-[#00a651] rounded-[2rem] px-6 py-12 md:p-14 shadow-sm"><div class="text-center mb-10"><h2 class="text-3xl md:text-4xl font-serif font-bold text-[#00a651] mb-4">Administrasi Penduduk</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Data statistik jumlah penduduk, kepala keluarga, serta pembagian berdasarkan jenis kelamin.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"><!--[-->`);
		const each_array = ensure_array_like(statistik());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let stat = each_array[$$index];
			$$renderer.push(`<div class="flex h-[88px] rounded-xl overflow-hidden border border-[#00a651] bg-white"><div class="w-1/2 bg-[#00a651] flex items-center justify-center gap-3 px-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white shrink-0">${html(stat.icon)}</svg> <span class="text-2xl md:text-[28px] font-serif font-bold text-white tracking-wide">${escape_html(stat.value)}</span></div> <div class="w-1/2 flex items-center justify-center px-4"><span class="text-lg md:text-[20px] font-serif font-medium text-black text-center">${escape_html(stat.label)}</span></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/StrukturOrganisasi.svelte
function StrukturOrganisasi($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { struktur = [] } = $$props;
		let aparat = derived(() => struktur && struktur.length > 0 ? struktur.map((s) => ({
			name: s.nama,
			role: s.jabatan,
			img: s.foto ? s.foto.startsWith("http") ? s.foto : `/storage/${s.foto.replace("/storage/", "")}` : "/user-placeholder.png"
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
			}
		]);
		$$renderer.push(`<section class="w-full bg-white py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-serif font-bold text-[#008f45] mb-4">Struktur Organisasi &amp; Tata Kerja</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Pemerintahan Desa Mengeruda didukung oleh aparatur yang berdedikasi tinggi untuk melayani masyarakat.</p></div>  <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 [&amp;::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"><!--[-->`);
		const each_array = ensure_array_like(aparat());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let person = each_array[$$index];
			$$renderer.push(`<div class="snap-center shrink-0 w-[260px] md:w-[280px] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-gray-100"><div class="h-[280px] w-full flex items-end justify-center pt-6 bg-white"><img${attr("src", person.img)}${attr("alt", person.name)} class="object-cover h-full drop-shadow-md"/></div> <div class="bg-gradient-to-b from-[#00a651] to-[#005c2d] p-5 text-center flex-grow flex flex-col justify-between rounded-t-lg"><h3 class="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-4">${escape_html(person.name)}</h3> <div class="mt-auto"><span class="inline-block bg-white text-[#008f45] font-bold text-sm px-5 py-1.5 rounded-full shadow-sm">${escape_html(person.role)}</span></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="mt-14 flex items-center justify-center gap-4 max-w-5xl mx-auto"><div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div> <a href="/struktur-organisasi" class="bg-[#005c2d] hover:bg-[#004723] text-white font-serif font-bold text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md whitespace-nowrap">Lihat Struktur Lengkap</a> <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ApbDesa.svelte
function ApbDesa($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { apb = [] } = $$props;
		let latestApb = derived(() => apb && apb.length > 0 ? apb[0] : null);
		let year = derived(() => latestApb() ? latestApb().year : (/* @__PURE__ */ new Date()).getFullYear());
		let totalRevenues = derived(() => latestApb() && latestApb().data?.pelaksanaan ? latestApb().data.pelaksanaan.find((item) => item.title.toLowerCase().includes("pendapatan"))?.anggaran || 0 : 0);
		let totalExpenses = derived(() => latestApb() && latestApb().data?.pelaksanaan ? latestApb().data.pelaksanaan.find((item) => item.title.toLowerCase().includes("belanja"))?.anggaran || 0 : 0);
		let apbData = derived(() => [{
			label: "Pendapatan Desa",
			value: "Rp" + totalRevenues().toLocaleString("id-ID")
		}, {
			label: "Belanja Desa",
			value: "Rp" + totalExpenses().toLocaleString("id-ID")
		}]);
		$$renderer.push(`<section class="w-full bg-white py-12"><div class="max-w-[1500px] mx-auto px-6"><div class="bg-[#00a651] rounded-[2rem] p-6 md:p-12 text-white shadow-md relative overflow-hidden"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10"><div class="lg:col-span-5 flex justify-center"><img src="/icon-apbd.png" alt="Ilustrasi Finansial APB Desa" class="w-full max-w-[380px] h-auto object-contain"/></div> <div class="lg:col-span-7 flex flex-col justify-center"><h2 class="text-3xl md:text-[40px] font-serif font-bold leading-tight mb-4">APB Desa ${escape_html(year())}</h2> <p class="text-white/95 font-serif text-base md:text-lg leading-relaxed mb-8 max-w-2xl">Ringkasan pendapatan dan belanja Anggaran Pendapatan dan Belanja Desa (APB Desa) tahun berjalan.</p> <div class="flex flex-col gap-4 w-full"><!--[-->`);
		const each_array = ensure_array_like(apbData());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="bg-white rounded-full px-5 py-3 md:py-4 flex items-center justify-between text-black shadow-sm"><div class="flex items-center gap-3"><div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#004723] flex items-center justify-center shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 14.25c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v5.625c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-5.625z"></path></svg></div> <span class="font-serif font-bold text-base md:text-xl text-gray-900 leading-tight">${escape_html(item.label)}</span></div> <div class="text-right"><span class="font-serif font-bold text-lg md:text-2xl text-gray-900 tracking-wide">${escape_html(item.value)}</span></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div> <div class="w-full"><a href="/apb-desa" class="block w-full text-center border-2 border-white hover:bg-white hover:text-[#00a651] text-white font-serif font-bold text-lg py-3 rounded-full transition-all duration-300">Lihat Selengkapnya</a></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/BeritaDesa.svelte
function BeritaDesa($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { news = [] } = $$props;
		let daftarBerita = derived(() => news && news.length > 0 ? news.slice(0, 4).map((b) => ({
			title: b.judul || b.title || "Tanpa Judul",
			date: b.created_at ? new Date(b.created_at).toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric"
			}) : "",
			excerpt: (b.content || "").replace(/<[^>]*>?/gm, "").substring(0, 100) + "...",
			img: b.banner_url || (b.banner ? b.banner.startsWith("http") ? b.banner : `/storage/${b.banner.replace("/storage/", "")}` : null) || b.image_url || "/hero-2.png",
			slug: b.slug || (b.id ? b.id.toString() : "")
		})) : [
			{
				title: "Koordinasi Pemerintah Desa dengan Mahasiswa KKN",
				date: "13/07/2026",
				excerpt: "Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.",
				img: "/hero-2.png",
				slug: "koordinasi-pemerintah-desa-kkn-1"
			},
			{
				title: "Koordinasi Pemerintah Desa dengan Mahasiswa KKN",
				date: "13/07/2026",
				excerpt: "Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.",
				img: "/hero-2.png",
				slug: "koordinasi-pemerintah-desa-kkn-2"
			},
			{
				title: "Koordinasi Pemerintah Desa dengan Mahasiswa KKN",
				date: "13/07/2026",
				excerpt: "Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.",
				img: "/hero-1.jpg",
				slug: "koordinasi-pemerintah-desa-kkn-3"
			},
			{
				title: "Koordinasi Pemerintah Desa dengan Mahasiswa KKN",
				date: "13/07/2026",
				excerpt: "Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.",
				img: "/hero-1.jpg",
				slug: "koordinasi-pemerintah-desa-kkn-4"
			}
		]);
		$$renderer.push(`<section class="w-full bg-white py-16"><div class="max-w-[1500px] mx-auto px-6"><div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-serif font-bold text-[#008f45] mb-4">Berita Desa</h2> <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">Kumpulan informasi, berita terbaru, dan pengumuman terkait kegiatan di Desa Mengeruda.</p></div> <div class="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-10 pt-4 px-2 [&amp;::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"><!--[-->`);
		const each_array = ensure_array_like(daftarBerita());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let berita = each_array[$$index];
			$$renderer.push(`<a${attr("href", `/berita/${berita.slug}`)} class="snap-center shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"><div class="w-full h-[220px] overflow-hidden"><img${attr("src", berita.img)}${attr("alt", berita.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div> <div class="p-6 flex flex-col flex-grow"><div class="mb-4"><span class="inline-flex items-center gap-1.5 bg-[#00a651] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd"></path></svg> ${escape_html(berita.date)}</span></div> <h3 class="text-[#005c2d] font-serif font-bold text-xl leading-snug mb-3 group-hover:text-[#00a651] transition-colors">${escape_html(berita.title)}</h3> <p class="text-gray-600 font-serif text-[15px] leading-relaxed line-clamp-3">${escape_html(berita.excerpt)}</p></div></a>`);
		}
		$$renderer.push(`<!--]--></div> <div class="mt-4 flex items-center justify-center gap-4 max-w-5xl mx-auto"><div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div> <a href="/berita" class="bg-[#005c2d] hover:bg-[#004723] text-white font-serif font-bold text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md whitespace-nowrap">Lihat Berita Lengkap</a> <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/GaleriHome.svelte
function GaleriHome($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { galleries = [] } = $$props;
		let formattedGalleries = derived(() => galleries && galleries.length > 0 ? galleries.map((g) => ({
			img: g.image_path.startsWith("http") ? g.image_path : `/storage/${g.image_path.replace("/storage/", "")}`,
			title: g.title
		})) : [
			{
				img: "/hero-1.jpg",
				title: "Pemandangan Bukit Savana Mengeruda"
			},
			{
				img: "/kunjungan-mahasiswa-sekolah.jpeg",
				title: "Kunjungan Mahasiswa KKN ke SMPN 1 SATAP"
			},
			{
				img: "/acara-adat-resepsi.png",
				title: "Acara Adat Resepsi"
			},
			{
				img: "/menjemur-padi.jpeg",
				title: "Menjemur Padi"
			},
			{
				img: "/hero-2.png",
				title: "Penyaluran BLT Tahap 3"
			},
			{
				img: "/berangkat-sekolah.jpeg",
				title: "Semangat Pagi"
			},
			{
				img: "/sinergi-mahasiswa-kkn.jpeg",
				title: "Sinergi Mahasiswa KKN dengan Sekolah"
			},
			{
				img: "/produk-tempe.png",
				title: "Produk Keripik Tempe Lokal"
			},
			{
				img: "/wisata-air-panas.jpeg",
				title: "Wisata Air Panas"
			},
			{
				img: "/karang-taruna.png",
				title: "Karang Taruna"
			}
		]);
		let galeriAtas = derived(() => formattedGalleries().slice(0, Math.ceil(formattedGalleries().length / 2)));
		let galeriBawah = derived(() => formattedGalleries().slice(Math.ceil(formattedGalleries().length / 2)));
		let barisAtasDuplikat = derived(() => [...galeriAtas(), ...galeriAtas()]);
		let barisBawahDuplikat = derived(() => [...galeriBawah(), ...galeriBawah()]);
		$$renderer.push(`<section class="w-full bg-white py-16 md:py-24 overflow-hidden svelte-bzevur"><div class="max-w-[1500px] mx-auto px-6 mb-12 svelte-bzevur"><div class="text-center svelte-bzevur"><h2 class="text-4xl md:text-[44px] font-serif font-bold text-[#007b3e] mb-4 svelte-bzevur">Galeri Desa</h2> <p class="text-gray-800 font-serif text-[17px] md:text-lg max-w-3xl mx-auto leading-relaxed svelte-bzevur">Kumpulan momen dan keindahan pesona Desa Mengeruda yang diabadikan melalui lensa kamera.</p></div></div> <div class="flex flex-col gap-4 md:gap-6 w-full svelte-bzevur"><div class="w-full overflow-hidden svelte-bzevur"><div class="track animate-scroll-left hover-pause gap-4 md:gap-6 svelte-bzevur"><!--[-->`);
		const each_array = ensure_array_like(barisAtasDuplikat());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="relative group w-[280px] md:w-[400px] h-[200px] md:h-[260px] shrink-0 overflow-hidden cursor-pointer rounded-sm shadow-sm svelte-bzevur"><img${attr("src", item.img)}${attr("alt", item.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 svelte-bzevur"/> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 svelte-bzevur"><h3 class="text-white font-serif font-bold text-lg md:text-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md svelte-bzevur">${escape_html(item.title)}</h3></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="w-full overflow-hidden svelte-bzevur"><div class="track animate-scroll-right hover-pause gap-4 md:gap-6 svelte-bzevur"><!--[-->`);
		const each_array_1 = ensure_array_like(barisBawahDuplikat());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let item = each_array_1[$$index_1];
			$$renderer.push(`<div class="relative group w-[280px] md:w-[400px] h-[200px] md:h-[260px] shrink-0 overflow-hidden cursor-pointer rounded-sm shadow-sm svelte-bzevur"><img${attr("src", item.img)}${attr("alt", item.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 svelte-bzevur"/> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 svelte-bzevur"><h3 class="text-white font-serif font-bold text-lg md:text-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md svelte-bzevur">${escape_html(item.title)}</h3></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
//#region src/routes/(client)/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("opejen", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Beranda - Desa Mengeruda</title>`);
			});
		});
		Hero($$renderer, { galleries: data.galleries });
		$$renderer.push(`<!----> `);
		MenuUtama($$renderer, {});
		$$renderer.push(`<!----> `);
		About($$renderer, { profile: data.villageProfile });
		$$renderer.push(`<!----> `);
		AdministrasiPenduduk($$renderer, { demographic: data.demographic });
		$$renderer.push(`<!----> `);
		StrukturOrganisasi($$renderer, { struktur: data.strukturDesa });
		$$renderer.push(`<!----> `);
		ApbDesa($$renderer, { apb: data.apbDesa });
		$$renderer.push(`<!----> `);
		BeritaDesa($$renderer, { news: data.news });
		$$renderer.push(`<!----> `);
		GaleriHome($$renderer, { galleries: data.galleries });
		$$renderer.push(`<!----> <section class="max-w-[1500px] mx-auto px-6 py-12"></section>`);
	});
}
//#endregion
export { _page as default };

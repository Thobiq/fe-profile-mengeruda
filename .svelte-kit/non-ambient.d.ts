
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(client)" | "/" | "/admin" | "/admin/administrator" | "/admin/apb-desa" | "/admin/apb-desa/form" | "/admin/berita" | "/admin/berita/tambah" | "/admin/demografi" | "/admin/galeri" | "/admin/login" | "/admin/peta" | "/admin/peta/form" | "/admin/profil-desa" | "/admin/struktur-organisasi" | "/(client)/apb-desa" | "/(client)/berita" | "/(client)/berita/[slug]" | "/(client)/demografi" | "/login" | "/(client)/peta" | "/(client)/profil" | "/struktur-organisasi" | "/(client)/wisata-umkm";
		RouteParams(): {
			"/(client)/berita/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(client)": { slug?: string | undefined };
			"/": { slug?: string | undefined };
			"/admin": Record<string, never>;
			"/admin/administrator": Record<string, never>;
			"/admin/apb-desa": Record<string, never>;
			"/admin/apb-desa/form": Record<string, never>;
			"/admin/berita": Record<string, never>;
			"/admin/berita/tambah": Record<string, never>;
			"/admin/demografi": Record<string, never>;
			"/admin/galeri": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/peta": Record<string, never>;
			"/admin/peta/form": Record<string, never>;
			"/admin/profil-desa": Record<string, never>;
			"/admin/struktur-organisasi": Record<string, never>;
			"/(client)/apb-desa": Record<string, never>;
			"/(client)/berita": { slug?: string | undefined };
			"/(client)/berita/[slug]": { slug: string };
			"/(client)/demografi": Record<string, never>;
			"/login": Record<string, never>;
			"/(client)/peta": Record<string, never>;
			"/(client)/profil": Record<string, never>;
			"/struktur-organisasi": Record<string, never>;
			"/(client)/wisata-umkm": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/administrator" | "/admin/apb-desa" | "/admin/apb-desa/form" | "/admin/berita" | "/admin/berita/tambah" | "/admin/demografi" | "/admin/galeri" | "/admin/login" | "/admin/peta" | "/admin/peta/form" | "/admin/profil-desa" | "/admin/struktur-organisasi" | "/apb-desa" | "/berita" | `/berita/${string}` & {} | "/demografi" | "/login" | "/peta" | "/profil" | "/struktur-organisasi" | "/wisata-umkm";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/acara-adat-resepsi.png" | "/Batas_Desa.json" | "/berangkat-sekolah.jpeg" | "/diskusi-kantor-desa.png" | "/Fasilitas_Desa_Mengeruda.json" | "/hero-1.jpg" | "/hero-2.png" | "/icon-apbd.png" | "/Jalan_Desa_Mengeruda.json" | "/karang-taruna.png" | "/kunjungan-mahasiswa-sekolah.jpeg" | "/logo.png" | "/menjemur-padi.jpeg" | "/mpls-satap.png" | "/peta-mengeruda.png" | "/produk-tempe.png" | "/robots.txt" | "/sinergi-mahasiswa-kkn.jpeg" | "/user-placeholder.png" | "/wisata-air-panas.jpeg" | string & {};
	}
}
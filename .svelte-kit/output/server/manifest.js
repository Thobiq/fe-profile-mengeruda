export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["acara-adat-resepsi.png","Batas_Desa.json","berangkat-sekolah.jpeg","diskusi-kantor-desa.png","Fasilitas_Desa_Mengeruda.json","hero-1.jpg","hero-2.png","icon-apbd.png","Jalan_Desa_Mengeruda.json","karang-taruna.png","kunjungan-mahasiswa-sekolah.jpeg","logo.png","menjemur-padi.jpeg","mpls-satap.png","peta-mengeruda.png","produk-tempe.png","robots.txt","sinergi-mahasiswa-kkn.jpeg","user-placeholder.png","wisata-air-panas.jpeg"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".jpeg":"image/jpeg",".jpg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BpGzbNmB.js",app:"_app/immutable/entry/app.CKubKaJU.js",imports:["_app/immutable/entry/start.BpGzbNmB.js","_app/immutable/chunks/QfLOjW-j.js","_app/immutable/chunks/B4cpIHhn.js","_app/immutable/entry/app.CKubKaJU.js","_app/immutable/chunks/B4cpIHhn.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(client)/berita/[slug]",
				pattern: /^\/berita\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/admin","/admin/administrator","/admin/apb-desa","/admin/apb-desa/form","/admin/berita","/admin/berita/tambah","/admin/demografi","/admin/galeri","/admin/login","/admin/peta","/admin/peta/form","/admin/profil-desa","/admin/struktur-organisasi","/apb-desa","/berita","/demografi","/login","/peta","/profil","/struktur-organisasi","/wisata-umkm"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

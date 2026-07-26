// in dev, this makes Vite inject its client as this module's first dependency,
// so that global constant replacements are installed before any other module
// (including user hooks) evaluates. In build it's inert.
import.meta.hot;




export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [];

export const dictionary = {
		"/(client)": [4,[2]],
		"/admin": [12,[3]],
		"/admin/administrator": [13,[3]],
		"/admin/apb-desa": [14,[3]],
		"/admin/apb-desa/form": [15,[3]],
		"/admin/berita": [16,[3]],
		"/admin/berita/tambah": [17,[3]],
		"/admin/demografi": [18,[3]],
		"/admin/galeri": [19,[3]],
		"/admin/login": [20,[3]],
		"/admin/peta": [21,[3]],
		"/admin/peta/form": [22,[3]],
		"/admin/profil-desa": [23,[3]],
		"/admin/struktur-organisasi": [24,[3]],
		"/(client)/apb-desa": [5,[2]],
		"/(client)/berita": [6,[2]],
		"/(client)/berita/[slug]": [7,[2]],
		"/(client)/demografi": [8,[2]],
		"/login": [25],
		"/(client)/peta": [9,[2]],
		"/(client)/profil": [10,[2]],
		"/struktur-organisasi": [26],
		"/(client)/wisata-umkm": [11,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);
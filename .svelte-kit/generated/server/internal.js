
import root from '../root.js';
import { set_building, set_prerendering } from '$app/env/internal';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';
import error from '../shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	server_error_boundaries: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<meta name=\"text-scale\" content=\"scale\" />\n\t\t" + head + "\n\t\t<link id=\"dynamic-favicon\" rel=\"icon\" href=\"/logo.png\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&display=swap\" rel=\"stylesheet\">\n\t\t<style>\n\t\t\t#splash-screen {\n\t\t\t\tposition: fixed;\n\t\t\t\tinset: 0;\n\t\t\t\tbackground-color: #ffffff;\n\t\t\t\tz-index: 9999999;\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\ttransition: opacity 0.8s ease-in-out, visibility 0.8s;\n\t\t\t\tfont-family: 'Montserrat', sans-serif;\n\t\t\t}\n\t\t\t.splash-circle {\n\t\t\t\twidth: 110px;\n\t\t\t\theight: 110px;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tbackground-color: #e5e7eb; /* light grey placeholder */\n\t\t\t\tmargin-bottom: 24px;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\t\t\t.splash-circle img {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tobject-fit: contain;\n\t\t\t\tpadding: 10px;\n\t\t\t}\n\t\t\t.splash-title {\n\t\t\t\tfont-family: 'Montserrat', sans-serif;\n\t\t\t\tfont-size: 32px;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tcolor: #15803d;\n\t\t\t\ttext-align: center;\n\t\t\t\tline-height: 1.2;\n\t\t\t\tmargin-bottom: 20px;\n\t\t\t\tletter-spacing: -0.02em;\n\t\t\t}\n\t\t\t.splash-loading-area {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tgap: 10px;\n\t\t\t}\n\t\t\t.splash-spinner {\n\t\t\t\twidth: 22px;\n\t\t\t\theight: 22px;\n\t\t\t\tborder: 3px solid #e5e7eb;\n\t\t\t\tborder-top-color: #15803d;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tanimation: splash-spin 1s linear infinite;\n\t\t\t}\n\t\t\t.splash-text {\n\t\t\t\tfont-family: 'Montserrat', sans-serif;\n\t\t\t\tcolor: #4b5563;\n\t\t\t\tfont-size: 16px;\n\t\t\t\tfont-weight: 500;\n\t\t\t}\n\t\t\t@keyframes splash-spin {\n\t\t\t\tto { transform: rotate(360deg); }\n\t\t\t}\n\t\t\t@media (max-width: 640px) {\n\t\t\t\t.splash-title { font-size: 24px; }\n\t\t\t\t.splash-circle { width: 90px; height: 90px; }\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div id=\"splash-screen\">\n\t\t\t<div class=\"splash-circle\">\n\t\t\t\t<img id=\"splash-logo\" src=\"/logo.png\" alt=\"Logo\" style=\"display: none;\" onload=\"this.style.display='block'\" onerror=\"this.style.display='none'\"/>\n\t\t\t</div>\n\t\t\t<div class=\"splash-title\">\n\t\t\t\tSelamat Datang di<br/>Website Resmi Desa Mengeruda\n\t\t\t</div>\n\t\t\t<div class=\"splash-loading-area\">\n\t\t\t\t<div class=\"splash-spinner\"></div>\n\t\t\t\t<div class=\"splash-text\">Sedang memuat data</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<script>\n\t\t\tfetch('/api/village-profile')\n\t\t\t\t.then(r => r.json())\n\t\t\t\t.then(res => {\n\t\t\t\t\tlet data = res.data || res;\n\t\t\t\t\tif (data && (data.logo_url || data.logo)) {\n\t\t\t\t\t\tlet url = data.logo_url || data.logo;\n\t\t\t\t\t\tif (!url.startsWith('http')) url = '%env.VITE_PUBLIC_BACKEND_URL%' + (url.startsWith('/') ? '' : '/') + (url.startsWith('storage') ? url : url.replace('/storage/', 'storage/'));\n\t\t\t\t\t\tlet el = document.getElementById('splash-logo');\n\t\t\t\t\t\tif (el) el.src = url;\n\t\t\t\t\t\tlet fav = document.getElementById('dynamic-favicon');\n\t\t\t\t\t\tif (fav) fav.href = url;\n\t\t\t\t\t}\n\t\t\t\t}).catch(e => console.log('Splash logo & favicon fetch error', e));\n\t\t</script>\n\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error
	},
	version_hash: "436654"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };

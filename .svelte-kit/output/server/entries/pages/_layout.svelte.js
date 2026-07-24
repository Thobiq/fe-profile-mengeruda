import "../../chunks/index-server.js";
import { l as stringify, n as attr_style, u as unsubscribe_stores } from "../../chunks/server.js";
/* empty css               */
import "../../chunks/stores.js";
//#region src/lib/components/PageLoader.svelte
function PageLoader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		$$renderer.push(`<div class="fixed top-0 left-0 h-[3px] bg-emerald-500 z-[99999] transition-all duration-300 ease-out"${attr_style(` width: ${stringify(0)}%; opacity: ${stringify(0)}; pointer-events: none; box-shadow: 0 0 10px #10b981, 0 0 5px #10b981; `)}></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		PageLoader($$renderer, {});
		$$renderer.push(`<!----> `);
		children($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };

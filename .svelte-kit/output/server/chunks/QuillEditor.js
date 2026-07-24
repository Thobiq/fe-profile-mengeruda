import "./index-server.js";
import { r as bind_props } from "./server.js";
//#region src/lib/components/QuillEditor.svelte
function QuillEditor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content = void 0 } = $$props;
		$$renderer.push(`<div class="quill-wrapper"><div></div></div>`);
		bind_props($$props, { content });
	});
}
//#endregion
export { QuillEditor as t };

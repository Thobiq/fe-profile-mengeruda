import axios from "axios";
//#region src/lib/api.js
var api = axios.create({
	baseURL: "https://api-profile.mengeruda.id",
	withCredentials: true,
	headers: { "Accept": "application/json" }
});
api.interceptors.request.use((config) => {
	if (typeof document !== "undefined") {
		const match = document.cookie.match(/* @__PURE__ */ new RegExp("(^|;\\s*)(XSRF-TOKEN)=([^;]*)"));
		if (match) config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[3]);
	}
	return config;
});
//#endregion
export { api as t };

import { t as public_env } from "../../../chunks/shared-server.js";
//#region src/routes/(client)/+page.js
var ssr = false;
async function load({ fetch }) {
	const API_URL = public_env.PUBLIC_API_URL || "https://api-profile.mengeruda.id/api";
	const endpoints = [
		fetch(`${API_URL}/galleries`),
		fetch(`${API_URL}/village-profile`),
		fetch(`${API_URL}/demographic`),
		fetch(`${API_URL}/struktur-desa`),
		fetch(`${API_URL}/apb-desa`),
		fetch(`${API_URL}/news`)
	];
	const results = await Promise.allSettled(endpoints);
	const parseRes = async (resObj) => {
		if (resObj.status === "fulfilled" && resObj.value.ok) try {
			const json = await resObj.value.json();
			return json.data || json;
		} catch (e) {
			return null;
		}
		return null;
	};
	return {
		galleries: await parseRes(results[0]),
		villageProfile: await parseRes(results[1]),
		demographic: await parseRes(results[2]),
		strukturDesa: await parseRes(results[3]),
		apbDesa: await parseRes(results[4]),
		news: await parseRes(results[5])
	};
}
//#endregion
export { load, ssr };

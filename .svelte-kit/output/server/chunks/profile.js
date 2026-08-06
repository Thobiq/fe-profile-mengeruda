import { O as writable } from "./server.js";
import "./index-server2.js";
import { t as api } from "./api.js";
//#region src/lib/stores/profile.js
var villageProfileStore = writable({
	nama_desa: "Desa Mengeruda",
	alamat_desa: "Kab. Ngada, Nusa Tenggara Timur",
	logo_url: "/logo.png",
	loaded: false
});
var isFetching = false;
async function fetchVillageProfile() {
	if (isFetching) return;
	isFetching = true;
	try {
		const res = await api.get("/api/village-profile");
		const d = res.data?.data || res.data;
		if (d) {
			let formattedNama = d.nama_desa ? d.nama_desa.toLowerCase().startsWith("desa") ? d.nama_desa : `Desa ${d.nama_desa}` : "Desa Mengeruda";
			let formattedAlamat = "Kab. Ngada, Nusa Tenggara Timur";
			if (d.kabupaten && d.provinsi) formattedAlamat = `${d.kabupaten.toLowerCase().startsWith("kab") ? d.kabupaten : `Kab. ${d.kabupaten}`}, ${d.provinsi}`;
			else if (d.kabupaten) formattedAlamat = d.kabupaten.toLowerCase().startsWith("kab") ? d.kabupaten : `Kab. ${d.kabupaten}`;
			else if (d.provinsi) formattedAlamat = d.provinsi;
			let logoUrl = "/logo.png";
			if (d.logo_url || d.logo) {
				let url = d.logo_url || d.logo;
				if (!url.startsWith("http")) url = `https://api.mengeruda.id${url.startsWith("/") ? "" : "/"}${url.startsWith("storage") ? url : url.replace("/storage/", "storage/")}`;
				logoUrl = url;
			}
			villageProfileStore.set({
				nama_desa: formattedNama,
				alamat_desa: formattedAlamat,
				logo_url: logoUrl,
				loaded: true
			});
			if (typeof document !== "undefined") {
				let link = document.querySelector("link[rel~='icon']");
				if (!link) {
					link = document.createElement("link");
					link.rel = "icon";
					document.head.appendChild(link);
				}
				link.href = logoUrl;
			}
		}
	} catch (err) {
		console.error("Failed to fetch village profile:", err);
	} finally {
		isFetching = false;
	}
}
//#endregion
export { villageProfileStore as n, fetchVillageProfile as t };

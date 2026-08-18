//#region src/routes/struktur-organisasi/+page.js
/** @type {import('./$types').PageLoad} */
async function load({ fetch }) {
	try {
		const response = await fetch(`https://api-profile.mengeruda.id/api/struktur-desa`);
		if (!response.ok) throw new Error("Gagal mengambil data struktur organisasi");
		return { perangkat: (await response.json()).data || [] };
	} catch (error) {
		console.error("Error fetching org chart data:", error);
		return {
			perangkat: [],
			error: error.message
		};
	}
}
//#endregion
export { load };

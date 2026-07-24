import { E as escape_html, T as clsx, a as ensure_array_like, f as html, o as head, t as attr_class } from "../../../chunks/server.js";
//#region src/routes/admin/+page.svelte
function _page($$renderer) {
	const dashboardStats = [
		{
			title: "Pengunjung website bulan ini",
			value: "9.999",
			valueColor: "text-[#006e33]",
			iconBg: "bg-blue-100",
			iconColor: "text-blue-500",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" /></svg>`
		},
		{
			title: "Tempat Wisata",
			value: "4",
			valueColor: "text-[#006e33]",
			iconBg: "bg-green-100",
			iconColor: "text-green-500",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
		},
		{
			title: "UMKM Desa",
			value: "4",
			valueColor: "text-[#006e33]",
			iconBg: "bg-orange-100",
			iconColor: "text-orange-500",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627-.47 1.406-.75 2.25-.75.844 0 1.623.28 2.25.75.627-.47 1.406-.75 2.25-.75.844 0 1.623.28 2.25.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" /><path fill-rule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.25 5.25 0 0012 12.75a5.25 5.25 0 004.5-1.255v8.755c0 .966-.784 1.75-1.75 1.75H4.75a1.75 1.75 0 01-1.75-1.75zM9 19.5a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v2.25c0 .414.336.75.75.75H9z" clip-rule="evenodd" /></svg>`
		},
		{
			title: "Berita diterbitkan",
			value: "10",
			valueColor: "text-[#006e33]",
			iconBg: "bg-red-100",
			iconColor: "text-red-500",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" /><path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25z" clip-rule="evenodd" /></svg>`
		}
	];
	head("1jef3w8", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Dashboard Admin - Desa Mengeruda</title>`);
		});
	});
	$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
	const each_array = ensure_array_like(dashboardStats);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let stat = each_array[$$index];
		$$renderer.push(`<div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"><div${attr_class(`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center mb-6`)}><span${attr_class(clsx(stat.iconColor))}>${html(stat.icon)}</span></div> <div><h3${attr_class(`text-4xl font-extrabold ${stat.valueColor} mb-1 tracking-tight`)}>${escape_html(stat.value)}</h3> <p class="text-[15px] font-bold text-gray-500">${escape_html(stat.title)}</p></div></div>`);
	}
	$$renderer.push(`<!--]--></div>`);
}
//#endregion
export { _page as default };

import { a as ensure_array_like, l as stringify, n as attr_style, o as head, w as attr } from "../../../chunks/server.js";
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const bgImages = ["/hero-1.jpg", "/hero-2.png"];
		let currentIndex = 0;
		let email = "";
		let password = "";
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login Admin - Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-serif py-10 px-4"><!--[-->`);
		const each_array = ensure_array_like(bgImages);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-black/30 z-0"></div>   <div class="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl"><div class="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-12 md:p-16"><img src="/logo-desa.png" alt="Logo Desa" class="w-40 md:w-48 h-auto object-contain mb-6"/> <h1 class="text-4xl md:text-[42px] font-bold text-[#006430] text-center leading-tight">Desa<br/>Mengeruda</h1></div>  <div class="w-full md:w-1/2 bg-gradient-to-br from-[#008f45] to-[#004f25] p-10 md:p-14 flex flex-col justify-center"><h2 class="text-white text-4xl md:text-[40px] font-bold text-center mb-10 drop-shadow-sm">Login</h2> <form class="w-full flex flex-col gap-6"><div class="flex flex-col gap-2"><label class="text-white text-[15px] md:text-base font-bold drop-shadow-sm">Email</label> <input type="email"${attr("value", email)} placeholder="Masukkan Email" class="w-full bg-transparent border-[1.5px] border-white rounded-full px-6 py-3.5 text-white placeholder-white/80 outline-none focus:bg-white/10 transition-all font-sans text-base" required=""/></div> <div class="flex flex-col gap-2"><label class="text-white text-[15px] md:text-base font-bold drop-shadow-sm">Password</label> <div class="relative flex items-center"><input${attr("type", "password")}${attr("value", password)} placeholder="Masukkan Password" class="w-full bg-transparent border-[1.5px] border-white rounded-full pl-6 pr-14 py-3.5 text-white placeholder-white/80 outline-none focus:bg-white/10 transition-all font-sans text-base" required=""/> <button type="button" class="absolute right-5 text-white hover:text-gray-200 transition-colors">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[22px] h-[22px]"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <div class="flex justify-end mt-[-8px]"><a href="#lupa" class="text-white text-[13px] md:text-[14px] font-bold hover:text-gray-200 transition-colors drop-shadow-sm">Lupa Password ?</a></div> <button type="submit" class="w-full bg-white text-[#006430] hover:bg-gray-100 font-bold text-xl py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-[1.02] mt-2 tracking-wide">Login</button></form></div></div></div>`);
	});
}
//#endregion
export { _page as default };

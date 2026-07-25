import axios from "axios";
//#region src/lib/api.js
var api = axios.create({
	baseURL: "https://api.mengeruda.id",
	withCredentials: true,
	headers: { "Accept": "application/json" }
});
//#endregion
export { api as t };

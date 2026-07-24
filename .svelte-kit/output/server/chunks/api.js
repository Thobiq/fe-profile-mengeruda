import axios from "axios";
//#region src/lib/api.js
var api = axios.create({
	withCredentials: true,
	headers: { "Accept": "application/json" }
});
//#endregion
export { api as t };

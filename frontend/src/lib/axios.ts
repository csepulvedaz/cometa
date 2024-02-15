import axios from "axios";

export const createHeaders = () => {
	return {
		"Content-Type": "application/json",
	};
};

export const createRequest = () => {
	return axios.create({
		baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
		headers: createHeaders(),
	});
};

export const throwResErrors = (error: any) => {
	let detail = error.response?.data?.detail;
	if (detail instanceof Array) {
		detail = {
			internal: detail,
			message: detail[0].msg,
		};
	}
	console.error("Internal error", detail?.internal ?? detail.message ?? "Unknown");
	throw detail;
};
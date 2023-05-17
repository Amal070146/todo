import axios from "axios";

const baseURL = 'https://mulearn-internship-task-production.up.railway.app/api/'



export const axiosPrivate = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
});
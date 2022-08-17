/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const Api = axios.create({ baseURL: process.env.REACT_APP_ENDPOINT });

const errorComposer = error => () => console.error(error);

Api.interceptors.response.use(
	response => response,
	error => {
		error.globalHandler = errorComposer(error);
		return Promise.reject(error);
	}
);

export default Api;

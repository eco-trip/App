/* eslint-disable no-param-reassign */
import { useEffect, useContext } from 'react';
import axios from 'axios';

import AppContext from './AppContext';

const errorComposer = error => () => console.error(error);

const Api = axios.create({ baseURL: process.env.REACT_APP_ENDPOINT, withCredentials: true });

export const ApiInterceptor = ({ children }) => {
	const { token } = useContext(AppContext);

	useEffect(() => {
		const resInterceptor = response => response;
		const resErrInterceptor = error => {
			error.globalHandler = errorComposer(error);

			return Promise.reject(error);
		};

		const responseInterceptor = Api.interceptors.response.use(resInterceptor, resErrInterceptor);

		return () => Api.interceptors.response.eject(responseInterceptor);
	}, [token]);

	return children;
};

export default Api;

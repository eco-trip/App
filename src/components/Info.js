import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Api from '../helpers/Api';
import AppContext from '../helpers/AppContext';

const Info = () => {
	const { t } = useTranslation();

	const { token, setToken } = useContext(AppContext);

	useEffect(() => {
		if (!token) return;

		Api.get('/guest', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(({ data }) => {
				console.log('OK', data);
			})
			.catch(err => {
				setToken(null);
				return err.globalHandler && err.globalHandler();
			});
	}, [token]);

	return (
		<section className="inner-content">
			<h1>Info</h1>
		</section>
	);
};

export default Info;

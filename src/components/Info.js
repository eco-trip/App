import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/pro-solid-svg-icons';

import Api from '../helpers/Api';
import AppContext from '../helpers/AppContext';

const Info = ({ setError }) => {
	const { t } = useTranslation();

	const [loading, setLoading] = useState(true);
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
				setLoading(false);
			})
			.catch(err => {
				setToken(null);

				if (err.response?.data) {
					if (err.response?.data?.error === 404 || err.response?.data?.error === 401)
						return setError(err.response.data.error);
				}
				return err.globalHandler && err.globalHandler();
			});
	}, [token]);

	if (loading)
		return (
			<section className="content-center">
				<FontAwesomeIcon icon={faFan} size="2x" spin />
			</section>
		);

	return (
		<section className="inner-content">
			<h1>Info</h1>
		</section>
	);
};

export default Info;

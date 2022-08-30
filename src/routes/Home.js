import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Api from '../helpers/api';

const Home = () => {
	const { t } = useTranslation();
	const [hotel, setHotel] = useState([]);

	useEffect(() => {
		Api.get('/hotel')
			.then(res => setHotel(res.data))
			.catch(err => err.globalHandler && err.globalHandler());
	}, []);

	return (
		<div className="inner-content">
			<div className="d-grid gap-3">
				<h1>Home</h1>
				<p>endpoint: {process.env.REACT_APP_ENDPOINT}</p>
				{hotel.length < 1 ? (
					<p>{t('common.noResults')}</p>
				) : (
					<ul className="list-group">
						{hotel.map(({ id, name }) => (
							<li key={id} className="list-group-item">
								{name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Home;

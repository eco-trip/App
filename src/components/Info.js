import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/pro-solid-svg-icons';
import Moment from 'react-moment';

import Api from '../helpers/Api';
import AppContext from '../helpers/AppContext';

import DataElaboration from './DataElaboration';
import RealTime from './RealTime';

const Info = ({ setError }) => {
	const { t } = useTranslation();

	const [data, setData] = useState(true);
	const [loading, setLoading] = useState(true);
	const { token, setToken } = useContext(AppContext);

	useEffect(() => {
		if (!token) return;

		Api.get('/guest', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				setData(res.data);
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
			<div className="card text-center">
				<div className="card-header">
					<h3>{data.hotel.name}</h3>
					{data.hotel.address || data.hotel.zipcode || data.hotel.city || data.hotel.country ? (
						<p className="mb-0">
							{data.hotel.address}
							{data.hotel.zipcode && ' - ' + data.hotel.zipcode}
							{data.hotel.city && ' - ' + data.hotel.city}
							{data.hotel.country && ' - ' + data.hotel.country}
						</p>
					) : (
						''
					)}
				</div>
				<div className="card-body">
					<h2 className="card-title mb-0">
						{t('info.room')} #{data.room.number}
					</h2>
					<p>
						{t('info.startTime')} <Moment date={data.stay.startTime} format="DD/MM/YYYY hh:mm" />
						{data.stay.endTime && (
							<>
								{' '}
								- {t('info.endTime')} <Moment date={data.stay.endTime} format="DD/MM/YYYY hh:mm" />
							</>
						)}
					</p>
					<DataElaboration />
				</div>
				<div className="card-footer">
					<RealTime hotelId="868d1d80-a311-11ed-a8b6-63045f25f40e" roomId="ae73f580-a311-11ed-a8b6-63045f25f40e" />
				</div>
				<div className="card-footer">
					<p className="text-muted mb-1">
						{t('info.stay')} #{data.stay.id}
					</p>
					<button type="button" className="btn btn-link" onClick={() => setToken(null)}>
						{t('common.exit')}
					</button>
				</div>
			</div>
		</section>
	);
};

export default Info;

import { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faFan, faLightbulb, faFaucetDrip, faShower } from '@fortawesome/pro-solid-svg-icons';

import Api from '../helpers/Api';
import AppContext from '../helpers/AppContext';

const { REACT_APP_DE_ENDPOINT } = process.env;

const DataElaboration = ({ error }) => {
	const { t } = useTranslation();
	const { token } = useContext(AppContext);

	const [data, setData] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token) return;

		Api({
			method: 'get',
			url: '/',
			baseURL: REACT_APP_DE_ENDPOINT,
			withCredentials: false,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				setData(res.data);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				return err.globalHandler && err.globalHandler();
			});
	}, [token]);

	if (loading)
		return (
			<div className="my-5 text-muted">
				<FontAwesomeIcon icon={faFan} size="2x" spin />
				<p>{t('dataElaboration.loading')}</p>
			</div>
		);

	return (
		<>
			<FontAwesomeIcon icon={faSeedling} size="3x" className="mt-4 mb-2 text-success" />
			<h1 className="text-success mb-0 fs-0">{data.points}</h1>
			<p className="text-muted fs-10">{t('dataElaboration.points')}</p>
			<div className="row my-4 g-5">
				<div className="col-4">
					<FontAwesomeIcon icon={faLightbulb} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('dataElaboration.current')}</p>
					<h1 className="mb-0">{data.current}</h1>
					<p className="text-muted fs-10">{t('units.watt')}</p>
				</div>
				<div className="col-4">
					<FontAwesomeIcon icon={faFaucetDrip} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('dataElaboration.cold_flow_rate')}</p>
					<h1 className="mb-0">{data.cold_flow_rate}</h1>
					<p className="text-muted fs-10">{t('units.liters')}</p>
				</div>
				<div className="col-4">
					<FontAwesomeIcon icon={faShower} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('dataElaboration.hot_flow_rate')}</p>
					<h1 className="mb-0">{data.hot_flow_rate}</h1>
					<p className="text-muted fs-10">{t('units.liters')}</p>
				</div>
			</div>
		</>
	);
};

export default DataElaboration;

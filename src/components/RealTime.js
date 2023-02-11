/* eslint-disable camelcase */
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBrightness,
	faFan,
	faLightbulb,
	faDropletPercent,
	faFaucetDrip,
	faShower,
	faTemperatureQuarter,
	faTemperatureSnow,
	faTemperatureSun
} from '@fortawesome/pro-solid-svg-icons';

const {
	REACT_APP_AWS_IDENTITY_POOL_ID,
	REACT_APP_AWS_COGNITO_USER_POOL_ID,
	REACT_APP_AWS_COGNITO_CLIENT_ID,
	REACT_APP_MQTT_ID,
	REACT_APP_AWS_REGION
} = process.env;

Amplify.configure({
	Auth: {
		identityPoolId: REACT_APP_AWS_IDENTITY_POOL_ID,
		region: REACT_APP_AWS_REGION,
		userPoolId: REACT_APP_AWS_COGNITO_USER_POOL_ID,
		userPoolWebClientId: REACT_APP_AWS_COGNITO_CLIENT_ID
	}
});

Amplify.addPluggable(
	new AWSIoTProvider({
		aws_pubsub_region: REACT_APP_AWS_REGION,
		aws_pubsub_endpoint: `wss://${REACT_APP_MQTT_ID}.iot.${REACT_APP_AWS_REGION}.amazonaws.com/mqtt`
	})
);

const RealTime = ({ hotelId, roomId }) => {
	const { t } = useTranslation();
	const [data, setData] = useState({});

	useEffect(() => {
		const sub = PubSub.subscribe(`ecotrip/${hotelId}/${roomId}`).subscribe({
			next: ({ value }) => setData(value),
			error: error => console.error('MQTT ERROR:', error)
		});

		return () => sub.unsubscribe();
	}, [hotelId, roomId]);

	if (!data || !data.measures)
		return (
			<div>
				<h2 className="card-title mt-3">{t('realTime.title')}</h2>
				<div className="my-5 text-muted">
					<FontAwesomeIcon icon={faFan} size="2x" spin />
					<p>{t('realTime.loading')}</p>
				</div>
			</div>
		);

	const {
		current,
		brightness,
		humidity,
		room_temperature,
		hot_flow_rate,
		hot_water_temperature,
		cold_flow_rate,
		cold_water_temperature
	} = data.measures;

	const normalize = v => (v !== undefined ? +parseFloat(v).toFixed(2) : '-');

	return (
		<div>
			<h2 className="card-title mt-4 mb-0">{t('realTime.title')}</h2>
			<p>
				{t('realTime.time')} <Moment timestamp={data.timestamp} fromNow />
			</p>
			<div className="row my-4 g-5">
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faBrightness} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.brightness')}</p>
					<h2 className="mb-0">{normalize(brightness)}</h2>
					<p className="text-muted fs-10">{t('units.lumens')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faLightbulb} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.current')}</p>
					<h2 className="mb-0">{normalize(current)}</h2>
					<p className="text-muted fs-10">{t('units.wattHours')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faTemperatureQuarter} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.temperature')}</p>
					<h2 className="mb-0">{normalize(room_temperature)}</h2>
					<p className="text-muted fs-10">{t('units.degrees')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faDropletPercent} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.humidity')}</p>
					<h2 className="mb-0">{normalize(humidity)}</h2>
					<p className="text-muted fs-10">{t('units.percent')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faFaucetDrip} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.cold_flow_rate')}</p>
					<h2 className="mb-0">{normalize(cold_flow_rate)}</h2>
					<p className="text-muted fs-10">{t('units.litersMinutes')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faTemperatureSnow} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.cold_water_temperature')}</p>
					<h2 className="mb-0">{normalize(cold_water_temperature)}</h2>
					<p className="text-muted fs-10">{t('units.degrees')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faShower} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.hot_flow_rate')}</p>
					<h2 className="mb-0">{normalize(hot_flow_rate)}</h2>
					<p className="text-muted fs-10">{t('units.litersMinutes')}</p>
				</div>
				<div className="col-6 col-md-3">
					<FontAwesomeIcon icon={faTemperatureSun} size="2x" className="mb-2" />
					<p className="text-muted fs-10">{t('realTime.hot_water_temperature')}</p>
					<h2 className="mb-0">{normalize(hot_water_temperature)}</h2>
					<p className="text-muted fs-10">{t('units.degrees')}</p>
				</div>
			</div>
		</div>
	);
};

export default RealTime;

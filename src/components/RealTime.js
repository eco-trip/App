import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { useEffect, useState } from 'react';

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
	const [data, setData] = useState({});

	useEffect(() => {
		const sub = PubSub.subscribe(`ecotrip/${hotelId}/${roomId}`).subscribe({
			next: ({ value }) => setData(value),
			error: error => console.error('MQTT ERROR:', error)
		});

		return () => sub.unsubscribe();
	}, [hotelId, roomId]);

	return (
		<>
			<p>
				{hotelId} - {roomId}
			</p>
			<p>{JSON.stringify(data)}</p>
		</>
	);
};

export default RealTime;

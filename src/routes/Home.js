import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AppContext from '../helpers/AppContext';

import Scan from '../components/Scan';
import Info from '../components/Info';

const Home = () => {
	const { t } = useParams();

	const { token, setToken } = useContext(AppContext);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (t) setToken(t);
	}, [t]);

	if (!token) return <Scan error={error} />;

	return <Info setError={setError} />;
};

export default Home;

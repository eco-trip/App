import { useContext, useState } from 'react';

import AppContext from '../helpers/AppContext';

import Scan from '../components/Scan';
import Info from '../components/Info';

const Home = () => {
	const { token } = useContext(AppContext);
	const [error, setError] = useState(null);

	if (!token) return <Scan error={error} />;

	return <Info setError={setError} />;
};

export default Home;

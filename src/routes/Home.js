import { useContext } from 'react';

import AppContext from '../helpers/AppContext';

import Scan from '../components/Scan';
import Info from '../components/Info';

const Home = () => {
	const { token } = useContext(AppContext);

	if (!token) return <Scan />;

	return <Info />;
};

export default Home;

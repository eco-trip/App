import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorPage from '../components/extra/ErrorPage';
import Topbar from '../components/Topbar';
import Home from './Home';

const Index = () => (
	<div className="main">
		<Topbar />
		<div className="content">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/:t" element={<Home />} />
				<Route path="*" element={<ErrorPage status="404" />} />
			</Routes>
		</div>
	</div>
);

export default Index;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

const Home = () => (
	<div className="inner-content">
		<div className="d-grid gap-3">
			<h1>Home</h1>
			<p>{process.env.REACT_APP_ENDPOINT}</p>
		</div>
	</div>
);

export default Home;

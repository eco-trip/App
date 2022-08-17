import React from 'react';

const FullpageLoading = () => (
	<section className="fullpage d-flex align-items-center flex-column justify-content-center gap-5">
		<div className="logo bg-cover" />
		<div animation="grow" variant="primary">
			<span className="visually-hidden">Loading...</span>
		</div>
	</section>
);

export default FullpageLoading;

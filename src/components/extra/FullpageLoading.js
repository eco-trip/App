import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/pro-solid-svg-icons';

const FullpageLoading = () => (
	<section className="content-center full">
		<FontAwesomeIcon icon={faFan} size="2x" spin />
	</section>
);

export default FullpageLoading;

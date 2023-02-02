import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceThinking } from '@fortawesome/pro-solid-svg-icons';

const ErrorPage = ({ status = '404', link = true }) => {
	const { t } = useTranslation();

	return (
		<section className="content-center">
			<div className="d-flex flex-column gap-3 text-center justify-content-center">
				<h1>{t(status + '.title')}</h1>
				<FontAwesomeIcon icon={faFaceThinking} size="5x" />
				<p>{t(status + '.text')}</p>
				{link && <Link to="/">{t(status + '.link')}</Link>}
			</div>
		</section>
	);
};

export default ErrorPage;

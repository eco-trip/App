import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNfcSignal } from '@fortawesome/pro-solid-svg-icons';
import * as jose from 'jose';

import AppContext from '../helpers/AppContext';

const { REACT_APP_ENV, REACT_APP_GUEST_JWT_SECRET } = process.env;

const test = '8d456990-9d7e-11ed-a128-df513efaefb8';

const secret = new TextEncoder().encode(REACT_APP_GUEST_JWT_SECRET);
const alg = 'HS256';

const signJwt = async stayId => new jose.SignJWT({ stayId }).setProtectedHeader({ alg }).setIssuedAt().sign(secret);

const Scan = ({ error }) => {
	const { t } = useTranslation();
	const { setToken } = useContext(AppContext);

	const onClick = () => REACT_APP_ENV === 'dev' && signJwt(test).then(token => setToken(token));

	return (
		<section className="content-center">
			<div className="d-flex flex-column gap-3 text-center justify-content-center">
				<h1>{t('scan.title')}</h1>
				<FontAwesomeIcon icon={faNfcSignal} size="5x" onClick={onClick} />
				{error && (
					<p className="text-danger">
						<b>{t('core:errors.' + error)}</b>
					</p>
				)}
			</div>
		</section>
	);
};

export default Scan;

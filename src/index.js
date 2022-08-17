import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Routes from './routes';

import { AppProvider } from './helpers/AppContext';
import FullpageLoading from './components/extra/FullpageLoading';

import './helpers/i18n';

import './sass/style.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Suspense fallback={<FullpageLoading />}>
		<AppProvider>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</AppProvider>
	</Suspense>
);

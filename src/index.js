import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Routes from './routes';

import { AppProvider } from './helpers/AppContext';
import { ApiInterceptor } from './helpers/Api';

import FullpageLoading from './components/extra/FullpageLoading';

import './helpers/i18n';
import './sass/style.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Suspense fallback={<FullpageLoading />}>
		<AppProvider>
			<ApiInterceptor>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</ApiInterceptor>
		</AppProvider>
	</Suspense>
);

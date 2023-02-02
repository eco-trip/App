/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useLayoutEffect } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = React.createContext({});

export const AppProvider = props => {
	const [isMobile, setIsMobile] = useState(false);
	const [token, setToken] = useLocalStorage('token', false);

	useLayoutEffect(() => {
		const updateSize = () => {
			setIsMobile(window.innerHeight < 768 || window.innerWidth < 996);
		};

		window.addEventListener('resize', updateSize);
		updateSize();

		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return (
		<AppContext.Provider
			value={{
				isMobile,
				token,
				setToken
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContext;

/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useLayoutEffect } from 'react';
import Cookie from 'js-cookie';

const AppContext = React.createContext({});

export const AppProvider = props => {
	const [isMobile, setIsMobile] = useState(false);
	const [user, setUser] = useState({});

	useLayoutEffect(() => {
		const updateSize = () => {
			setIsMobile(window.innerHeight < 768 || window.innerWidth < 996);
		};

		window.addEventListener('resize', updateSize);
		updateSize();

		if (!Cookie.get('logged')) setUser(null);

		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return (
		<AppContext.Provider
			value={{
				isMobile,
				user,
				setUser
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContext;

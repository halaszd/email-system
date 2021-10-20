import React, { createContext } from 'react';

type UserContextType = {
	setIsLoggedIn: Function;
	setUsername: Function;
	// setMails: Function;
}

export const UserContext = createContext<UserContextType>(
	{
		setIsLoggedIn: () => {},
		setUsername: () => {},
		// setMails: () => {}
	}
)
import React, { createContext } from 'react';

type UserContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: Function;
	setUsername: Function;
	setMails: Function;
}

export const UserContext = createContext<UserContextType>(
	{
		isLoggedIn: false,
		setIsLoggedIn: () => {},
		setUsername: () => {},
		setMails: () => {}
	}
)
import React, { createContext } from 'react';

type UserContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: Function;
	username: string;
	setUsername: Function;
	setMails: Function;
}

export const UserContext = createContext<UserContextType>(
	{
		isLoggedIn: false,
		setIsLoggedIn: () => {},
		username: "",
		setUsername: () => {},
		setMails: () => {}
	}
)
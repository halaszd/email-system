import React, { createContext } from 'react';

type UserContextType = {
	setUserEmail: Function;
	auth : string | null;
	setAuth: Function;
	setUsername: Function;
	setMails: Function;
}

export const UserContext = createContext<UserContextType>(
	{
		setUserEmail: () => {},
		auth : null,
		setAuth: () => {},
		setUsername: () => {},
		setMails: () => {}
	}
)
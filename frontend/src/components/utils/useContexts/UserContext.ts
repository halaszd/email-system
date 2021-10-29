import React, { createContext } from 'react';

type UserContextType = {
	auth : string | null;
	setAuth: Function;
	setUsername: Function;
	setMails: Function;
}

export const UserContext = createContext<UserContextType>(
	{
		auth : null,
		setAuth: () => {},
		setUsername: () => {},
		setMails: () => {}
	}
)
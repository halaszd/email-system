import { MenuDiv, ButtonWithTextUnder } from './Styled';  
import { Link } from "react-router-dom";

type Props = {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    username: string;
}

export function Menu({ isLoggedIn, setIsLoggedIn, username }: Props) {
    return (
        <MenuDiv>
            { !isLoggedIn
            ?
            <>
                <li>
                    <Link to="registration">
                        <ButtonWithTextUnder content="Register">
                        Register
                        </ButtonWithTextUnder>
                    </Link>
                </li>
                <li>
                    <Link to="login">
                        <ButtonWithTextUnder content="Login">
                        Login
                        </ButtonWithTextUnder>
                    </Link>
                </li>
            </>
            :
            <>
                <li>
                    <Link to="login">
                        <ButtonWithTextUnder onClick={() => setIsLoggedIn(false)} content="Log out">
                        Log out
                        </ButtonWithTextUnder>
                    </Link>
                </li>
                <li>
                    <ButtonWithTextUnder content={username} borderRadius="25px">
                    {username.charAt(0).toUpperCase()}
                    </ButtonWithTextUnder>
                </li>
            </>
            }
        </MenuDiv>
    )
}

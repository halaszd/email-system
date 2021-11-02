import { MenuDiv, ButtonWithTextUnder } from './Styled';  
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from '../../constants';

type Props = {
    auth: string | null;
    setAuth: Function;
    username: string | null;
}

export function Menu({ auth, setAuth, username }: Props) {
    // console.log(auth)
    return (
        <MenuDiv>
            { auth === null
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
                        <ButtonWithTextUnder 
                        onClick={() => {setAuth(null); localStorage.removeItem(AUTH_TOKEN); console.log(localStorage.getItem(AUTH_TOKEN))}}
                        content="Log out">
                        Log out
                        </ButtonWithTextUnder>
                    </Link>
                </li>
                <li>
                    <ButtonWithTextUnder content={username} borderRadius="25px">
                    {username && username.charAt(0).toUpperCase()}
                    </ButtonWithTextUnder>
                </li>
            </>
            }
        </MenuDiv>
    )
}

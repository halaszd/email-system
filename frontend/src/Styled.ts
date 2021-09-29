import styled from '@emotion/styled';
import Registration from './components/registration/Registration';
import { Button } from 'antd'

export const MainDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: hidden;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-left: 10px;
`;

export const MainHeader = styled.div`
  width: 100%;
  display: flex; 
  gap: 110px;
  padding-top: 10px;
`;

// export const CustomButton = (props: {bg: string}) => styled(Button)`
//   background-color: ${props.bg};
// `;

type Props = {content: string, borderRadius?: string};
export const ButtonWithTextUnder = styled(Button)<Props>`
  height: 39px;
  border-radius: ${props => props.borderRadius};
  z-index: 10;

  &:hover{
      cursor: pointer;
      background-color: #eceff1;
      border-radius: ${props => props.borderRadius 
      ? props.borderRadius 
      : '5px'};

      &::after {
        content: '${props => props.content}';
        color: white;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0.08rem;
        position: absolute;
        /* top: 41px; */
        left: 50%;
        top: 130%;
        transform: translate(-50%);
        padding: 3px;
        background-color: grey;
        border-radius: 3px;
      }
    }
`;

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  background-color:#ffffff;
  overflow-y: hidden; // important

  button a {
    color: white;
  }
`;

export const LoginRegistration = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
`;

export const RegistratonDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-height: 80vh;
  border: 1px solid #dadce0;
  padding: 60px;
  border-radius: 8px;

  h1 {
    font-weight: 400;
  }
`;

export const ModRegistration = styled(Registration)`
  width: 100%;
  display: flex;
`;
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

  &:hover{
      cursor: pointer;
      background-color: #eceff1;
      border-radius: 5px;

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
  padding-left: 10px;;


  button a {
    color: white;
  }
`;

export const LoginRegistration = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModRegistration = styled(Registration)`
  width: 100%;
  display: flex;
`;
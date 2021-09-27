import styled from '@emotion/styled';
import Registration from './components/registration/Registration';

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  padding: 10px 0px 0 0;
  background-color:#ffffff;
  overflow-y: hidden; // important

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
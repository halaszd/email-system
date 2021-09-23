import styled from '@emotion/styled';
import { Button } from 'antd'

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  padding: 10px 0px 0 0;
  background-color:#ffffff;
  overflow-y: hidden; // important

  .login-registration {
    margin: auto;
  }
  
  button a {
    color: white;
  }
`;

export const SideBar = styled.ul`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 95px; // danger!
`;

export const SubSideBar = styled(SideBar)`
  padding-top: 0;
`;

export const ModButton = styled(Button)`
  width: 150px;

  :hover {
    width: 155px;
  }
`
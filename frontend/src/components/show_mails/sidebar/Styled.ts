import styled from '@emotion/styled';
import { Button } from 'antd'

export const SideBarContainer = styled.ul`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 95px; // danger!
  padding-left: 10px;
`;

export const SubSideBar = styled(SideBarContainer)`
  padding: 0;
`;

export const ModButton = styled(Button)`
  width: 150px; 
  font-weight: 500;
  background-color: #1a73e8;

  :hover {
    width: 155px;
  }
`
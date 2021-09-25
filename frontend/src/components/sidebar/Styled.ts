import styled from '@emotion/styled';
import { Button } from 'antd'

export const SideBarContainer = styled.ul`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 95px; // danger!
`;

export const SubSideBar = styled(SideBarContainer)`
  padding-top: 0;
`;

export const ModButton = styled(Button)`
  width: 150px;

  :hover {
    width: 155px;
  }
`
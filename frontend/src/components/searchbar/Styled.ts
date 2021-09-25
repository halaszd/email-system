import styled from '@emotion/styled';
import { Input } from 'antd';

const { Search } = Input;

export const SearchDiv = styled.div`
  width: 60vw;
  height: 50px;

`;

export const SearchContainer = styled.div`
  position: absolute;
  width: 55vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 20;
  box-shadow: 1px 1px 3px #5f6368;
  border-radius: 5px;
`;

export const ModSearch = styled(Search)`
  width: 100%;
`;

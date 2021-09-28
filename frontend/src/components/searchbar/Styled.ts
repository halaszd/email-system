import styled from '@emotion/styled';
import { Input } from 'antd';

const { Search } = Input;

export const SearchDiv = styled.div`
  width: 100%;
  height: 50px;
`;

export const SearchContainer = styled.div`
  position: absolute;
  width: 55vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #eceff1;
  border-radius: 5px;
  z-index: 20;
`;

export const ModSearch = styled(Search)`
  background-color: #f1f3f4;
  border-radius: 5px;
`; 

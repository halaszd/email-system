import React from 'react'
import styled from '@emotion/styled'
import { Input } from 'antd';
const { Search } = Input;

const SearchDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const ModSearch = styled(Search)`
  width:500px;
`;

const SearchBar = () => {
	function onSearch () {}

	return (
		<SearchDiv>
			<ModSearch placeholder="input search text" allowClear onSearch={onSearch} style={{}} />
		</SearchDiv>
	)
}

export default SearchBar

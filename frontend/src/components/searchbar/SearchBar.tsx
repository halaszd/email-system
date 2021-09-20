import React from 'react'
import styled from '@emotion/styled'
import { Input } from 'antd';
const { Search } = Input;

const SearchDiv = styled.div`
  width: 60vw;
  height: 50px;
  display: flex;
`;

const ModSearch = styled(Search)`
  width: 100%;
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

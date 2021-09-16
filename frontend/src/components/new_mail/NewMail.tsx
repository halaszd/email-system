import React from 'react'
import styled from '@emotion/styled'
import { Input } from 'antd';

const { TextArea } = Input;


const NewMailContainer = styled.div`
  position: absolute;
  min-width: 500px;
  height: 400px;
  bottom: 0;
  right: 30px;
  padding: 0 30px 0 0;
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  gap:10px;
`;

const NewMail = () => {
	return (
		<NewMailContainer>
      <form onSubmit={() => ("something")}>
        <TextArea rows={4} />
      </form>
		</NewMailContainer>
	)
}

export default NewMail
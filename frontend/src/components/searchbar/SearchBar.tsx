import React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';

import { useState, useEffect } from 'react';

import FetchedMail from '../interfaces/FetchedMail';

import Results from '../results/Results';

const { Search } = Input;

const SearchDiv = styled.div`
  width: 60vw;
  height: 50px;

	.search-container {
    position: absolute;
    width: 55vw;
    display: flex;
    flex-direction: column;
    background-color: white;
    z-index: 20;
    box-shadow: 1px 1px 3px #5f6368;
    border-radius: 5px;
  }
`;

const ModSearch = styled(Search)`
  width: 100%;
`;

type Props = {
	mails: FetchedMail[] | null;
}

const SearchBar: React.FC<Props> = props => {
	const [resultMails, setResultMails] = useState<FetchedMail[] | null>(null)
	const [currentInput, setCurrentInput] = useState<React.ChangeEvent<HTMLInputElement>>();

	useEffect(() => {
    setResultMails(null)
		function handleChange() {
      if(!currentInput || !props.mails) {
        return;
      }

      const inputToFind = currentInput.target.value.toLowerCase();

      if(inputToFind === "") {
        return;
      }

      const currentResultMails: FetchedMail[] = [];

      for(const mail of props.mails) {
        const allStringFromEmail = 
        mail.to + " " +
        mail.fromEmailAddress + " " +
        mail.from + " " +
        mail.fromEmailAddress + " " +
        mail.subject + " " +
        mail.message
        .toLowerCase();

        if(allStringFromEmail.includes(inputToFind)) {
          currentResultMails.push(mail);
          setResultMails(currentResultMails);
        } 
      }
			console.log(currentInput ? currentInput.target : null)
		}

		handleChange();
    
	}, [currentInput])

	function onSearch (word: string) {
		console.log(word)
	}

	return (
		<SearchDiv>
			<div className="search-container">
				<ModSearch placeholder="input search text" allowClear onSearch={(word) => onSearch(word)} onChange={(e) => setCurrentInput(e)}/>
				{resultMails && <Results resultMails={resultMails}/>}
			</div>
		</SearchDiv>
	)
}

export default SearchBar

import React from 'react';
import { SearchDiv, ModSearch } from './Styled';

import { useState, useEffect } from 'react';

import FetchedMail from '../interfaces/FetchedMail';

import Results from '../results/Results';


type Props = {
	mails: FetchedMail[] | null;
  setMails: Function;
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

const SearchBar: React.FC<Props> = props => {
	const [resultMails, setResultMails] = useState<FetchedMail[] | null>(null)
  const [showResultMails, setShowResultMails] = useState(false);
	const [currentInput, setCurrentInput] = useState<React.ChangeEvent<HTMLInputElement>>();

	useEffect(() => {
    setResultMails(null);
    setShowResultMails(true);

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
		}

		handleChange();

	}, [currentInput])

	function onSearch (word: string) {
    if(word === "") {
      return;
    }
    setShowResultMails(false);
    props.setMails(resultMails);
    props.setOpenedMailID(null);
    props.setIsOpenedMail(false);
	}

	return (
		<SearchDiv>
			<div className="search-container">
				<ModSearch placeholder="input search text" allowClear onSearch={(word) => onSearch(word)} onChange={(e) => setCurrentInput(e)}/>
				{ showResultMails && resultMails &&
        <Results resultMails={resultMails} setIsOpenedMail={props.setIsOpenedMail} 
        setOpenedMailID={props.setOpenedMailID} setResultMails={setResultMails}/>}
			</div>
		</SearchDiv>
	)
}

export default SearchBar

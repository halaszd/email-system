import React from 'react';
import { useContext } from 'react';
import { SearchBarContext } from '../useContexts/SearchBarContext';
import { useState, useEffect } from 'react';
import FetchedMail from '../interfaces/FetchedMail';
import Results from '../results/Results';

import { SearchDiv, ModSearch } from './Styled';

type Props = {
	mails: FetchedMail[];
  setMails: Function;
}

// -------------------- Component -------------------- 
const SearchBar = (
  {
    mails, 
    setMails, 
  }: Props) => {

    const {setIsOpenedMail, setOpenedMailID} = useContext(SearchBarContext);
    
    const [resultMails, setResultMails] = useState<FetchedMail[]>([])
    const [showResultMails, setShowResultMails] = useState(false);
    const [currentInput, setCurrentInput] = useState<React.ChangeEvent<HTMLInputElement>>();

    useEffect(() => {
      setResultMails([]);
      setShowResultMails(true);

		function handleChange() {
      if(!currentInput || mails === []) {
        return;
      }

      const inputToFind = currentInput.target.value.toLowerCase();

      if(inputToFind === "") {
        return;
      }

      const currentResultMails: FetchedMail[] = [];

      for(const mail of mails) {
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
    setMails(resultMails);
    setOpenedMailID(null);
    setIsOpenedMail(false);
	}

	return (
		<SearchDiv>
			<div className="search-container">
				<ModSearch placeholder="input search text" allowClear 
        onSearch={(word) => onSearch(word)} onChange={(e) => setCurrentInput(e)}/>

				{ showResultMails && resultMails &&
        <Results resultMails={resultMails} setResultMails={setResultMails}/> }
			</div>
		</SearchDiv>
	)
}

export default SearchBar

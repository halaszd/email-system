import React from 'react';
import { useMail } from '../utils/useContexts/MailContextProvider';  
import { useState, useEffect } from 'react';
import { FetchedMail } from '../utils/types/FetchedMail';
import Results from './results/Results';
import { SearchDiv, SearchContainer, ModSearch } from './Styled';

// -------------------- Component -------------------- 
const SearchBar = ()=> {

    const {setMails, mails: {mailsPerPage, typeOfMail, userMails}, setIsOpenedMail, setOpenedMailID} = useMail();
    
    const [filteredMails, setFilteredMails] = useState<FetchedMail[]>([])
    const [showResultMails, setShowResultMails] = useState(false);
    const [currentInput, setCurrentInput] = useState<React.ChangeEvent<HTMLInputElement>>();

    useEffect(() => {
      setFilteredMails([]);
      setShowResultMails(true);

      function handleChange() {
        if(!currentInput || filteredMails === []) {
          return;
        }

        const inputToFind = currentInput.target.value.toLowerCase();

        if(inputToFind === "") {
          return;
        }

        const currentResultMails: FetchedMail[] = [];

        for(const mail of userMails) {
          const allStringFromEmail = 
            mail.fromUser.email + " " +
            mail.toUser.email + " " +
            mail.email.subject + " " +
            mail.email.message
            .toLowerCase();

          if(allStringFromEmail.includes(inputToFind)) {
            currentResultMails.push(mail);
            setFilteredMails(currentResultMails);
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

    setMails({
      totalNumOfMails: userMails.length,
      typeOfMail: typeOfMail,
      mailsPerPage: mailsPerPage, 
      mails: userMails});

    setOpenedMailID(null);
    setIsOpenedMail(false);
	}

	return (
		<SearchDiv>
			<SearchContainer>
				<ModSearch 
        placeholder="Search mail" size="large" 
        bordered={false} allowClear 
        onSearch={(word) => onSearch(word)} 
        onChange={(e) => setCurrentInput(e)} />

				{ showResultMails && filteredMails &&
        <Results filteredMails={filteredMails} setFilteredMails={setFilteredMails}/> }
			</SearchContainer>
		</SearchDiv>
	)
}

export default SearchBar

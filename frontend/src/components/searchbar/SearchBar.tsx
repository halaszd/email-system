import React from 'react';
import { useMail } from '../utils/useContexts/MailContextProvider';  
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { MAIL_SEARCH_QUERY } from '../../queries_mutations';
import { FetchedMail } from '../utils/types/FetchedMail';
import Results from './results/Results';
import { SearchDiv, SearchContainer, ModSearch } from './Styled';

// -------------------- Component -------------------- 
const SearchBar = ()=> {

    const {setMails, mails: {mailsPerPage, typeOfBox, userMails}, setIsOpenedMail, setOpenedMailID} = useMail();
    
    // const [filteredMails, setFilteredMails] = useState<FetchedMail[]>([])
    // const [showResultMails, setShowResultMails] = useState(false);
    // const [currentInput, setCurrentInput] = useState<React.ChangeEvent<HTMLInputElement>>();
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data, loading }] = useLazyQuery(MAIL_SEARCH_QUERY)
    useEffect(() => {
      function handleChange() {
        if(searchFilter === "") {
          
          // return;
        }

        executeSearch({
          variables: {
            typeOfBox: typeOfBox,
            filter: searchFilter
          }
        }) 
      }
      handleChange();
      // setFilteredMails([]);
      // setShowResultMails(true);

      // function handleChange() {
      //   if(!currentInput || filteredMails === []) {
      //     return;
      //   }

      //   const inputToFind = currentInput.target.value.toLowerCase();

      //   if(inputToFind === "") {
      //     return;
      //   }

      //   const currentResultMails: FetchedMail[] = [];

      //   for(const mail of userMails) {
      //     const allStringFromEmail = 
      //       mail.fromUser.email + " " +
      //       mail.toUser.email + " " +
      //       mail.email.subject + " " +
      //       mail.email.message
      //       .toLowerCase();

      //     if(allStringFromEmail.includes(inputToFind)) {
      //       currentResultMails.push(mail);
      //       setFilteredMails(currentResultMails);
      //     } 
      //   }
      // }

      // handleChange();

	}, [searchFilter])

	function onSearch (word: string) {
    if(word === "") {
      return;
    }
    // setShowResultMails(false);

    // setMails({
    //   totalNumOfMails: userMails.length,
    //   typeOfMail: typeOfBox,
    //   mailsPerPage: mailsPerPage, 
    //   mails: userMails});

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
        // onChange={(e) => setCurrentInput(e)} />
        onChange={ (e) => {
          setSearchFilter(e.target.value);
          // handleChange();
          }} />

				{ data &&
        // console.log("search result: ", data, data["searchEmails"])
        // showResultMails && filteredMails &&
        <>
        {console.log(data["searchEmails"])}
        <Results 
          filteredMails={data["searchEmails"]} 
          // setFilteredMails={setFilteredMails}
          /> 
          </>
          }
			</SearchContainer>
		</SearchDiv>
	)
}

export default SearchBar

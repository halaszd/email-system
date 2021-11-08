import React from 'react';
import { useMail } from '../utils/useContexts/MailContextProvider';  
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { MAIL_SEARCH_QUERY } from '../../queries_mutations';
import Results from './results/Results';
import { SearchDiv, SearchContainer, ModSearch } from './Styled';

// -------------------- Component -------------------- 
const SearchBar = ()=> {

    const {
      setIsToFetch,
      setMails, 
      mails: {
        mailsPerPage, 
        typeOfBox, 
      }, 
      setIsOpenedMail, 
      setOpenedMailID
    } = useMail();
    
    const [showResultMails, setShowResultMails] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data, loading }] = useLazyQuery(MAIL_SEARCH_QUERY)

    useEffect(() => {
      async function handleChange() {
        if(searchFilter === '') {
          setShowResultMails(false)
        } else {
          setShowResultMails(true)
        }
        executeSearch({
          variables: {
            typeOfBox: typeOfBox,
            filter: searchFilter
          } 
        })
      }
      handleChange();

	}, [searchFilter])

	function onSearch (word: string) {
    if(word === "" || !data) {
      return;
    }
    
    setMails({
      totalNumOfMails: data["searchEmails"].length,
      typeOfMail: typeOfBox,
      mailsPerPage: mailsPerPage, 
      userMails: data["searchEmails"]});

    setOpenedMailID(null);
    setIsOpenedMail(false);
    setShowResultMails(false);
    setIsToFetch(false)
	}

	return (
		<SearchDiv>
			<SearchContainer>
				<ModSearch 
        placeholder="Search mail" size="large" 
        bordered={false} allowClear 
        onSearch={(word) => onSearch(word)} 
        onChange={ (e) => {
          setSearchFilter(e.target.value);
          }} />

				{ showResultMails && data &&
        <Results 
          filteredMails={data["searchEmails"]} 
          setShowResultMails={setShowResultMails}
          /> 
          }
			</SearchContainer>
		</SearchDiv>
	)
}

export default SearchBar

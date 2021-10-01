import React from 'react'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MailContext } from '../useContexts/MailContext';
import { fetchMails } from '../functions/fetchMails';
import { FetchedMail } from '../types/FetchedMail';
import { Header, TrashIconContainer } from "./Styled";
import { DeleteFilled } from '@ant-design/icons'
import { Pagination } from 'antd';

const MailsHeader = () => {
	const {
    mails, 
    setCheckedMailIDs, 
    checkedMailIDs, 
    setMails, 
    typeOfMail,
    openedMail,
	  isOpenedMail,
    openedMailID,
	  setOpenedMailID
  	} = useContext(MailContext);

  const [isSinglePagePagination, setIsSinglePagePagination] = useState(false);
  const [singlePageNumber, setSinglePageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [multiMailPageNumber, setMultiMailPageNumber] = useState(1);
  const [multiMailPageSize, setMultiMailPageSize] = useState(20);

  useEffect(() => {
    fetchMails(typeOfMail, multiMailPageNumber, multiMailPageSize, setMails);

  }, [multiMailPageNumber, multiMailPageSize])

  useEffect(() => {
    if(isOpenedMail && openedMail) {
      const singlePageNumber = (mails["mails"].indexOf(openedMail)) + 1;
      const toAddSinglePageNumber = multiMailPageSize * (multiMailPageNumber - 1);
      setSinglePageNumber(singlePageNumber + toAddSinglePageNumber);
      if(!isSinglePagePagination) {
        setIsSinglePagePagination(true);
        setPageSize(1)
      }
    }
  }, [openedMail])

  useEffect(() => {
    if(isOpenedMail) {
      return;
    }
    setIsSinglePagePagination(false);

    setMultiMailPageSize(20)
    setMultiMailPageNumber(1)

  }, [isOpenedMail])

  function handleDeletion() {
    if(!isOpenedMail) {
      deleteCheckedMails();
      return;
    }

    deleteSingleMail();
  } 

  function deleteSingleMail() {
    const newMails: FetchedMail[] = [];

    for(const mail of mails["mails"]) {
      if(mail.id !== openedMailID) {
        newMails.push(mail);
      }
    }

    setMails({totalNumOfMails: mails["totalNumOfMails"] - 1, mails: newMails});

    if(newMails.length !== 0){
      setOpenedMailID(newMails[0].id);
    } else {
      setOpenedMailID(null);
    }
  }

	function deleteCheckedMails() {
		// Deleting the checked mails and collecting them in another array
		const deletedMails: FetchedMail[] = [];
		const newMails: FetchedMail[] = [];

		if(mails["mails"].length === 0) {
		  return;
		}

		for(const mail of mails["mails"]) {
      let isFoundMail = false;

      for(const id of checkedMailIDs) {
        if(mail.id === id) {
        // Collecting deleted mails for further purpuses
        deletedMails.push(mail)
        isFoundMail = true;
        break;
        }
		  }

      if(!isFoundMail) {
        newMails.push(mail)
      }
		}
		// Until the real sever is no on: Gives back only the not deleted emails
    setMails({totalNumOfMails: mails["totalNumOfMails"] - deletedMails.length, mails: newMails});
		// To clear the IDs of formerly checked emails
		setCheckedMailIDs([]);
  }

  async function onChange(pageNumberOnChange: number) {
    console.log('Page: ', pageNumberOnChange);

    if(!isSinglePagePagination){
      setMultiMailPageNumber(pageNumberOnChange);
      return;
    }

    if(isOpenedMail && openedMail) {
      const mailIndex = pageNumberOnChange - (multiMailPageSize * (multiMailPageNumber-1))
      setOpenedMailID(mails["mails"][mailIndex-1].id);
    }

    setSinglePageNumber(pageNumberOnChange)
  }

  async function onShowSizeChange(current: number, pageSizeOnChange: number) {
    console.log(current, pageSizeOnChange);

    if(!isSinglePagePagination) {
      setMultiMailPageSize(pageSizeOnChange);
      return;
    }

    setPageSize(pageSizeOnChange);
  }

	return (
		<div>
      <Header>
        <TrashIconContainer>
          <DeleteFilled className="delete-all" onClick={handleDeletion}/>
        </TrashIconContainer>
        <h1>{`${typeOfMail.charAt(0).toUpperCase()}${typeOfMail.slice(1)}`}</h1>
        { isOpenedMail
          ?
          <Pagination
            size="small"
            total={mails["totalNumOfMails"]}
            showTotal={(total) => `${singlePageNumber} of ${total}` }
            showQuickJumper={false}
            showSizeChanger={false}
            pageSize={1}
            defaultCurrent={1}
            current={singlePageNumber}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />

          :
          <Pagination
            size="small"
            total={mails["totalNumOfMails"]}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            showQuickJumper={false}
            pageSize={multiMailPageSize}
            defaultCurrent={1}
            current={multiMailPageNumber}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        }
      </Header>
			
		</div>
	)
}

export default MailsHeader

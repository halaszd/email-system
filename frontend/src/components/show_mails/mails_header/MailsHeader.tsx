import React from 'react'
import { useState, useEffect } from 'react';
import { useMail } from '../../utils/useContexts/MailContextProvider'
import { fetchMails } from '../../utils/functions/fetchMails';
import { FetchedMail } from '../../utils/types/FetchedMail';
import { Header, TrashIconContainer } from "./Styled";
import { DeleteFilled } from '@ant-design/icons'
import { Pagination } from 'antd';

const MailsHeader = () => {
	const {
    isSideBarClicked,
    mails: {totalNumOfMails, mailsPerPage, typeOfMail, mails}, 
    setCheckedMailIDs, 
    checkedMailIDs, 
    setMails, 
    openedMail,
	  isOpenedMail,
    openedMailID,
	  setOpenedMailID
  	} = useMail();

  const [isSinglePagePagination, setIsSinglePagePagination] = useState(false);
  const [singlePageNumber, setSinglePageNumber] = useState(1);
  const [multiMailPageNumber, setMultiMailPageNumber] = useState(1);
  const [multiMailPageSize, setMultiMailPageSize] = useState(mailsPerPage);

  useEffect(() => {
    async function fetchCurrentMails() {
      // const currentMails = await fetchMails(typeOfMail, multiMailPageNumber, multiMailPageSize, setMails);
      const currentMails = await fetchMails(typeOfMail, multiMailPageNumber, multiMailPageSize, setMails);

      if(isOpenedMail) {
        // if we hit either end of the current list of mails while paginating:
        // 1. Was moving forward: set the opened mail to the first element of the fetched list
        if(singlePageNumber % 10 === 0) {
          setOpenedMailID(currentMails.mails[0].id);
        } 
        // 2. Was moving backwards: set the opened mail to the last element of the fethed list
        else {
          setOpenedMailID(currentMails.mails[currentMails.mails.length - 1].id);
        }
      }
    }
    fetchCurrentMails();

  }, [multiMailPageNumber, multiMailPageSize])

  useEffect(() => {
    console.log("51 use isopenedmail: ", isOpenedMail)
    if(!isOpenedMail || !openedMail) {
      return;
    }

    const singlePageNumber = (mails.indexOf(openedMail)) + 1;
    const toAddSinglePageNumber = multiMailPageSize * (multiMailPageNumber - 1);
    setSinglePageNumber(singlePageNumber + toAddSinglePageNumber);

    if(!isSinglePagePagination) {
      setIsSinglePagePagination(true);
    }
  }, [openedMail])

  useEffect(() => {
    setIsSinglePagePagination(false);

  }, [isSideBarClicked])

  function handleDeletion() {
    if(!isOpenedMail) {
      deleteCheckedMails();
      return;
    }
    deleteSingleMail();
  } 

  async function deleteSingleMail() {
    // single mail deletion is working, but due to that 
    // fetched mails are always the same (server dont delete
    // the mails just the frontend) you can delete in a loop forever
    if(!openedMail){
      return;
    }

    let newMails: FetchedMail[] = [];
    console.log("opened mal: ", openedMail)
    let deletedMailIndex = 0;

    for(const [i, mail] of mails.entries()){
      if(mail.id === openedMailID) {
        deletedMailIndex = i;
        console.log("total and single: ", totalNumOfMails, singlePageNumber)
        
        if(i < mails.length - 1) {
          newMails = [...newMails, ...mails.slice(i + 1, mails.length)]
        }
        else if(singlePageNumber !== totalNumOfMails) {
          setMultiMailPageNumber(multiMailPageNumber + 1);
          return;
        }
        else if(mails.length > 1) {
          deletedMailIndex = i - 1;
        } else {
          setMultiMailPageNumber(multiMailPageNumber - 1);
          return;
        } 
        break;
      }
        newMails.push(mail);
      }

    console.log(newMails)

    setMails(
      {
        totalNumOfMails: totalNumOfMails - 1, 
        mailsPerPage: mailsPerPage,
        typeOfMail: typeOfMail,
        mails: newMails
      });

    if(newMails.length !== 0){
      setOpenedMailID(newMails[deletedMailIndex].id);
    } else {
      setOpenedMailID(null);
    }
  }

	function deleteCheckedMails() {
		// Deleting the checked mails and collecting them in another array
		const deletedMails: FetchedMail[] = [];
		const newMails: FetchedMail[] = [];

		if(mails.length === 0) {
		  return;
		}

		for(const mail of mails) {
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
    setMails(
      {
        totalNumOfMails: totalNumOfMails - deletedMails.length,
        mailsPerPage: mailsPerPage,
        typeOfMail: typeOfMail,
        mails: newMails});
		// To clear the IDs of formerly checked emails
		setCheckedMailIDs([]);
  }

  async function onChange(pageNumberOnChange: number) {
    console.log('Page: ', pageNumberOnChange);

    if(!isSinglePagePagination){
      setMultiMailPageNumber(pageNumberOnChange);
      return;
    }

    const mailIndex = (pageNumberOnChange - (multiMailPageSize * (multiMailPageNumber-1))) - 1;
    if (mailIndex === mails.length) {
      setMultiMailPageNumber(multiMailPageNumber + 1);
      return;
    }
    else if(mailIndex < 0) {
      setMultiMailPageNumber(multiMailPageNumber - 1);
      return;
    }

    setOpenedMailID(mails[mailIndex].id);
    // }

    setSinglePageNumber(pageNumberOnChange)
  }

  async function onShowSizeChange(current: number, pageSizeOnChange: number) {
    console.log(current, pageSizeOnChange);

    if(!isSinglePagePagination) {
      setMultiMailPageSize(pageSizeOnChange);
      return;
    }
  }

	return (
		<div>
      {/* <Header>
        <TrashIconContainer>
          <DeleteFilled className="delete-all" onClick={handleDeletion}/>
        </TrashIconContainer>
        <h1>{typeOfMail && `${typeOfMail.charAt(0).toUpperCase()}${typeOfMail.slice(1)}`}</h1>
        { isOpenedMail
          ?
          <Pagination
            size="small"
            total={totalNumOfMails}
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
            total={totalNumOfMails}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            showQuickJumper={false}
            showSizeChanger={true}
            pageSize={multiMailPageSize}
            defaultCurrent={1}
            current={multiMailPageNumber}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        }
      </Header> */}
			
		</div>
	)
}

export default MailsHeader

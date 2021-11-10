import React from 'react'
import { useState, useEffect } from 'react';
import { useMail } from '../../utils/useContexts/MailContextProvider'
import { useMutation, useLazyQuery } from '@apollo/client';
import { 
  DELETE_MAILS_MUTATION, 
  MAIL_QUERY,
  UPDATE_MAILS_PER_PAGE_MUTATION
} from '../../../queries_mutations';
import { queryUserMails } from '../../..';
import { FetchedMail } from '../../utils/types/FetchedMail';
import { Header, TrashIconContainer } from "./Styled";
import { DeleteFilled } from '@ant-design/icons'
import { Pagination } from 'antd';

const MailsHeader = () => {
    const {
        isSideBarClicked,
        mails: { 
          allInBoxtypeCount, 
          mailsPerPage, 
          typeOfBox, 
          userMails 
        },
        setCheckedMailIDs,
        checkedMailIDs,
        setMails,
        openedMail,
        isOpenedMail,
        openedMailID,
        setOpenedMailID, 
        setIsToFetch
    } = useMail();

    const [isSinglePagePagination, setIsSinglePagePagination] = useState(false);
    const [singlePageNumber, setSinglePageNumber] = useState(1);
    const [multiMailPageNumber, setMultiMailPageNumber] = useState(1);
    const [multiMailPageSize, setMultiMailPageSize] = useState(mailsPerPage);

    const [executeMailQuery] = useLazyQuery(
        MAIL_QUERY,
        {
            variables: {
                typeOfBox,
                skip: mailsPerPage * (multiMailPageNumber - 1),
                orderBy: { createdAt: 'desc'}
            },
            onCompleted: mails => {setMails(mails["emails"]); setIsToFetch(false)},
            fetchPolicy: 'network-only'
        }
    )

    const [deleteMails] = useMutation(DELETE_MAILS_MUTATION, {
        variables: {
            userMailIds: checkedMailIDs
        },
        onCompleted: () => executeMailQuery()
    })

    const [updateMailsPerPage] = useMutation(UPDATE_MAILS_PER_PAGE_MUTATION, {
      variables: {
        mailsPerPage: multiMailPageSize
      },
      onCompleted: () => executeMailQuery()
    })


      useEffect(() => {
        async function updatePageSize() {
          if(mailsPerPage === -1 && multiMailPageSize === -1) {
            return;
          }
          if(multiMailPageSize === -1) {
            setMultiMailPageSize(mailsPerPage)
          }
          
          if(isOpenedMail) {
            const skip = mailsPerPage * (multiMailPageNumber - 1)
            const mails = await queryUserMails(
              typeOfBox, 
              skip,
              { createdAt: 'desc'},
              setMails)
              
            // if we hit either end of the current list of mails while paginating:
            // 1. Was moving forward: set the opened mail to the first element of the fetched list
              if(singlePageNumber % multiMailPageSize === 0) {
              setOpenedMailID(mails["userMails"][0].id);
            } 
            // 2. Was moving backwards: set the opened mail to the last element of the fethed list
            else {
              setOpenedMailID(mails["userMails"][mails["userMails"].length - 1].id);
            }
          } else {
            await updateMailsPerPage();
          }
        }

        updatePageSize()

      }, [multiMailPageNumber, multiMailPageSize, mailsPerPage])

      useEffect(() => {
        if(!isOpenedMail || !openedMail) {
          return;
        }
        const singlePageNumber = (userMails.indexOf(openedMail)) + 1;
        const toAddSinglePageNumber = multiMailPageSize * (multiMailPageNumber - 1);
        setSinglePageNumber(singlePageNumber + toAddSinglePageNumber);

        if(!isSinglePagePagination) {
          setIsSinglePagePagination(true);
        }
      }, [openedMail])

      useEffect(() => {
        setIsSinglePagePagination(false);
        setMultiMailPageNumber(1)
        setSinglePageNumber(1)

      }, [isSideBarClicked])

    function handleDeletion() {
        if (!isOpenedMail) {
            deleteCheckedMails();
            return;
        }
        deleteSingleMail();
    }

      async function deleteSingleMail() {
        if(!openedMail){
          return;
        }

        let newMails: FetchedMail[] = [];
        let deletedMailIndex = 0;
        let deletedMailId = null;

        for(const [i, mail] of userMails.entries()){
          if(mail.id === openedMailID) {
            deletedMailIndex = i;
            deletedMailId = mail.id;

            if(i < userMails.length - 1) {
              newMails = [...newMails, ...userMails.slice(i + 1, userMails.length)]
            }
            else if(singlePageNumber !== allInBoxtypeCount) {
              setMultiMailPageNumber(multiMailPageNumber + 1);
              return;
            }
            else if(userMails.length > 1) {
              deletedMailIndex = i - 1;
            } else {
              setMultiMailPageNumber(multiMailPageNumber - 1);
              return;
            } 
            break;
          }
            newMails.push(mail);
          }
          
          if(!deletedMailId) {
              return;
          }

        if(newMails.length !== 0){
          setOpenedMailID(newMails[deletedMailIndex].id);
          console.log(newMails[deletedMailIndex])
        } else {
          setOpenedMailID(null);
        }
        deleteMails({
            variables: {
                userMailIds: [deletedMailId] 
            }
        })
      }

    function deleteCheckedMails() {
        if (userMails.length === 0) {
            return;
        }

        deleteMails({
            variables: {
                userMailIds: checkedMailIDs
            }
        })
        setCheckedMailIDs([]);
    }

      async function onChange(pageNumberOnChange: number) {
        if(!isSinglePagePagination){
          setMultiMailPageNumber(pageNumberOnChange);
          return;
        }

        const mailIndex = (pageNumberOnChange - (multiMailPageSize * (multiMailPageNumber-1))) - 1;
        if (mailIndex === userMails.length) {
          setMultiMailPageNumber(multiMailPageNumber + 1);
          return;
        }
        else if(mailIndex < 0) {
          setMultiMailPageNumber(multiMailPageNumber - 1);
          return;
        }

        setOpenedMailID(userMails[mailIndex].id);
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
            <Header>
                <TrashIconContainer>
                    <DeleteFilled className="delete-all" onClick={handleDeletion} />
                </TrashIconContainer>
                <h1>{typeOfBox && `${typeOfBox.charAt(0).toUpperCase()}${typeOfBox.slice(1)}`}</h1>
                { isOpenedMail
          ?
          <Pagination
            size="small"
            total={allInBoxtypeCount}
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
            total={allInBoxtypeCount}
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
            </Header>
        </div>
    )
}

export default MailsHeader

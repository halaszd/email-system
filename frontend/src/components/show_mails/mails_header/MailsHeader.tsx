import React from 'react'
import { useState, useEffect } from 'react';
import { useMail } from '../../utils/useContexts/MailContextProvider'
import { useMutation, useLazyQuery } from '@apollo/client';
import { DELETE_MAILS_MUTATION, MAIL_QUERY } from '../../../queries_mutations';
import { FetchedMail } from '../../utils/types/FetchedMail';
import { Header, TrashIconContainer } from "./Styled";
import { DeleteFilled } from '@ant-design/icons'
import { Pagination } from 'antd';

const MailsHeader = () => {
    const {
        isSideBarClicked,
        mails: { allInBoxtypeCount, mailsPerPage, typeOfBox, userMails },
        setCheckedMailIDs,
        checkedMailIDs,
        setMails,
        openedMail,
        isOpenedMail,
        openedMailID,
        setOpenedMailID, 
        userEmail,
        setIsToFetch
    } = useMail();

    const [isSinglePagePagination, setIsSinglePagePagination] = useState(false);
    const [singlePageNumber, setSinglePageNumber] = useState(1);
    const [multiMailPageNumber, setMultiMailPageNumber] = useState(1);
    const [multiMailPageSize, setMultiMailPageSize] = useState(mailsPerPage);

    const [executeMailQuery, {data, loading}] = useLazyQuery(
        MAIL_QUERY,
        {
            variables: {
                typeOfBox,
                userEmail,
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


    //   useEffect(() => {
    //     async function fetchCurrentMails() {
    //         const currentMails = await fetchMails(typeOfMail, multiMailPageNumber, multiMailPageSize, setMails);
    //         // const currentMails = useQueryMails(typeOfMail, multiMailPageNumber, multiMailPageSize, setMails)

    //       if(isOpenedMail) {
    //         // if we hit either end of the current list of mails while paginating:
    //         // 1. Was moving forward: set the opened mail to the first element of the fetched list
    //         if(singlePageNumber % 10 === 0) {
    //           setOpenedMailID(currentMails.mails[0].id);
    //         } 
    //         // 2. Was moving backwards: set the opened mail to the last element of the fethed list
    //         else {
    //           setOpenedMailID(currentMails.mails[currentMails.mails.length - 1].id);
    //         }
    //       }
    //     }
    //     fetchCurrentMails();

    //   }, [multiMailPageNumber, multiMailPageSize])

    //   useEffect(() => {
    //     // console.log("51 use isopenedmail: ", isOpenedMail)
    //     if(!isOpenedMail || !openedMail) {
    //       return;
    //     }

    //     const singlePageNumber = (mails.indexOf(openedMail)) + 1;
    //     const toAddSinglePageNumber = multiMailPageSize * (multiMailPageNumber - 1);
    //     setSinglePageNumber(singlePageNumber + toAddSinglePageNumber);

    //     if(!isSinglePagePagination) {
    //       setIsSinglePagePagination(true);
    //     }
    //   }, [openedMail])

    //   useEffect(() => {
    //     setIsSinglePagePagination(false);

    //   }, [isSideBarClicked])

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

    //   async function onChange(pageNumberOnChange: number) {
    //     // console.log('Page: ', pageNumberOnChange);

    //     if(!isSinglePagePagination){
    //       setMultiMailPageNumber(pageNumberOnChange);
    //       return;
    //     }

    //     const mailIndex = (pageNumberOnChange - (multiMailPageSize * (multiMailPageNumber-1))) - 1;
    //     if (mailIndex === mails.length) {
    //       setMultiMailPageNumber(multiMailPageNumber + 1);
    //       return;
    //     }
    //     else if(mailIndex < 0) {
    //       setMultiMailPageNumber(multiMailPageNumber - 1);
    //       return;
    //     }

    //     setOpenedMailID(mails[mailIndex].id);
    //     // }

    //     setSinglePageNumber(pageNumberOnChange)
    //   }

    //   async function onShowSizeChange(current: number, pageSizeOnChange: number) {
    //     console.log(current, pageSizeOnChange);

    //     if(!isSinglePagePagination) {
    //       setMultiMailPageSize(pageSizeOnChange);
    //       return;
    //     }
    //   }

    return (
        <div>
            <Header>
                <TrashIconContainer>
                    <DeleteFilled className="delete-all" onClick={handleDeletion} />
                </TrashIconContainer>
                <h1>{typeOfBox && `${typeOfBox.charAt(0).toUpperCase()}${typeOfBox.slice(1)}`}</h1>
                {/* { isOpenedMail
          ?
          <Pagination
            size="small"
            total={allInBoxtypeCountresult}
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
            total={allInBoxtypeCountresult}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            showQuickJumper={false}
            showSizeChanger={true}
            pageSize={multiMailPageSize}
            defaultCurrent={1}
            current={multiMailPageNumber}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        } */}
            </Header>

        </div>
    )
}

export default MailsHeader

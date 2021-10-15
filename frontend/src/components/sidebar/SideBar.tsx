import React from 'react'
import { fetchMails } from '../functions/fetchMails';
import { SideBarContainer, SubSideBar, ModButton } from './Styled';
import { SearchOutlined, FormOutlined, SendOutlined, DeleteOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { FetchedMails } from '../types/FetchedMail';

type Props = {
	props: {
  mails: FetchedMails;
	isSideBarClicked: boolean;
	setIsSideBarClicked: Function;
	setIsNewMail: Function;
	isNewMail: boolean;
	setMails: Function;
	setIsOpenedMail: Function;
	}
}

const SideBar = (
	 {
		 props:
		 { 
       mails: {mailsPerPage},
			 setMails, 
			 isSideBarClicked,
			 setIsSideBarClicked,
			 setIsNewMail, 
			 isNewMail, 
			 setIsOpenedMail 
		}
	}: Props) => {
		
	return (
		<SideBarContainer>
		<li>
		  <ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
		</li>
		<SubSideBar onClick={() => {setIsOpenedMail(false); setIsSideBarClicked(!isSideBarClicked)}}>
		  <li>
			<Link to="/">
			  <ModButton type="primary" icon={<SearchOutlined />} 
			  onClick={() => {
				  // setTypeOfMail("inbox"); 
			  	fetchMails("inbox", 1, mailsPerPage, setMails)
        }}
          >Inbox
        </ModButton>
			</Link>
		  </li>

		  <li>
			<Link to="/sent">
			  <ModButton type="primary" icon={<SendOutlined />} 
			  onClick={() => {
          // setTypeOfMail("sent");
          fetchMails("sent", 1, mailsPerPage, setMails)
        }}
          >Sent
          </ModButton>
			</Link>
		  </li>

		  <li>
			<Link to="/trash">
			  <ModButton type="primary" icon={<DeleteOutlined />} 
			  onClick={() => {
          // setTypeOfMail("trash"); 
          fetchMails("trash", 1, mailsPerPage, setMails)
          }}
          >Trash
          </ModButton>
			</Link>
		  </li>
		</SubSideBar>
	  </SideBarContainer>
	)
}

export default SideBar

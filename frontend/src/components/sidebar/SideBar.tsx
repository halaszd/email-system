import React from 'react'
import { fetchMails } from '../functions/fetchMails';
import { SideBarContainer, SubSideBar, ModButton } from './Styled';
import { SearchOutlined, FormOutlined, SendOutlined, DeleteOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

type Props = {
	props: {
	setIsNewMail: Function;
	isNewMail: boolean;
	setTypeOfMail: Function;
	setMails: Function;
	setIsOpenedMail: Function;
	}
}

const SideBar = (
	 {
		 props:
		 { 
			 setIsNewMail, 
			 isNewMail, 
			 setTypeOfMail, 
			 setMails, 
			 setIsOpenedMail 
		}
	}: Props) => {
		
	return (
		<SideBarContainer>
		<li>
		  <ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
		</li>
		<SubSideBar onClick={() => setIsOpenedMail(false)}>
		  <li>
			<Link to="/">
			  <ModButton type="primary" icon={<SearchOutlined />} 
			  onClick={() => {setTypeOfMail("inbox"); fetchMails("inbox", setMails)}}>Inbox</ModButton>
			</Link>
		  </li>
		  <li>
			<Link to="/sent">
			  <ModButton type="primary" icon={<SendOutlined />} 
			  onClick={() => {setTypeOfMail("sent"); fetchMails("sent", setMails)}}>Sent</ModButton>
			</Link>
		  </li>
		  <li>
			<Link to="/trash">
			  <ModButton type="primary" icon={<DeleteOutlined />} 
			  onClick={() => {setTypeOfMail("trash"); fetchMails("trash", setMails)}}>Trash</ModButton>
			</Link>
		  </li>
		</SubSideBar>
	  </SideBarContainer>
	)
}

export default SideBar

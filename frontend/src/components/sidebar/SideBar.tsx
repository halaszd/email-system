import { useMail } from '../useContexts/MailContextProvider';
import { fetchMails } from '../functions/fetchMails';
import { SideBarContainer, SubSideBar, ModButton } from './Styled';
import { SearchOutlined, FormOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

type Props = {
	isNewMail: boolean;
	setIsNewMail: Function;
}

const SideBar = (
	{
		setIsNewMail, 
		isNewMail,
	}: Props) => {
	
	const {
		mails: { mailsPerPage },
		setMails,
		isSideBarClicked,
		setIsSideBarClicked,
		setIsOpenedMail
	} = useMail();

	return (
		<SideBarContainer>
			<li>
				<ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
			</li>
			<SubSideBar onClick={() => { setIsOpenedMail(false); setIsSideBarClicked(!isSideBarClicked) }}>
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

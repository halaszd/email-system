import { useMail } from '../../utils/useContexts/MailContextProvider';
import { queryUserMails } from '../../..';
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
		userEmail,
		mails: { mailsPerPage, allInBoxtypeCount, typeOfBox },
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
							// onClick={() => {
								// queryUserMails(userEmail, "inbox", 1, 20, setMails)
							// }}
						>Inbox
						</ModButton>
					</Link>
				</li>

				<li>
					<Link to="/sent">
						<ModButton type="primary" icon={<SendOutlined />}
							// onClick={() => {
								// queryUserMails(userEmail, "sent", 1, 20, setMails)
							// }}
						>Sent
						</ModButton>
					</Link>
				</li>

				<li>
					<Link to="/trash">
						<ModButton type="primary" icon={<DeleteOutlined />}
							// onClick={() => {
								// queryUserMails(userEmail, "trash", 1, 20, setMails)
							// }}
						>Trash
						</ModButton>
					</Link>
				</li>
			</SubSideBar>
		</SideBarContainer>
	)
}

export default SideBar

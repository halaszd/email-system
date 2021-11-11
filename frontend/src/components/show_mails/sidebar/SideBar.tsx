import { useMail } from '../../utils/useContexts/MailContextProvider';
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
		setIsToFetch,
		isSideBarClicked,
		setIsSideBarClicked,
		setIsOpenedMail
	} = useMail();

	return (
		<SideBarContainer>
			<li>
				<ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
			</li>
			<SubSideBar onClick={() => {
				setIsOpenedMail(false);
				setIsSideBarClicked(!isSideBarClicked);
				setIsToFetch(true)
			}}>
				<li>
					<Link to="/">
						<ModButton type="primary" icon={<SearchOutlined />}
						>Inbox
						</ModButton>
					</Link>
				</li>

				<li>
					<Link to="/sent">
						<ModButton type="primary" icon={<SendOutlined />}
						>Sent
						</ModButton>
					</Link>
				</li>

				<li>
					<Link to="/trash">
						<ModButton type="primary" icon={<DeleteOutlined />}
						>Trash
						</ModButton>
					</Link>
				</li>
			</SubSideBar>
		</SideBarContainer>
	)
}

export default SideBar

import { useMail } from '../../../utils/useContexts/MailContextProvider';
import { MailContextContainer } from './Styled';
import { Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons';

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
    setIsNewMail: Function;
    setSendTo: Function;
}
const OpenedMail = (
    {
        setIsNewMail,
        setSendTo
    }: Props) => {

    const { openedMail: { fromUser, email: { subject, message } } } = useMail();

    function handleClick() {
        setIsNewMail(true);
        setSendTo(fromUser.email)
    }

    return (
        <MailContextContainer>
            <h1>Subject: {subject}</h1>
            <h2>
                From: <span className="from">{fromUser.name}</span>
                <span className="email-address">{`<${fromUser.email}>`}</span>
            </h2>
            <div>
                <span className="message">{message}</span>
            </div>
            <Button onClick={handleClick} className="reply-button" icon={<RollbackOutlined />}>Reply</Button>
        </MailContextContainer>
    )
}

export default OpenedMail

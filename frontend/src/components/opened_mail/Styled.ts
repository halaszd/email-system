import styled from '@emotion/styled';

export const MailContextContainer = styled.div`
  width: calc(100vw - 220px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;

  .reply-button {
    width: 100px;
  }
    h1 {
    font-size: 1.375rem;
    color: #202124;
    font-weight: 400;
    }

    h2 {
    font-size: .875rem;
    letter-spacing: .2px;
    color: #202124;
    line-height: 20px;

    .from {
      font-weight: bold;
    }

    .email-address {
      font-size:  medium;
      white-space: nowrap;
      font-size: .75rem;
      letter-spacing: .3px;
      color: #5f6368;
    }
   }

  .message {
    color: #222;
  }
`;

import styled from '@emotion/styled';

export const MailContainer = styled.div`
  &:hover {
    box-shadow: 1px 1px 3px #5f6368;
    z-index: 10;
  }

  .content-container {
    display: flex;
    gap: 10px;
    background-color: #f4f7f7;
    border-top: 1px solid #eceff1;
    padding: 10px 10px 5px 20px;
    
    &:hover {
      cursor: pointer;
    }

    .checkbox-container {
      min-width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &:hover{
        cursor: pointer;
        background-color: #eceff1;
        border-radius: 20px;

        &::after {
          content: "Select";
          color: white;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 0.08rem;
          position: absolute;
          top: 41px;
          padding: 3px;
          background-color: grey;
          border-radius: 3px;
        }
      }
    }
  }

    .message-infos {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;

      .from-subject, .message {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }

      .message {
        color: #5f6368;
      }
    }
`;

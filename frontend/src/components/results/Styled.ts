import styled from '@emotion/styled';

export const ResultsContainer = styled.div`
  &:hover {
    background-color: #e7f0f0;
    z-index: 10;
  }

  .content-container {
    width: 80%;
    display: flex;
    gap: 10px;
    border-top: 1px solid #eceff1;
    padding: 10px 10px 5px 20px;
    
    &:hover {
      cursor: pointer;
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
    }
`;

import styled from '@emotion/styled';

export const ResultsContainer = styled.div`
  max-height: 500px;
  overflow-y: scroll;
`;

export const ResultContainer = styled.div`
  &:hover {
    background-color: #e7f0f0;
    z-index: 10;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 10px;
  border-top: 1px solid #eceff1;
  padding: 10px 10px 5px 20px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const MessageInfos = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  .from-subject, .message {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;
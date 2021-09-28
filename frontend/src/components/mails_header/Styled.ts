import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  padding-left: 10px;

  h1 {
    font-weight: 600;
    margin-bottom: 0px;
    position: relative;
    margin: auto;
  }
`;

export const TrashIconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 8px;

  &:hover{
    cursor: pointer;
    background-color: #eceff1;
    border-radius: 20px;

    &::after {
      content: "Delete";
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

    .delete-all {
      color: black;
    }
  }

  .delete-all {
    color: grey;
    font-size: 20px;
    transition: 0.3s;

    /* &.ready-to-delete {
      color: '#08c';
    } */
  }
`;

import styled from '@emotion/styled';

export const Header = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  padding-left: 10px;

  .ant-pagination-item {
    display: none;
  }

  .ant-pagination-jump-prev{
    display: none;
  }

  .ant-pagination-jump-next {
    display: none;
  }

  h1 {
    font-weight: 500;
    margin-bottom: 0px;
    position: relative;
    margin: auto;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: calc(100% - 10px);
    overflow: hidden;
    margin-left: 10px;
    margin-top: 95px;
    border-bottom: 1px solid black;
    border-bottom: 1px solid #dadce0;
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

import styled from '@emotion/styled';

export const NewMailContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 30px;
  min-width: 500px;
  height: 400px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #d9d9d9;
  display: flex;
  z-index: 10;
  background-color: white;

  &.minimized {
    height: 40px;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  .spinner {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Header = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202124;
  color: white;
  border-radius: 5px 5px 0 0;

  span {
    padding-left: 10px;
    font-weight: bold;
  }

  .header-icons {
    justify-self: flex-end;
    padding-right: 10px;
  }
`;

export const Form = styled.form`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;

  &.minimized {
    display: none;
  }

  .message {
    height: 100%;
  }

  .button {
    width: 100px;
    font-weight: bold;
  }
`;
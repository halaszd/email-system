import styled from '@emotion/styled';

export const MainDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: hidden;
`;


export const MainHeader = styled.div`
  width: 100%;
  display: flex; 
  gap: 110px;
  padding-top: 10px;
`;

// export const CustomButton = (props: {bg: string}) => styled(Button)`
//   background-color: ${props.bg};
// `;

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  background-color:#ffffff;
  overflow-y: hidden; // important

  button a {
    color: white;
  }
`;

export const LoginRegistratonDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-height: 80vh;
  border: 1px solid #dadce0;
  border-top: 4px solid #1a73e8;
  padding: 60px;
  border-radius: 8px;
  transition: 1s;

  h1 {
    font-weight: 400;
  }
`;

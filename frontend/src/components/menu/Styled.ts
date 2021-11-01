import styled from '@emotion/styled';
import { Button } from 'antd'

export const MenuDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-left: 10px;
`;

type Props = {content: string | null, borderRadius?: string};
export const ButtonWithTextUnder = styled(Button)<Props>`
  height: 39px;
  border-radius: ${props => props.borderRadius};
  z-index: 10;

  &:hover{
      cursor: pointer;
      background-color: #eceff1;
      border-radius: ${props => props.borderRadius 
      ? props.borderRadius 
      : '5px'};

      &::after {
        content: '${props => props.content}';
        color: white;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0.08rem;
        position: absolute;
        /* top: 41px; */
        left: 50%;
        top: 130%;
        transform: translate(-50%);
        padding: 3px;
        background-color: grey;
        border-radius: 3px;
      }
    }
`;

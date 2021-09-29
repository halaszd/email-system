import styled from '@emotion/styled';
import {
  Form,
  Button
} from 'antd';

export const ModForm = styled(Form)`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .ant-checkbox-checked {

    .ant-checkbox-inner {
      background-color: black;
      background-color: #1a73e8;
    }
  }
`;

export const ModFormItem = styled(Form.Item)`
  .mail {
    padding-right: 15px;
  }
`;

export const RegButton = styled(Button)`
  font-weight: 500;
  background-color: #1a73e8;
`;
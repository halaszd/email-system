import styled from '@emotion/styled';
import { Form, Button } from 'antd';

export const ModForm = styled(Form)`
  width: 300px;
  .login-form-forgot {
    float: right;
  };
  .ant-col-rtl .login-form-forgot {
    float: left;
  };
  .login-form-button {
    width: 100%;
  };

  .ant-checkbox-checked {

    .ant-checkbox-inner {
      background-color: black;
      background-color: #1a73e8;
    }
  }
`;

export const LogButton = styled(Button)`
  font-weight: 500;
  background-color: #1a73e8;
`;
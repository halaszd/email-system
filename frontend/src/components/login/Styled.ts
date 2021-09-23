import styled from '@emotion/styled';
import { Form } from 'antd';

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
`;

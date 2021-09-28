import styled from '@emotion/styled';
import {
  Form
} from 'antd';

export const ModForm = styled(Form)`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ModFormItem = styled(Form.Item)`
  .mail {
    padding-right: 15px;
  }
`;
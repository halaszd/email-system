import React from 'react';
import { UserContext } from '../../utils/useContexts/UserContext';

import { fetchMails } from '../../utils/functions/fetchMails';

import { LoginDiv, ModForm, LogButton } from './Styled';
import { LoginRegistratonDiv } from '../../../Styled';
import { Form, Input, Checkbox, Modal } from 'antd';

const logURL = 'http://localhost:3001/api/login'

type IProps = {
  status: number;
  setStatus(values: any, URL: string): void;
};

type IState = {
  isModalVisible: boolean;
};

class LoginForm extends React.Component<IProps, IState> {
  static contextType = UserContext;

  constructor(props: IProps) {
    super(props)
    this.onFinish = this.onFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  
    this.state = {
      isModalVisible: false
    }
  }
  
  handleOk() {
    this.setState({ isModalVisible: false })
  };

  handleCancel() {
    this.setState({ isModalVisible: false })
  };

  async onFinish(values: any) {
    const {isLoggedIn, setIsLoggedIn, setUsername, setMails} = this.context;
    console.log("isloggedin 45: ", isLoggedIn)

    await this.props.setStatus(values, logURL);

    if(this.props.status === 200) {
      setIsLoggedIn(true);
      // It should fetch the users mail ofc
      console.log("isloggedin 52: ", isLoggedIn)
      await fetchMails("inbox", 1, 20, setMails);
      setUsername(values["username"]);

    } else {
      this.setState({ isModalVisible: true })
    }
  };

  onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

  render() {
  return (
    <LoginRegistratonDiv>
      <h1>Sign in</h1>
      <ModForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <LogButton type="primary" htmlType="submit">
            Sign in
          </LogButton>
        </Form.Item>
      </ModForm>

      <Modal title="Login was not successful" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Incorrect username or password!</p>
      </Modal>
    </LoginRegistratonDiv>
  );

  }
};

export default LoginForm;
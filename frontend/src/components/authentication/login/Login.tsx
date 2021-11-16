import React from 'react';
import { UserContext } from '../../utils/useContexts/UserContext';
import { AUTH_TOKEN, USER_NAME } from '../../../constants';
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from '../../../queries_mutations';

import { ModForm, LogButton } from './Styled';
import { LoginRegistratonDiv } from '../../app/Styled';
import { Form, Input, Checkbox, Modal } from 'antd';


type IProps = {
  status: number;
  setStatus(values: any, URL: string): void;
};

type IState = {
  isModalVisible: boolean;
  email: string;
  password: string;
};

class LoginForm extends React.Component<IProps, IState> {
  static contextType = UserContext;

  constructor(props: IProps) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  
    this.state = {
      isModalVisible: false,
      email: '',
      password: '',
    }
  }
  
  handleOk() {
    this.setState({ isModalVisible: false })
  };

  handleCancel() {
    this.setState({ isModalVisible: false })
  };

  onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { email, password } = this.state;
  return (
    <LoginRegistratonDiv>
      <h1>Sign in</h1>
      <ModForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[ { required: true, message: 'Please input your email!' } ]}
        >
          <Input onChange={e => this.setState({email: e.target.value})}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={e => this.setState({password: e.target.value})}/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Mutation
           mutation={LOGIN_MUTATION}
           variables={{ email, password }}
           onError={() => this.setState({isModalVisible: true})}
           onCompleted={(data: any) => this._confirm(data)}
           > 
            {(mutation: any) => (
              <>
              {}
                <LogButton type="primary" htmlType="submit" onClick={mutation}>
                Sign in
              </LogButton>
              </>

             )}
           </Mutation> 

        </Form.Item>
      </ModForm>

      <Modal title="Login was not successful" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Incorrect username or password!</p>
      </Modal>
    </LoginRegistratonDiv>
  );
  }
  async _confirm(data: any) {
    const { setUserEmail, setAuth, setUsername} = this.context;
    const { token, user: { name, email } } = data.login;

    this._saveUserData(token, name)

    setAuth(token);
    setUsername(name);
    setUserEmail(email)
  }
  _saveUserData(token: string, username: string) {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem(USER_NAME, username)
  }
};

export default LoginForm;

import React from 'react';
import { UserContext } from '../../utils/useContexts/UserContext';
import { fetchMails } from '../../utils/functions/fetchMails';
import { AUTH_TOKEN } from '../../../constants';
import { Mutation, ApolloProvider } from "react-apollo";
import { gql } from "apollo-boost";

import { ModForm, LogButton } from './Styled';
import { LoginRegistratonDiv } from '../../app/Styled';
import { Form, Input, Checkbox, Modal } from 'antd';

// const logURL = 'http://localhost:3001/api/login'
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
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
    this.onFinish = this.onFinish.bind(this);
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

  async onFinish(token: string) {
    const {setAuth, setUsername, setMails} = this.context;
    const { email, password } = this.state;
    console.log(email, password)
    setAuth(token);

    // await this.props.setStatus(values, '');

  //   if(this.props.status === 200) {
      // setIsLoggedIn(true);
  //     // It should fetch the users mail ofc
  //     await fetchMails("inbox", 1, 20, setMails);
      setUsername(email);

  //   } else {
  //     this.setState({ isModalVisible: true })
  //   }
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
        // onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[ { required: true, message: 'Please input your username!' } ]}
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
           onCompleted={(data: any) => this._confirm(data)}
           > 
            {(mutation: any) => (
              <LogButton type="primary" htmlType="submit" onClick={mutation}>
                Sign in
              </LogButton>
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
    console.log("hello")
    const { token } = data.login;
    this._saveUserData(token)
    console.log(token)
    this.onFinish(token);
  }
  _saveUserData(token: string) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
};

export default LoginForm;

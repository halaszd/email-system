import React, { Component } from 'react'
import { Mutation } from "react-apollo";
import { REGISTER_MUTATION } from '../../../queries_mutations';
import withStatus, { InjectedIsSuccessfulProps } from '../../utils/hocs/withStatus';
import { FormInstance } from 'antd/es/form';
import {
  Form,
  Input,
  Checkbox,
  Modal
} from 'antd';

import {
  Redirect
} from "react-router-dom";

import { ModForm, ModFormItem, RegButton } from './Styled';
import { LoginRegistratonDiv } from '../../app/Styled';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 } 
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps extends InjectedIsSuccessfulProps {};

type IState = {
  isModalVisible: boolean;
  isNotEmpty: boolean;
  isPassOk: boolean;
  isAgree: boolean;
  isSuccessfulRegistration: boolean;
  email: string;
  password: string;
  name: string;
};

export class Registration extends Component<IProps, IState> {
  mailName = '@tmail.com'
  formRef = React.createRef<FormInstance>();

  constructor(props: IProps) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleError = this.handleError.bind(this);
  
    this.state = {
     isModalVisible: false,
     isNotEmpty: false,
     isPassOk: false,
     isAgree: false,
     isSuccessfulRegistration: false,
     email: '',
     password: '',
     name: '',
       
    }
  }
  validatePassword(pass: string) {
    console.log(pass)
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(pass);
}
  handleOk() {
    this.setState({ isModalVisible: false })
  };

  handleCancel() {
    this.setState({ isModalVisible: false })
  };

  handleError() {
    const { email } = this.state;
    if(email !== '') {
      this.setState({isModalVisible: true})
    }
  };

  render() {
    const { 
      isSuccessfulRegistration, 
      isNotEmpty,
      isPassOk,
      isAgree,
      email, 
      password, 
      name 
    } = this.state;

    return (
      <LoginRegistratonDiv>
      <h1>Create your Account</h1>
      <ModForm
        {...formItemLayout}
        ref={this.formRef}
        name="register"
        scrollToFirstError
        className="registration"
      >

        <ModFormItem
          name="email"
          label="Email"
          hasFeedback
          rules={[
            { 
              required: true, 
              message: 'Please input your email!', 
            },
            {
              validator: (_, value) => {
                if(typeof value !== 'undefined' && value !== '') {
                  console.log(`"${value}`)
                  this.setState({isNotEmpty: true})
                  return Promise.resolve();
                }
                this.setState({isNotEmpty: false})
                return Promise.reject()
              }
            }
            // {
            //   validator: (_, value) =>
            //     fetch(this.ifExistingUserURL, {
            //       method: 'POST',
            //       headers: {
            //         'Content-Type': 'application/json'
            //       },
            //       body: JSON.stringify({"username": value + this.mailName})
            //     })
            //     .then(response => response.text())
            //     .then((data) => {
            //       if(data === "OK") {
            //         console.log("data was OK")
            //         return Promise.resolve();
            //       }
            //       console.log("data was: ", data)
            //       return Promise.reject(new Error('Existing Username'));
            //     })
            // },
            ]}
        >
          <Input 
            addonAfter={<span className="mail">{this.mailName}</span>}
            onChange={e => this.setState({email: `${e.target.value}${this.mailName}`})}  
          />
        </ModFormItem> 
        <ModFormItem
          name="username"
          label="Username"
          hasFeedback
          rules={[
            { 
              message: 'Please input your username!', 
              whitespace: true 
            },
            ]}
        >
          <Input onChange={e => this.setState({name: e.target.value})} />
        </ModFormItem>

        <Form.Item
          name="password"
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: (_, value) => {
                if(this.validatePassword(value)) {
                  this.setState({isPassOk: true})
                  return Promise.resolve();
                }
                this.setState({isPassOk: false})
                return Promise.reject(
                  new Error(('Password should consist upper and lower case and at least 6 characters with a special character and a number!')))
              }
            },
          ]}
        >
          <Input.Password onChange={e => this.setState({password: e.target.value})} />

        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <ModFormItem
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
            },
            {
              validator: (_, value) => {
                if(value) {
                  this.setState({isAgree: true});
                  return Promise.resolve();
                }
                this.setState({isAgree: false});
                return Promise.reject(new Error('Should accept agreement'))
              }
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </ModFormItem>
        <Form.Item {...tailFormItemLayout}>
          <Mutation
            mutation={REGISTER_MUTATION}
            variables={isNotEmpty && isPassOk && isAgree? { email, password, name }: {}}
            onError={() => this.handleError}
            onCompleted={(data: any) => this._confirm(data)}
          >
            {(mutation: any) => (
              <RegButton type="primary" htmlType="submit" onClick={mutation}>
                Register
              </RegButton>
            )}
          </Mutation>
        </Form.Item>
      </ModForm>
      <Modal title="Existing email" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Existing email!</p>
      </Modal>
        { isNotEmpty && isPassOk && isAgree && isSuccessfulRegistration && <Redirect to="/login" />}
      </LoginRegistratonDiv>
    );
  };

  async _confirm(data: any) {
    const { token } = data.signup;
    if(token) {
      this.setState({isSuccessfulRegistration: true})
    }
  }
};

export default withStatus(Registration);
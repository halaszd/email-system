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
  
    this.state = {
     isModalVisible: false,
     isSuccessfulRegistration: false,
     email: '',
     password: '',
     name: '',
       
    }
  }

  handleOk() {
    this.setState({ isModalVisible: false })
  };

  handleCancel() {
    this.setState({ isModalVisible: false })
  };

  render() {
    const { isSuccessfulRegistration, email, password, name } = this.state;
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
              required: true, message: 'Please input your email!', 
              whitespace: true 
            },
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
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
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
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
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
            variables={{ email, password, name }}
            onError={() => this.setState({isModalVisible: true})}
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
        { isSuccessfulRegistration && <Redirect to="/login" />}
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
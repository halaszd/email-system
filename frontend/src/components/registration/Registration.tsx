import { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';

import {
  Redirect
} from "react-router-dom";

import { ModForm, ModFormItem } from './Styled';

const mailName = '@tmail.com';
const regURL = 'http://localhost:3001/api/registration';
const checkIsExistingUserURL = 'http://localhost:3001/api/is-existing-user';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false);

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);

    const valuesToServer = {
      username: `${values['username']}${mailName}`, 
      password: values['password']
    }

    const response = 
    await fetch(regURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(valuesToServer)
    })
    
    const respText = await response.text();

    if(respText === 'OK') {
      setIsSuccessfulRegistration(true);
    }
  };


  return (
    <>
    {!isSuccessfulRegistration 
    ?
      <ModForm
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="registration"
      >

        <ModFormItem
          name="username"
          label="Username"
          hasFeedback
          // tooltip="What do you want others to call you?"
          rules={[
            { 
              required: true, message: 'Please input your username!', 
              whitespace: true 
            },
            {
              validator: (_, value) =>
                fetch(checkIsExistingUserURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({"username": value + mailName})
                })
                .then(response => response.text())
                .then((data) => {
                  if(data === "OK") {
                    console.log("data was OK")
                    return Promise.resolve();
                  }
                  console.log("data was: ", data)
                  return Promise.reject(new Error('Existing Username'));
                })
              ,
            },
            ]}
        >
          <Input addonAfter={<span className="mail">{mailName}</span>}/>
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
          <Input.Password />
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
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </ModForm>
    :
      <Redirect to="/login" />
    }
    </>
  );
};

export default RegistrationForm;
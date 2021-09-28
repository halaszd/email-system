import { ModForm } from './Styled';
import { Form, Input, Button, Checkbox } from 'antd';

import { useContext } from 'react';
import { UserContext } from '../useContexts/UserContext';

import { fetchMails } from '../functions/fetchMails';

const logURL = 'http://localhost:3001/api/login'

const LoginForm = () => {
  const {isLoggedIn, setIsLoggedIn, setUsername, setMails} = useContext(UserContext);

  async function onFinish(values: any) {
    const response = await fetch(logURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    const status = await response.status;
    if(status === 200) {
      setIsLoggedIn(true);
      await fetchMails("inbox", setMails)
      console.log(isLoggedIn)
      // set userEmailAddress
    }
  };

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

  return (
    <ModForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </ModForm>
  );
};

export default LoginForm;
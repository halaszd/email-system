import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../useContexts/UserContext';

import { fetchMails } from '../functions/fetchMails';

import { ModForm } from './Styled';
import { Form, Input, Button, Checkbox, Modal } from 'antd';

const logURL = 'http://localhost:3001/api/login'

const LoginForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {isLoggedIn, setIsLoggedIn, setUsername, setMails} = useContext(UserContext);
  
  function showModal() {
    setIsModalVisible(true);
  };

  function handleOk() {
    setIsModalVisible(false);
  };

  function handleCancel() {
    setIsModalVisible(false);
  };

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
      // It should fetch the users mail ofc
      await fetchMails("inbox", setMails)
      console.log(isLoggedIn)
      // set userEmailAddress
    } else {
      setIsModalVisible(true);
    }
  };

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
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

      <Modal title="Login is not successful" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Incorrect username or password!</p>
      </Modal>
    </>
  );
};

export default LoginForm;
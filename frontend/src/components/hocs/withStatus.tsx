import React from 'react';
import { Subtract } from 'utility-types';

export type InjectedIsSuccessfulProps = {
  status: number;
  onFinish(values: object, URL: string): void;
}

interface withStatusState {
  status: number;
}

const withStatus = <P extends InjectedIsSuccessfulProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedIsSuccessfulProps>, withStatusState
    > {

    state: withStatusState = {
      status: 0
    };

    onFinish = async (values: {}, URL: string) => {
      console.log('Received values of form: ', values);

      const response = 
      await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
      })
      
      const respStatus = await response.status;
      this.setState({ status: respStatus })
    };

    render() {
      return (
        <Component
          {...this.props as P}
          status={this.state.status}
          onFinish={this.onFinish}
        />
      );
    }
  };

export default withStatus;
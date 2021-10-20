import React, { Component } from 'react';

// type OutProps = {
//   status: number;
//   setStatus(values: any, URL: string): void;
// };

// type OutState = {
//   isModalVisible: boolean;
// };

type setStatusType = {
  (values: any, URL: string): void;
}
type IProps = {
  render(status: number, setStatus: setStatusType): JSX.Element;
  // render(status: number, setStatus: setStatusType): any;
};
type IState = {
	status: number;
};


export class StatusSetter extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)

    this.setStatus =this.setStatus.bind(this);
	
		this.state = {
			status: 0
		}
	}
	
	async setStatus(values: any, URL: string) {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    const respStatus = await response.status;
    this.setState({ status: respStatus });

  };
	
	render() {
		return (
			<div>
				{this.props.render(this.state.status, this.setStatus)}	
			</div>
		)
	}
}

export default StatusSetter

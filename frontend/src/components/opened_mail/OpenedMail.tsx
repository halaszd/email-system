import React from 'react'
import styled from '@emotion/styled'
import FetchedMail from '../interfaces/FetchedMail.js'

// -------------------- Style -------------------- 


// -------------------- Declaring types and interfaces -------------------- 
type Props  = {
  openedMail: FetchedMail;
}

// -------------------- The component itself -------------------- 
const OpenedMail: React.FC<Props> = props => {
	return (
		<div>
      <h1>{props.openedMail?.subject}</h1>
		</div>
	)
}

export default OpenedMail

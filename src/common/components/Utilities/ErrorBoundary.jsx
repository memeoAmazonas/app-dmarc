import React, { PureComponent } from 'react'

import styled from 'styled-components';


const BoundaryWrapper = styled.div`
  padding: '.75rem 1.25rem',
  marginBottom: '1rem',
  border: '1px solid transparent',
  borderRadius: '.25rem',
  color: '#721c24',
  backgroundColor: '#f8d7da',
  borderColor: '#f5c6cb',
`;

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, info) {
    // you probably want to log it somewhere
    console.log(error, info)
    this.setState({
      hasError: true,
    })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <BoundaryWrapper>
          Something is going wrong!!
        </BoundaryWrapper>
      )
    }

    return children
  }
}

export default ErrorBoundary

import React from 'react'
import styled from 'styled-components';


const Styles = styled.div`

.google-btn {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  background: #ff5353;
  &:hover {
    opacity: 0.8;
  }
}
`;

export const Login = () => (
  <Styles>
    <div>
      <h2>Login Using... </h2>
      <a className="google-btn" href="/auth/google">Google</a>
    </div>
  </Styles>
)

import React from 'react';
import { Jumbotron as Jumbo, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .jumbo {
    text-align: center;
  }
`;


export const Jumbotron = () => (
  <Styles>
    <Jumbo className='jumbo'>
      <Container>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.

          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Container>
    </Jumbo>
  </Styles>
)

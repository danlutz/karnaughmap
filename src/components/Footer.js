import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: #0f0f0f;
  color: #fff;
  padding: 2rem 0;

  a {
    color: #7fdbff;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <ul>
          <li>&copy; {new Date().getFullYear()} Daniel Lutz</li>
          <li>
            Favicon made by{' '}
            <a
              href="http://www.freepik.com"
              title="Freepik"
              target="_blank"
              rel="noopener noreferrer"
            >
              Freepik
            </a>
          </li>
        </ul>
      </Container>
    </StyledFooter>
  )
}

export default Footer

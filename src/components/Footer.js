import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: #fff;
  padding: 2rem 0;

  a {
    color: #7fdbff;
  }
`

const Footer = () => {
  return (
    <StyledFooter className="bg-dark">
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
            </a>{' '}
            from{' '}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.flaticon.com
            </a>{' '}
            is licensed by{' '}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </li>
        </ul>
      </Container>
    </StyledFooter>
  )
}

export default Footer

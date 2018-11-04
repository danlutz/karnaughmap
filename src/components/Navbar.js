import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import { ReactComponent as Logo } from '../logo.svg'

const Navigation = () => {
  return (
    <Navbar color="0f0f0f" dark expand="md">
      <Container>
        <NavbarBrand href="/">
          <Logo style={{ width: '30px', height: '30px' }} />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href="https://github.com/danlutz/karnaughmap"
              target="_blank"
              rel="nofollow norefferer"
            >
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default Navigation

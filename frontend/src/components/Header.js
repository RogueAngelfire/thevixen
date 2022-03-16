import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout} from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <header>

        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container>

          <LinkContainer to='/'>
            <Navbar.Brand><img src="/vvd-web-logo.png" alt="vixens-logo" id="logo"/>Vixen's Vegan Delights</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-nav-bar">
            <Nav className='mr-auto'>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist' >
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist' >
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist' >
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>


                </NavDropdown>
              )}
              

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/basket">
                <Nav.Link ><i className="fas fa-shopping-basket"></i>Basket</Nav.Link>
              </LinkContainer>
              
              
            </Nav>
            
          
          </Navbar.Collapse>
          </Container>
 

        </Navbar>

        <Row>
        <Navbar bg="warning" expand="lg">
          <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-nav-bar">
            <Nav className='mr-auto'>
              <LinkContainer to='/'>
                <Nav.Link href="/">Products</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/weddings'>
                <Nav.Link>Weddings</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/occasions'>
                <Nav.Link>Occasions</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              
            </Nav>
            
          
          </Navbar.Collapse>
          </Container>
 

        </Navbar>
        </Row>
      </header>
    </div>
  )
}

export default Header

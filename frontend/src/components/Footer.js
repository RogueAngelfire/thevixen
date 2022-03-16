import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center p3">
            &copy; 2022 Vixen's Vegan Delights - Website designed and hosted by <a href="https://www.robincollins.co.uk" target="_blank" rel="noreferrer">Robin Collins</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

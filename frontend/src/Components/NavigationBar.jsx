import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// from https://react-bootstrap.github.io/components/navbar/

function NavigationBar() {
  return (
    <>
      <Navbar 
        variant="dark"
        style={{
          backgroundColor: "black"
        }}
      >
        <Container>
          <Navbar.Brand href="/">Seth Parsons</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/hobbies">Hobbies</Nav.Link>
            <Nav.Link href="/resume">Resume</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
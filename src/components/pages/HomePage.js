import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Button,
  Container,
  Col,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row} from 'reactstrap';
import SigninForm from '../forms/SigninForm';
import {login} from '../actions/auth';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
    this.state = {
      isOpen: false,
      collapse: false };
  }

  toggleNavBar() {
    this.setState({
      isOpen: !this.state.isOpen });
  }

  toggleSignin() {
    this.setState({
      collapse: !this.state.collapse });
  }

  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));


  render() {
    return (
      <div>
        <Container fluid id='hero'>
          <Navbar color="dark" dark expand="md" id='navBar'>
            <NavbarBrand href="#" id='logo'>
              <span> AVERAGEJOETRADER. </span>
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem active>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Courses</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Subscriptions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Contacts</NavLink>
              </NavItem>
              <NavItem className='text-right'>
                <Button onClick={this.toggleSignin} id='signinbtn'>
                  Sign In
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
          <Collapse isOpen={this.state.collapse} id='collapse'>
            <Row id='row'>
              <Col id='column'>
                <SigninForm submit={this.submit}/>
              </Col>
            </Row>
          </Collapse>
          <div id='heroSpace'>
            <h1 id='payoff'>
              <div>
                <span> Building </span><span id='bluetext'>Dreams </span>
              </div>
              <div>
                <span> One </span><span id='bluetext'>Trade </span><span>At A Time </span>
              </div>
            </h1>
            <p id='heroContent'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English.</p>
            <Button bssize="large" id='memberButton'>
              Become a member
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, {login})(HomePage);

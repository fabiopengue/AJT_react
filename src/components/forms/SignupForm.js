import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback, Modal, ModalBody, ModalFooter} from 'reactstrap';
import warning from '../../stock/icons/warning.svg';
import _ from 'lodash';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        data: {
          email: '',
          password: '',
          confirmPassword: ''
          },
          isDisabled: true,
          errors: {},
          modal: false,
        validate: {
          emailState: '',
          passwordState: '',
          confirmPasswordState: ''
        },
      }
      this.initalState = _.cloneDeep(this.state);
    }


  validateEmail = data => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
      if (emailRex.test(data.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
    }

  validatePassword= data => {
    const passwordRex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%* #=+?&]{6,}$/;
    const {validate} = this.state;
      if (passwordRex.test(data.target.value)) {
        validate.passwordState = 'has-success'
      } else {
        validate.passwordState = 'has-danger'
      }
  }

  validateConfirmPassword = data => {
    const {validate} = this.state;
      if (data.target.value !== this.state.data.password) {
        validate.confirmPasswordState = 'has-danger';
      } else {
        validate.confirmPasswordState = 'has-success';
        this.setState({isDisabled: false});
      }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.setState({isDisabled: true});
    this.setState(this.initalState);
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
    this.props
      .submit(this.state.data)
      .catch(err =>
        this.setState({ errors: err.response.data.errors })
      );
  };

  // validate = data => {
  //   const errors = {};
  //   if (!isEmail(data.email)) errors.email = "Invalid email";
  //   if (!data.password) errors.password = "Can't be blank";
  //   if (!data.confirmPassword ) {
  //     errors.confirmPassword = 'Please confirm your password' ;
  //   } else if (data.confirmPassword !== data.password) {
  //     errors.confirmPassword = 'Password do not match' ;
  //   }return errors;
  // };


  render() {
    const { data, errors, isDisabled, modal } = this.state;

    return (
      <Container className="SignupForm">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={ (e) => this.onSubmit(e)} ref='form'>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ data.email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
              {errors.email && <Modal isOpen={modal}>
          <ModalBody align-text='center'>
              <img src={warning} alt='' width='70px' height='70px'/> {errors.email}
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
            </ModalFooter>
          </ModalBody>
        </Modal>}
              <FormFeedback valid>
                Valid Email.
              </FormFeedback>
              <FormFeedback>
                Invalid email.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
                value={ data.password }
                valid={ this.state.validate.passwordState === 'has-success' }
                invalid={ this.state.validate.passwordState === 'has-danger' }
                onChange={ (e) => {
                            this.handleChange(e)
                            this.validatePassword(e)
                          } }
              />
              <FormFeedback valid>
                Valid Password.
              </FormFeedback>
              <FormFeedback>
                Password must be at least 6 character.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="exampleconfirmPassword"
                placeholder="********"
                value={ data.confirmPassword }
                valid={ this.state.validate.confirmPasswordState === 'has-success' }
                invalid={ this.state.validate.confirmPasswordState === 'has-danger' }
                onChange={ (e) => {
                            this.handleChange(e)
                            this.validateConfirmPassword(e)
                          } }
              />
              <FormFeedback valid>
                Passwords match.
              </FormFeedback>
              <FormFeedback>
                Passwords do not match.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Button color='primary' disabled={isDisabled}>Submit</Button>
      </Form>
      </Container>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignupForm;

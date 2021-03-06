import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log(this.validate(this.state.data));
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors })
        );
    }
    console.log(this.state);
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.confirmPassword ) {
      errors.confirmPassword = 'Please confirm your password' ;
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Password do not match' ;
    }
    return errors;
  };


  render() {
    const {data, errors} = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup id='emailblock'>
          <Label for="exampleEmail" className="mr-sm-2" id='label'>Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange} />
          {errors.email && <InlineError text={errors.email} />}
        </FormGroup>
        <FormGroup id='passwordblock'>
          <Label for="examplePassword" className="mr-sm-2" id='label'>Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password"
            value={data.password}
            onChange={this.onChange}/>
          {errors.password && <InlineError text={errors.password} />}
        </FormGroup>
        <FormGroup id='confirmPasswordblock'>
          <Label for="exampleconfirmPassword" className="mr-sm-2" id='label'>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="exampleconfirmPassword"
            placeholder="confirmPassword"
            value={data.confirmPassword}
            onChange={this.onChange}/>
          {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
        </FormGroup>
        <Button className='primary'>Sign Up Now!</Button>
      </Form>

    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignupForm;

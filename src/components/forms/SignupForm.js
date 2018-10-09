import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({errors: err.response.data.errors}));
    };
  }

  validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const {data, errors, loading} = this.state;

    return (
      <Form onSubmit={this.submit} loading={loading}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0" id='emailblock'>
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
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0" id='passwordblock'>
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
        <Button primary>Sign Up Now!</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignupForm;

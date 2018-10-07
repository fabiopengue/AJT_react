import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class SigninForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render(){
    const { data, errors, loading } = this.state;

    return(
      <Form inline id='signinform' onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
            <FormFeedback negative>
              <FormFeedback.Header>Something went wrong</FormFeedback.Header>
              <p>{errors.global}</p>
            </FormFeedback>
          )}
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" id='emailblock' error={!!errors.email}>
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
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" id='passwordblock' error={!!errors.password}>
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
        <div>
          <Button id='submitbutton'>Submit</Button>
        </div>
        <div id='signupblock'>
          <p>Not a member yet?</p>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </Form>

    );
  }
}

SigninForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SigninForm;

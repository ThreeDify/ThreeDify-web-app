import * as yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { signup } from '../Utils/auth';
import InputField from '../Components/InputField';
import AccountCreated from '../Misc/AccountCreated';
import { requestAuth } from '../Store/Actions/auth';
import PasswordField from '../Components/PasswordField';
import { checkUniqueEmail, checkUniqueUsername } from '../Utils/user';

const SignupFormValidation = yup.object().shape({
  first_name: yup.string().trim().required('First Name is required.'),
  last_name: yup.string().trim().required('Last Name is required.'),
  username: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_]*$/g,
      'Username can only contain alphabets, numbers and underscore (_).'
    )
    .min(5, 'Username must be at least 5 characters long.')
    .max(15, 'Username must be at most 15 characters.')
    .required('Username is required.'),
  email: yup
    .string()
    .trim()
    .email('Email must be a valid email address.')
    .required('Email is required.'),
  rawPassword: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password must be at most 20 characters long.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('rawPassword')], 'Password does not match.')
    .required('Password confirmation is required.'),
});

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      rawPassword: '',
      confirmPassword: '',
      isBtnDisabled: false,
      user: {},
      errors: {},
    };

    this.requestLogin = this.requestLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async validateUniqueUsernameAndEmail(username, email) {
    let isEmailUnique, isUsernameUnique;
    this.setState({
      errors: {},
    });

    try {
      isEmailUnique = await checkUniqueEmail(email);
    } catch (error) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: error.response.data.errors
            ? error.response.data.errors[0].email.message
            : '',
        },
      });
    }

    try {
      isUsernameUnique = await checkUniqueUsername(username);
    } catch (error) {
      this.setState({
        errors: {
          ...this.state.errors,
          username: error.response.data.errors
            ? error.response.data.errors[0].username.message
            : '',
        },
      });
    }

    return isUsernameUnique.data === 'OK' && isEmailUnique.data === 'OK';
  }

  async register(validatedData) {
    let response = await signup({
      first_name: validatedData.first_name,
      last_name: validatedData.last_name,
      email: validatedData.email,
      username: validatedData.username,
      rawPassword: validatedData.rawPassword,
    });

    if (response.data.errors) {
      let validationErrors = response.data.errors.reduce((acc, err) => {
        let key = Object.keys(err)[0];
        acc[key] = err[key].message;
        return acc;
      }, {});

      this.setState({
        isBtnDisabled: false,
        errors: validationErrors,
      });

      return;
    }

    this.setState({
      user: response.data,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isBtnDisabled: true,
    });

    try {
      const validatedData = await SignupFormValidation.validate(this.state, {
        abortEarly: false,
      });
      let isEmailAndUsernameUnique = await this.validateUniqueUsernameAndEmail(
        validatedData.username,
        validatedData.email
      );

      if (isEmailAndUsernameUnique) {
        await this.register(validatedData);
      }
    } catch (errors) {
      if (errors.name === 'ValidationError') {
        let validationErrors = errors.inner.reduce((acc, err) => {
          acc[err.path] = err.errors[0];
          return acc;
        }, {});

        this.setState({
          errors: validationErrors,
        });
      }
    }
    this.setState({
      isBtnDisabled: false,
    });
  }

  requestLogin() {
    this.props.requestLogin();
    this.props.onSignupCancelled && this.props.onSignupCancelled();
  }

  render() {
    if (this.state.user.id) {
      return <AccountCreated {...this.state.user}></AccountCreated>;
    }

    const {
      first_name,
      last_name,
      username,
      email,
      rawPassword,
      confirmPassword,
    } = this.state;

    const errors = this.state.errors;

    return (
      <div className='py-5 p-md-5'>
        <div className='pb-2 text-center'>
          <h2 className='font-weight-bold'>Welcome!</h2>
          <p>Sign up to create 3D models.</p>
        </div>

        <form className='pt-2' ref={this.ref} onSubmit={this.handleSubmit}>
          <div className='d-flex flex-nowrap'>
            <div className='w-100 mr-1'>
              <InputField
                placeholder='First Name'
                name='first_name'
                type='text'
                value={first_name}
                error={errors.first_name}
                onChange={this.handleInputChange}
                required
              ></InputField>
            </div>
            <div className='w-100 ml-1'>
              <InputField
                placeholder='Last Name'
                name='last_name'
                type='text'
                value={last_name}
                error={errors.last_name}
                onChange={this.handleInputChange}
                required
              ></InputField>
            </div>
          </div>

          <InputField
            placeholder='Username'
            name='username'
            type='text'
            value={username}
            error={errors.username}
            onChange={this.handleInputChange}
            leftIconName='user'
            required
          ></InputField>

          <InputField
            placeholder='Email'
            name='email'
            type='email'
            value={email}
            error={errors.email}
            onChange={this.handleInputChange}
            leftIconName='envelope'
            required
          ></InputField>

          <PasswordField
            placeholder='Password'
            name='rawPassword'
            value={rawPassword}
            error={errors.rawPassword}
            onChange={this.handleInputChange}
            leftIconName='key'
            required
          ></PasswordField>

          <PasswordField
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={this.handleInputChange}
            leftIconName='key'
            required
          ></PasswordField>

          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-primary font-weight-bold'
              disabled={this.state.isBtnDisabled}
            >
              Sign Up
            </button>
          </div>

          <hr className='w-75 mx-auto' />

          <div className='text-center form-optionLink'>
            <a href='#' onClick={this.requestLogin}>Already have an account?</a>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  requestLogin: PropTypes.func,
  onSignupCancelled: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: () => dispatch(requestAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

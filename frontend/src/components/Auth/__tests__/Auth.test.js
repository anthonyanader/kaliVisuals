import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Login from '../Login';
import Register from '../Register';

Enzyme.configure({ adapter: new EnzymeAdapter() });

//TODO: refactor the shallow wrapper creation through a dynamic helper setup function (adopt DRY)

describe('Login Component', () => {
  const user = {
    email: 'anthony@gmail.com',
    password: 'password'
  };

  it('should render the login component', () => {
    const wrapper = shallow(<Login />);
    const loginComponent = wrapper.find("[data-test='component-login']");

    expect(loginComponent.length).toBe(1);
  });

  it('should have empty state fields on initial rendering', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('password')).toBe('');
    expect(wrapper.state('errors')).toEqual([]);
    expect(wrapper.state('loading')).toBe(false);
  });

  it('should fill correct user input using setState', () => {
    const wrapper = shallow(<Login />);

    wrapper.setState({
      email: user.email,
      password: user.password
    });

    expect(wrapper.state('email')).toEqual(user.email);
    expect(wrapper.state('password')).toEqual(user.password);
  });
});

describe('Register Component', () => {
  const newUser = {
    username: 'anthony',
    email: 'anthony@gmail.com',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation'
  };

  it('should render the register component', () => {
    const wrapper = shallow(<Register />);
    const registerComponent = wrapper.find("[data-test='component-register']");

    expect(registerComponent.length).toBe(1);
  });

  it('should have empty state fields on initial rendering', () => {
    const wrapper = shallow(<Register />);

    expect(wrapper.state('username')).toBe('');
    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('password')).toBe('');
    expect(wrapper.state('passwordConfirmation')).toBe('');
    expect(wrapper.state('errors')).toEqual([]);
    expect(wrapper.state('loading')).toBe(false);
  });

  it('should fill correct user input using setState', () => {
    const wrapper = shallow(<Register />);

    wrapper.setState({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      passwordConfirmation: newUser.passwordConfirmation
    });

    expect(wrapper.state('email')).toEqual(newUser.email);
    expect(wrapper.state('password')).toEqual(newUser.password);
  });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Login from '../Login';
import Register from '../Register';

Enzyme.configure({ adapter: new EnzymeAdapter() });

//TODO: refactor the shallow wrapper creation through a dynamic helper setup function (adopt DRY)

describe('Login Component', () => {
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

  it('should setState when user fills login information', () => {
    const wrapper = shallow(<Login />);

    wrapper.setState({ email: 'anthony@gmail.com', password: 'password' });

    expect(wrapper.state('email')).toEqual('anthony@gmail.com');
    expect(wrapper.state('password')).toEqual('password');
    // expect(wrapper.state('errors')).toEqual([]);
    // expect(wrapper.state('loading')).toBe(false);
  });
});

describe('Register Component', () => {
  it('should render the register component', () => {
    const wrapper = shallow(<Register />);
    const registerComponent = wrapper.find("[data-test='component-register']");

    expect(registerComponent.length).toBe(1);
  });
});

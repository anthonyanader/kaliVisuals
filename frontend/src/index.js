import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { setUser, clearUser } from './actions';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './components/Spinner';

import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

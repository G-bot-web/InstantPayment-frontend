import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers/index'
import Home from './component/Home';
import { applyMiddleware, compose } from 'redux';
import { ishistory } from './history';
import {
 Router,
  Switch,
  Route,
} from "react-router-dom";
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const thunkMiddleware = require('redux-thunk').default;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


ReactDOM.render(
  <Router  history={ishistory} >
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        {/* <Route path="/signup" component={SignUp} />
        <Route path="/candidate/:id" ><Home /></Route>
        <Route path="/candidate/:new" ><NewForm /></Route> */}
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

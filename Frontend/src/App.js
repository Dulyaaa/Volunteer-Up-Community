import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import LogIn from './pages/login'
import SignUp from './pages/signup'
import Events from './pages/events/events'
import Error from './pages/error'
import Footer from './pages/footer'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/log-in" component={LogIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/events" component={Events} />
              <Route exact path="*" component={Error} />
            </Switch>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    )
  }
}

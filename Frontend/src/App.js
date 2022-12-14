import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import LogIn from './pages/login'
import SignUp from './pages/signup'
import Profile from './pages/user/profile'
import NewEvent from './pages/user/newEvent'
import UpdateEvent from './pages/user/updateEvent'
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
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/new-event" component={NewEvent} />
              <Route exact path="/update/:id" component={UpdateEvent} />
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

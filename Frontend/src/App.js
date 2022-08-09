import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    )
  }
}

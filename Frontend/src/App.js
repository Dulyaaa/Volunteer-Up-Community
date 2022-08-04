import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{ padding: 10 }}>

        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<div> <h2> 404 Page not found etc</h2> </div>} />
            </Routes>
          </BrowserRouter>
        </div>
        <br />
        <div>
          <footer>
            <hr />
            @Copyright© 2020
          </footer>
        </div>

      </div>
    )
  }
}

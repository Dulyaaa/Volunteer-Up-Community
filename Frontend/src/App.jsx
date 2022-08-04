import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/navBar';
import CreateCategory from './components/Category/createCategory';
import Categories from './components/Category/categories';
import RoomsByCategory from './components/Category/viewRoomsByCategory';
import CreateRoom from './components/Room/createRoom';
import Rooms from './components/Room/room';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Router>
                    <NavBar />
                    <section>
                        <Switch>
                            <Route path="/create-category" component={CreateCategory}></Route>
                            <Route path="/categories" component={Categories}></Route>
                            <Route path="/create-room" component={CreateRoom}></Route>
                            <Route path="/rooms" component={Rooms}></Route>
                            <Route path="/:id" component={RoomsByCategory}></Route>
                        </Switch>
                    </section>
                </Router>
            </div>
        )
    }
}
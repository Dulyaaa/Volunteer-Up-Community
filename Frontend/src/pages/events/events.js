import React, { Component } from 'react'
import EventService from '../../services/event';
import logo from '../../assets/logos.png'

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchEvents: ""
        };
        this.receivedData = this.receivedData.bind(this);
        this.onChangeSearchEvents = this.onChangeSearchEvents.bind(this);
        this.searchEvents = this.searchEvents.bind(this);
    }

    componentDidMount() {
        this.receivedData();
    }

    onChangeSearchEvents = (e) => {
        const searchEvents = e.target.value;
        this.setState({ searchEvents: searchEvents });
    }

    receivedData = () => {
        EventService.getAll().then(res => {
            this.setState({
                data: res.data.data.allEvents
            });
        }).catch(e => {
            console.log(e);
        });
    }


    searchEvents = () => {
        console.log(this.state.searchEvents)
        EventService.searchEvents(this.state.searchEvents).then(res => {
            this.setState({
                data: res.data.data.events
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <header id="header" class="fixed-top">
                    <nav class="navbar navbar-expand-lg navbar-light bg-dark sticky" data-offset="500">
                        <div class="container">
                            <div class="logo float-left">
                                <a href="/">
                                    <img src={logo} alt="" class="img-fluid" />
                                </a>
                            </div>
                            <button
                                class="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarContent"
                                aria-controls="navbarContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="navbar-collapse collapse" id="navbarContent">
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item">
                                        <a class="nav-link" href="/">
                                            HOME
                                        </a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/events">
                                            EVENTS
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/log-in">
                                            LOG IN
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/sign-up">
                                            SIGN UP
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <section id="intro" class="container" data-aos="zoom-out">
                    <header class="section-header" style={{ marginTop: "5%" }}>
                        {/* <h3>Events</h3> */}
                        <div class="d-flex" role="search" style={{ width: "45%", marginLeft: "30%" }}>
                            <input class="form-control me-2" type="search" placeholder="Search (eg: Beach, Adult, Education...)" aria-label="Search" value={this.state.searchEvents} onChange={this.onChangeSearchEvents} />
                            <button class="btn btn-outline-dark" type="submit" onClick={this.searchEvents}>Search</button>
                        </div>
                    </header>
                    <div id="cards_landscape_wrap-2">
                        <div class="container">
                            <div class="row justify-content-center">
                                {this.state.data.map(
                                    event =>
                                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" >
                                            <div class="card-flyer">
                                                <div class="text-box">
                                                    <div class="image-box">
                                                        <img src={event.imageUrl} alt="" />
                                                    </div>
                                                    <div class="text-container">
                                                        <h6>{event.title}</h6>
                                                        <p>{event.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        )
    }
}
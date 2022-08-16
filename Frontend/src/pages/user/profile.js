import React, { Component } from 'react';
import { OverlayTrigger, Row, Col, Tooltip, Table } from 'react-bootstrap'
import AuthService from '../../services/auth'
import EventService from '../../services/event'
import UserEvents from './userEvents'
import logo from '../../assets/logo.png'

const initialState = {
    userEvents: [],
    userDraftEvents: [],
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getUserEvents = this.getUserEvents.bind(this);
        this.getUserDraftEvents = this.getUserDraftEvents.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.getUserEvents();
        this.getUserDraftEvents();
    }

    getUserEvents = () => {
        const token = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${token.data.token}` }
        };
        EventService.getByUser(config)
            .then(response => {
                this.setState({
                    userEvents: response.data.data.userEvents
                });
                console.log("userEvents", this.state.userEvents)
            })
            .catch((error) => {
                this.setState({
                    loading: true,
                    message: error.response.data.message,
                    success: false
                });
                console.log(error.response);
                // alert(error.response.data.message);
            });
    }

    getUserDraftEvents = () => {
        const token = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${token.data.token}` }
        };
        EventService.getDraftsByUser(config)
            .then(response => {
                this.setState({
                    userDraftEvents: response.data.data.userDraftEvents
                });
                console.log("userDraftEvents", this.state.userDraftEvents)
            })
            .catch((error) => {
                this.setState({
                    loading: true,
                    message: error.response.data.message,
                    success: false
                });
                console.log(error.response);
                // alert(error.response.data.message);
            });
    }


    render() {
        return (
            <div>
                <header id="header" class="fixed-top">
                    <nav
                        class="navbar navbar-expand-lg navbar-light bg-dark sticky"
                        data-offset="500"
                    >
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
                                    <li class="nav-item">
                                        <a class="nav-link" href="/events">
                                            EVENTS
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/log-in">
                                            LOG OUT
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <section id="intro" data-aos="zoom-out">
                    <Row>
                        {/* Side bar */}
                        <Col sm={3} style={{ backgroundColor: "#f5eaf6" }}>
                            <header class="section-header" style={{ marginTop: "5%" }}>
                                <h3>User Dashboard</h3>
                            </header>
                            <div class="text-center">
                                <a href='/new-event'>
                                    <button class="main-btn" type="submit" >
                                        Log Out
                                    </button>
                                </a>
                            </div>
                        </Col>
                        {/* Post details */}
                        <Col sm={8}>
                            <div class="text-right">
                                <OverlayTrigger
                                    key="bottom"
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id="bottom">
                                            Create New Event
                                        </Tooltip>
                                    }
                                >
                                    <a href='/new-event'>
                                        <button class="main-btn" type="submit" >
                                            +
                                        </button>
                                    </a>
                                </OverlayTrigger>
                            </div>
                            {/* Published Posts */}
                            <Col>
                                {/* <Col sm>sm=true sm=true</Col> */}
                                <div class="text-right">
                                    <header class="section-header">
                                        <h4>Posts</h4>
                                    </header>
                                </div>
                                <div id="cards_landscape_wrap-2">
                                    <div class="row justify-content-center">
                                        {this.state.userEvents.map(
                                            event =>
                                                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
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
                                        )}
                                    </div>
                                </div>
                            </Col>
                            {/* Drafts Posts */}
                            <Col>
                                <header class="section-header">
                                    <h4 style={{ paddingTop: 50 }}>Drafts</h4>
                                </header>
                                <div id="cards_landscape_wrap-2">
                                    <div class="row justify-content-center">
                                        {this.state.userDraftEvents.map(
                                            event =>
                                                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
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
                                        )}
                                    </div>
                                </div>
                            </Col>

                        </Col>
                    </Row>


                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message}  {this.state.success ? '' : <a href="/sign-up" class="alert-link">Register Here.</a>}
                        </div>
                    ) : ('')
                    }
                    {/* <UserEvents /> */}

                </section>
            </div>
        );
    }
}

export default Profile
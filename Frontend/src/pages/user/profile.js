import React, { Component } from 'react';
import { OverlayTrigger, Row, Col, Tooltip, Image } from 'react-bootstrap'
import AuthService from '../../services/auth'
import EventService from '../../services/event'
import logo from '../../assets/logos.png'
import NoData from '../../assets/nodata.png'

const initialState = {
    userEvents: [],
    userDraftEvents: [],
    userDetails: {},
    token: "",
    alert:""
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getUserEvents = this.getUserEvents.bind(this);
        this.getUserDraftEvents = this.getUserDraftEvents.bind(this); 
        this.getUserSession = this.getUserSession.bind(this);
        this.logOut = this.logOut.bind(this); 
        this.state = initialState;
    }

    componentDidMount() {
        this.getUserEvents();
        this.getUserDraftEvents();
        this.getUserSession();
    }

    getUserSession = () => {
        const data = AuthService.getCurrentUser();
        this.setState({
            token: data.data.token,
            userDetails: data.data.user
        });
    }

    logOut = () => {
        AuthService.logout();
        this.setState({
            token: '',
            userDetails: '',
            alert: "Logging Out."
        });
        setTimeout(() => {
            this.props.history.push('/');
        }, 1200);
    }

    getUserEvents = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
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
                                        <a class="nav-link" onClick={this.logOut}>
                                            LOG OUT
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <section id="intro" data-aos="zoom-out">
                    {this.state.alert ? (
                    <div class={`alert ${"alert-success" }`} role="alert">
                        {this.state.alert}
                    </div>
                    ) : ('')
                    }
                    <Row>
                        {/* Side bar */}
                        <Col sm={3} style={{ backgroundColor: "#d2d2d2" }}>
                            <header class="section-header" style={{ marginTop: "5%", textAlign: "center" }}>
                                <Image fluid="true" roundedCircle="true" src="https://www.ysm.ca/wp-content/uploads/2020/02/default-avatar.jpg" thumbnail style={{ border: "none", height: 150, marginBottom: 30 }} />
                                <h3>{this.state.userDetails.displayName}</h3>
                                <p>Email: {this.state.userDetails.email}</p>
                                <p>Full Name: {this.state.userDetails.firstName} {this.state.userDetails.lastName} </p>
                            </header>
                            <div class="text-center">
                                <a>
                                    <button class="main-btn" type="submit" onClick={this.logOut}>
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
                                        <h4>Published</h4>
                                    </header>
                                </div>
                                <div id="cards_landscape_wrap-2">
                                    <div class="row justify-content-center">
                                        {this.state.userEvents < 0 ?
                                            this.state.userEvents.map(
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
                                            )
                                            : <div>
                                                <Image src={NoData} thumbnail style={{ border: "none", height: 100 }} />
                                                <header class="section-header">
                                                    <p>No Publish Posts Yet</p>
                                                </header>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                            {/* Drafts Posts */}
                            <Col>
                                <header class="section-header">
                                    <h4 style={{ paddingTop: 50 }}>Drafted</h4>
                                </header>
                                <div id="cards_landscape_wrap-2">
                                    <div class="row justify-content-center">
                                        {this.state.userDraftEvents < 0 ? this.state.userDraftEvents.map(
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
                                        )
                                            : <div>
                                                <Image src={NoData} thumbnail style={{ border: "none", height: 100 }} />
                                                <header class="section-header">
                                                    <p>No Draft Posts Yet</p>
                                                </header>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>

                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

export default Profile
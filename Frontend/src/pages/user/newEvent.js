import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import AuthService from '../../services/auth'
import EventService from '../../services/event'
import logo from '../../assets/logo.png';
import pic from '../../assets/login.gif';

const initialState = {
    title: "",
    description: "",
    category: "",
    venue: "",
    locationPoint: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    loading: false,
    message: "",
    success: false
}

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.state = initialState;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createEvent = (e) => {
        e.preventDefault();
        const token = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${token.data.token}` }
        };
        const data = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            venue: this.state.venue,
            locationPoint: this.state.locationPoint,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            imageUrl: this.state.imageUrl,
        };
        EventService.create(data, config)
            .then((response) => {
                    this.setState({
                        loading: true,
                        message: response.data.message,
                        success: true
                    });
                    setTimeout(() => {
                        this.props.history.push('/profile');
                    }, 1200);
            })
            .catch((error) => {
                this.setState({
                    loading: true,
                    message: error.response.data.message,
                    success: false
                });
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
                                    <li class="nav-item active">
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
                                        <a class="nav-link" href="/profile">
                                            PROFILE
                                        </a>
                                    </li>
                                    {/* TODO: logout */}
                                    <li class="nav-item">
                                        <a class="nav-link" href="/sign-up">
                                            LOG OUT
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <section id="intro" class="container" data-aos="zoom-out">
                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message} {this.state.success ? '' : <a href="/log-in" class="alert-link">Log In Here.</a>}
                        </div>
                    ) : ('')}
                    <Card style={{ width: '100%' }}>
                        <header class="section-header" style={{ marginTop: "5%" }}>
                            <h3>Create New Event</h3>
                        </header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Image src={pic} thumbnail style={{ border: "none", height: 500 }} />
                                </Col>
                                <Col>
                                    <div className="submit-form" style={{ width: 350, textAlign: "left", color: "grey", marginLeft: "7%" }}>
                                        <div>
                                            <form onSubmit={(event) => this.createEvent(event)}>
                                                <div className="form-group">
                                                    <label htmlFor="title" >Event Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="title"
                                                        required
                                                        value={this.state.title}
                                                        onChange={this.onChange}
                                                        name="title"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName" >Event Description</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        required
                                                        value={this.state.description}
                                                        onChange={this.onChange}
                                                        name="description"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="displayName" >Category</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="category"
                                                        required
                                                        value={this.state.category}
                                                        onChange={this.onChange}
                                                        name="category"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="locationPoint" >Location Point</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="locationPoint"
                                                        required
                                                        value={this.state.locationPoint}
                                                        onChange={this.onChange}
                                                        name="locationPoint"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="startDate" >Start Date</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="startDate"
                                                        required
                                                        value={this.state.startDate}
                                                        onChange={this.onChange}
                                                        name="startDate"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="endDate" >End Date</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="endDate"
                                                        required
                                                        value={this.state.endDate}
                                                        onChange={this.onChange}
                                                        name="endDate"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imageUrl" >Image Url</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        id="imageUrl"
                                                        required
                                                        value={this.state.imageUrl}
                                                        onChange={this.onChange}
                                                        name="imageUrl"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="venue" >Venue</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="venue"
                                                        required
                                                        value={this.state.venue}
                                                        onChange={this.onChange}
                                                        name="venue"
                                                    />
                                                </div>
                                                <div class="text-center">
                                                    <a>
                                                        <button class="main-btn" type="submit" onSubmit={(event) => this.createEvent(event)}>
                                                            Add New Event
                                                        </button>
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}
export default NewEvent
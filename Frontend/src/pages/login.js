import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import AuthService from '../services/auth';
import logo from '../assets/logos.png';
import pic from '../assets/login.jpg';

const initialState = {
    email: "",
    password: "",
    loading: false,
    message: "",
    success: true
}

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = initialState;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        AuthService.login(data)
            .then((response) => {
                if (response.data.data.token) {
                    this.setState({
                        loading: true,
                        message: response.data.message,
                        success: true
                    });
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setTimeout(() => {
                        this.props.history.push('/profile');
                    }, 1200);
                }
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
                                    <li class="nav-item active">
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
                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message}  {this.state.success ? '' : <a href="/sign-up" class="alert-link">Register Here.</a>}
                        </div>
                    ) : ('')
                    }
                    <Card style={{ width: '100%', marginTop: "3%", marginBottom: "5%" }}>
                        <header class="section-header" style={{ marginTop: "5%" }}>
                            <h3>Log In Now</h3>
                        </header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Image src={pic} thumbnail style={{ border: "none", height: 300}} />
                                </Col>
                                <Col>
                                    <div className="submit-form" style={{ width: 350, textAlign: "left", color: "grey", marginTop: "2%", marginLeft: "7%" }}>
                                            <form onSubmit={(event) => this.handleLogin(event)}>
                                                <div className="form-group">
                                                    <label htmlFor="email">User Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        required
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                        name="email"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        required
                                                        value={this.state.password}
                                                        onChange={this.onChange}
                                                        name="password"
                                                    />
                                                </div>
                                                <br />
                                                <div class="text-center">
                                                    <a>
                                                        <button class="main-btn" type="submit" >
                                                            Log In
                                                        </button>
                                                    </a>
                                                </div>
                                            </form>
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

export default LogIn
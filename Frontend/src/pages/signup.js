import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import pic from '../assets/login.gif';
import AuthService from '../services/auth'

const initialState = {
    email: "",
    password: "",
    loading: false,
    message: "",
    formErrors: {}
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.createUser = this.createUser.bind(this);
        this.newBoardingPlace = this.newBoardingPlace.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);
        this.state = initialState;
    }

    onchangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onchangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    createUser = (e) => {
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });
        if (this.handleFormValidation()) {
            AuthService.login(this.state.email, this.state.password).then(
                () => {
                    this.props.history.push("/");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            )
            // BoardingPlaceService.create(data)
            //     .then(response => {
            //         this.setState({
            //             loading: true
            //         });
            //         // alert('Data successfully entered.');
            //         console.log(response.data);
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     });
        }
    }

    newBoardingPlace = () => {
        this.setState({
            email: "",
            password: "",
            loading: false,
            formErrors: {}
        });
    }

    handleFormValidation() {
        const { email, password } = this.state;

        let formErrors = {};
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            formErrors["emailError"] = "*Pet Boarding Place Email is required.";
        }
        else {
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            if (!pattern.test(email)) {
                formIsValid = false;
                formErrors["emailError"] = "*Please enter validate format of email."
            }
        }

        if (!password) {
            formIsValid = false;
            formErrors["passwordError"] = "*Pet Boarding Place Opening Hours are required.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid
    }

    render() {
        const { emailError, passwordError } = this.state.formErrors;

        return (
            <div>
                <header id="header" class="fixed-top">
                    <nav
                        class="navbar navbar-expand-lg navbar-light bg-white sticky"
                        data-offset="500"
                    >
                        <div class="container">
                            {/* <a href="/" class="navbar-brand"> */}
                            {/* SLIIT<span class="text-primary">WIF</span> */}
                            {/* <img src={logo} alt="logo" height="80" width="130" class="img-fluid just" /> */}
                            <div class="logo float-left">
                                <a href="/">
                                    {/* <img src={logo} alt="" class="img-fluid" /> */}
                                </a>
                            </div>
                            {/* </a> */}
                            {/* <img src={logo} alt="logo" height="50" width="100" class="img-fluid just" /> */}
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
                            <div
                                class="navbar-collapse collapse"
                                id="navbarContent"
                            >
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item">
                                        <a class="nav-link" href="/">
                                            HOME
                                        </a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/log-in">
                                            LOG IN
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/past-events">
                                            SIGN UP
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <section id="intro" class="container" data-aos="zoom-out">
                    <div class="text-center" data-aos="fade-up">
                        <h1 class="head-title">Log In Now</h1>
                    </div>
                    <Card style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Image src={pic} thumbnail style={{ border: "none", height: 300 }} />
                                </Col>
                                <Col>
                                    <div className="submit-form" style={{ width: 350, textAlign: "left", color: "grey", marginTop: "2%", marginLeft: "7%" }}>
                                        <div>
                                            <form>
                                                {/* Pet Boarding Place Email */}
                                                <div className="form-group">
                                                    <label htmlFor="email">User Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        required
                                                        value={this.state.email}
                                                        onChange={this.onchangeEmail}
                                                        name="email"
                                                    />
                                                    {/* Pet Boarding Place Email error */}
                                                    <div className="">
                                                        {emailError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{emailError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Opening Hours */}
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        required
                                                        value={this.state.password}
                                                        onChange={this.onchangePassword}
                                                        name="password"
                                                    />
                                                    {/* Pet Boarding Place Opening Hours error */}
                                                    <div className="">
                                                        {passwordError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{passwordError}</div>}
                                                    </div>
                                                </div>
                                                <br />
                                                <div class="text-center">
                                                    <a href=""
                                                        target="_blank" rel="noopener noreferrer">
                                                        <button class="main-btn" type="submit" onClick={this.createUser}>
                                                            Log In
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

export default SignUp;
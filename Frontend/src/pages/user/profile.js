import React, { Component } from 'react';
import AuthService from '../../services/auth'
import UserEvents from './userEvents'

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
    success: true
}

class Profile extends Component {
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
        // const data = {
        //     email: this.state.email,
        //     password: this.state.password
        // };
        // AuthService.login(data)
        //     .then((response) => {
        //         console.log("response", response)
        //         if (response.data.data.token) {
        //             this.setState({
        //                 loading: true,
        //                 message: response.data.message,
        //                 success: true
        //             });
        //             localStorage.setItem("user", JSON.stringify(response.data));
        //             setTimeout(() => {
        //                 alert('login successfully.');
        //                 this.props.history.push('/events');
        //             }, 1200);
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             loading: true,
        //             message: error.response.data.message,
        //             success: false
        //         });
        //         console.log(error.response);
        //         alert(error.response.data.message);
        //     });

        const result = AuthService.getCurrentUser();
        console.log("result", result)
    }

    render() {
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
                    <header class="section-header" style={{ marginTop: "5%" }}>
                        <h3>User Dashboard</h3>
                    </header>
                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message}  {this.state.success ? '' : <a href="/sign-up" class="alert-link">Register Here.</a>}
                        </div>
                    ) : ('')
                    }
                    <div class="text-center">
                        <a href='/new-event'>
                            <button class="main-btn" type="submit" >
                             Create New Event
                            </button>
                        </a>
                    </div>
                    <UserEvents />
                </section>
            </div>
        );
    }
}

export default Profile
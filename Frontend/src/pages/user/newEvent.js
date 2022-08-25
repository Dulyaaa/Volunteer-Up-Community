import React, { Component } from 'react';
import { Row, Col, Card, Image, Form } from 'react-bootstrap';
import { RiDraftFill, RiSave2Fill, RiDeleteBack2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import AuthService from '../../services/auth'
import EventService from '../../services/event'
import logo from '../../assets/logos.png';
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
    visibility: true,
    loading: false,
    message: "",
    success: false
}

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getEvent(this.props.match.params.id);
        }
    }

    getEvent(id) {
        EventService.getEventById(id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    category: response.data.category,
                    venue: response.data.venue,
                    locationPoint: response.data.locationPoint,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    imageUrl: response.data.imageUrl,
                    visibility: response.data.visibility,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    // submitted: false
                });
            });
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
            visibility: this.state.visibility
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

    deleteUserEvent = (id) => {
        EventService.delete(id)
            .then(response => {
                this.setState({
                    loading: true,
                    message: response.data.message,
                    success: true
                });
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
        const image = "https://affinityhealthclinic.ca/wp-content/uploads/2017/07/Image-Placeholder.jpg";
        return (
            <div>
                <section id="intro" class="container" data-aos="zoom-out">
                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message} {this.state.success ? '' : <a href="/log-in" class="alert-link">Log In Here.</a>}
                        </div>
                    ) : ('')}
                    <Card style={{ width: '100%', backgroundColor: "#06a17f31" }}>
                        <header class="section-header" style={{ marginTop: "5%" }}>
                            <h3>Create New Event</h3>
                        </header>
                        {/* <header class="section-header" style={{ marginTop: "5%" }}>
                            <h3>Create New Event</h3>
                        </header> */}
                        <Card.Body>
                            <div className="submit-form" style={{ textAlign: "left", color: "black" }}>
                                <form onSubmit={(event) => this.createEvent(event)}>
                                    <Row>
                                        <Col>
                                            <Image src={!this.state.imageUrl ? image : this.state.imageUrl} thumbnail style={{ border: "1", height: 300 }} />
                                            <br />
                                            <br />
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
                                                <label htmlFor="startDate" >Start Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="startDate"
                                                    required
                                                    value={this.state.startDate}
                                                    onChange={this.onChange}
                                                    name="startDate"
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
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                                <label htmlFor="imageUrl" >Image URL</label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    id="imageUrl"
                                                    required
                                                    value={!this.state.imageUrl ? '' : this.state.imageUrl}
                                                    onChange={this.onChange}
                                                    name="imageUrl"
                                                />
                                            </div>
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
                                                <label htmlFor="description" >Event Description</label>
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
                                                <label htmlFor="endDate" >End Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="endDate"
                                                    required
                                                    value={this.state.endDate}
                                                    onChange={this.onChange}
                                                    name="endDate"
                                                />
                                            </div>
                                            <Row style={{ paddingTop: 35, justifyContent: "center" }}>
                                                <div class="text-center">
                                                    <a> <button class="main-btn" type="submit" onClick={() => (this.state.visibility = true)}>
                                                        <RiSave2Fill
                                                            size={25}
                                                            style={{ textAlign: "center" }} />
                                                    </button></a>
                                                    {' '}
                                                    <a><button class="main-btn" type="submit" onClick={() => (this.state.visibility = false)}>
                                                        <RiDraftFill
                                                            size={25}
                                                            style={{ textAlign: "center" }} />
                                                    </button></a>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}
export default NewEvent
import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { RiDraftFill, RiSave2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import EventService from '../../service/event.service';

const initialState = {
    entityId: "",
    title: "",
    description: "",
    category: "",
    venue: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    visibility: true,
    loading: false,
    message: "",
    success: true,
}

class UpdateEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.onChangeVisibility = this.onChangeVisibility.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.getEvent(this.props.match.params.id);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeVisibility = (visibility) => {
        this.setState({ visibility: visibility });
    }

    getEvent = (id) => {
        EventService.getEventById(id)
            .then(response => {
                this.setState({
                    entityId: response.data.data.entityId,
                    title: response.data.data.title,
                    description: response.data.data.description,
                    category: response.data.data.category,
                    venue: response.data.data.venue,
                    startDate: response.data.data.startDate,
                    endDate: response.data.data.endDate,
                    imageUrl: response.data.data.imageUrl,
                    visibility: response.data.data.visibility,
                    message: response.data.message,
                    loading: true,
                    success: true
                });
            })
            .catch(error => {
                this.setState({
                    loading: true,
                    message: error.response.data.message,
                    success: false
                });
            });
    }

    updateEvent = (visibility) => {
        this.onChangeVisibility(visibility);
        setTimeout(() => {
            const data = {
                entityId: this.state.entityId,
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                venue: this.state.venue,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                imageUrl: this.state.imageUrl,
                visibility: this.state.visibility
            };
            EventService.updateEvent(this.state.entityId, data)
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
        }, 1200);
    }

    deleteUserEvent = (id) => {
        EventService.delete(id)
            .then((response) => {
                this.setState({
                    loading: true,
                    message: response.data.message,
                    success: false
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
        const image = "https://affinityhealthclinic.ca/wp-content/uploads/2017/07/Image-Placeholder.jpg";
        return (
            <div>
                <section id="intro" class="container" data-aos="zoom-out">
                    {this.state.loading ? (
                        <div class={`alert ${this.state.success ? "alert-success" : "alert-danger"}`} role="alert">
                            {this.state.message}
                        </div>
                    ) : ('')}
                    <Card style={{ width: '100%', backgroundColor: "#06a17f31" }}>
                        <header class="section-header" style={{ marginTop: "5%" }}>
                            <h3>Update Event</h3>
                        </header>
                        <Card.Body>
                            <div className="submit-form" style={{ textAlign: "left", color: "black" }}>
                                <form>
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
                                                    type="text"
                                                    className="form-control"
                                                    id="startDate"
                                                    required
                                                    value={new Date(this.state.startDate).toDateString()}
                                                    onChange={this.onChange}
                                                    name="startDate"
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
                                            <div className="form-group">
                                                <label htmlFor="endDate">End Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="endDate"
                                                    required
                                                    value={new Date(this.state.endDate).toDateString()}
                                                    onChange={this.onChange}
                                                    name="endDate"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                                <Row style={{ paddingTop: 35, justifyContent: "center" }}>
                                    <div class="text-center">
                                        <a> <button class="main-btn" type="submit" onClick={() => this.updateEvent(true)}>
                                            <RiSave2Fill
                                                // onClick={() => this.deleteUserEvent(userEvents.entityId)}
                                                size={25}
                                                style={{ textAlign: "center" }} />
                                        </button></a>
                                        {' '}
                                        <a><button class="main-btn" type="submit" onClick={() => this.updateEvent(false)}>
                                            <RiDraftFill
                                                size={25}
                                                style={{ textAlign: "center" }} />
                                        </button></a>
                                        {' '}
                                        <a><button class="main-btn" type="submit"
                                            onClick={() => this.deleteUserEvent(this.state.entityId)}
                                        >
                                            <RiDeleteBin2Fill
                                                size={25}
                                                style={{ textAlign: "center" }} />
                                        </button> </a>
                                    </div>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}
export default UpdateEvent
import React, { Component } from 'react';
import { Table, } from 'react-bootstrap';
import AuthService from '../../services/auth'
import { RiDeleteBin5Line } from "react-icons/ri";
import EventService from '../../services/event'

const initialState = {
    userEvents: []
}
export default class UserEvents extends Component {
    constructor(props) {
        super(props);
        this.getUserEvents = this.getUserEvents.bind(this);
        this.deleteUserEvent = this.deleteUserEvent.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.getUserEvents();
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

    deleteUserEvent = (id) => {
        EventService.delete(id)
            .then(response => {
                this.setState({
                    userEvents: this.state.userEvents.filter(userEvents => userEvents.entityId !== id),
                    loading: true,
                    message: response.data.message,
                    success: true
                });
                this.getUserEvents();
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
            <div className='' style={{ margin: 20 }}>
                <br />
                <Table striped bordered hover>
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th>Image</th>
                            <th>Event Title</th>
                            <th>Event Description</th>
                            <th>Event Venue</th>
                            <th>Event Start Date</th>
                            <th>Event End Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userEvents.map(
                            userEvents =>
                                <tr key={userEvents.entityId}>
                                    <td style={{ justifyContent: "center" }}>
                                        <div class="image-box">
                                            <img src={userEvents.imageUrl} alt="Not Available" style={{ width: 200 }} />
                                        </div></td>
                                    <td>{userEvents.title}</td>
                                    <td style={{ textAlign: "justify" }}>{userEvents.description}</td>
                                    <td>{userEvents.venue}</td>
                                    <td>{userEvents.startDate}</td>
                                    <td>{userEvents.endDate}</td>
                                    <td>
                                        {/* <FiEdit
                                                size={30}
                                                style={{ textAlign: "center", color: "blue" }} /> */}
                                        <RiDeleteBin5Line
                                            onClick={() => this.deleteUserEvent(userEvents.entityId)}
                                            size={30}
                                            style={{ textAlign: "center", color: "red" }} />
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
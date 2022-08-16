import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import EventService from '../../services/event';
import logo from '../../assets/logo.png'

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.receivedData()
    }

    receivedData() {
        EventService.getAll()
            .then(res => {
                console.log(res.data.data.allEvents)
                const data = res.data.data.allEvents;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(event => <React.Fragment>
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
                </React.Fragment>)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    postData
                })
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    };

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
                        <h3>Events</h3>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </header>
                    <div id="cards_landscape_wrap-2">
                        <div class="container">
                            <div class="row justify-content-center">
                                {this.state.postData}
                            </div>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={'< Previous'}
                        nextLabel={'Next >'}
                        pageCount={this.state.pageCount}
                        onPageChange={this.handlePageClick}
                        // containerClassName={"navigationButtons"}
                        // previousLinkClassName={"previousButton"}
                        // nextLinkClassName={"nextButton"}
                        // disabledClassName={"navigationDisabled"}
                        // activeClassName={"navigationActive"}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination justify-content-end"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </section>
            </div>
        )
    }
}
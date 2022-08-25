import gif from '../assets/error.gif'
import logo from '../assets/logos.png';

export default function Error() {
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
            <section id="intro" class="clearfix">
                <div class="container" data-aos="fade-up">
                    <img src={gif} alt="" class="img-fluid" style={{ height: 600 }} />
                </div>
            </section>
        </div>
    )
}
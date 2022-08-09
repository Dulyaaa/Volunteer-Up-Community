import gif from '../../assets/main.gif'

export default function Home() {
    return (
        <div>
            <header id="header" class="fixed-top">
                <nav
                    class="navbar navbar-expand-lg navbar-light bg-dark sticky"
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

            <section id="intro" class="clearfix">
                <div class="container" data-aos="fade-up">
                    <div class="intro-img" data-aos="zoom-out" data-aos-delay="200">
                        <img src={gif} alt="" class="img-fluid" />
                    </div>
                    <div class="intro-info" data-aos="zoom-in" data-aos-delay="100">
                        <h2>Volunteer Up Community</h2>
                        <p>
                            We are a group of enthusiastic volunteers who
                            believe in the usage and contribution of helping 
                            each others. Our community's primary objective is 
                            to promote, inspire and diversify the usage of 
                            helping each other amongst empowered men & women.
                        </p>
                        <div>
                            <a href=""
                                target="_blank" rel="noopener noreferrer">
                                <button class="main-btn" type="submit">
                                    Become A Volunteer
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <main id="main">
                {/* <WeAre />
                <Mascot />
                <Hackathon /> */}
                {/* <PastEvents /> */}
                {/* <Webinars /> */}
                {/* <Blogs /> */}
            </main>
        </div>
    )
}
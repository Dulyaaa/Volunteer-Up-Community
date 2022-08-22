import logo from '../assets/logos.png';
import backgroundImage from '../assets/footer-topography.svg'


export default function Footer() {
    return (
        <div>
            <footer id="footer">
                {/* Copyright area */}
                <div class="copyright-area">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12">
                                <div class="copyright-text">
                                    <img src={logo} alt="logo" height="80" width="130" class="img-fluid just footer-logo" />
                                    <p>
                                        Copyright &copy; 2022 | All Rights Reserved
                                        <a href="!#"> Volunteer Up Community</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>)
}
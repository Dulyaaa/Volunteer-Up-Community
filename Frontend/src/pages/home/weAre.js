import { GiPlantsAndAnimals, GiTeacher } from 'react-icons/gi';
import { TbBeach, TbDisabled } from 'react-icons/tb';

export default function WeAre() {
    return (
        <section id="we-are" class="section-bg">
            <div class="container" data-aos="zoom-in">
                <header class="section-header">
                    <h3>Who We Are?</h3>
                </header>
                <p>
                    The <b>"Volunteer Up Community"</b> platform promotes
                    volunteer events that one of the volunteers
                    has organized to bring together other volunteers.
                    The location and other event details are published
                    separately. The volunteers would be able
                    to assist with the following areas/projects.
                </p>

                <div class="container-fluid auto-space auto-space-vertical pt-0">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 my-2">
                            <div class="counter-box colored">
                                <i class=""><TbDisabled /></i>
                                <span class="counter"><p>Special Care Needs</p></span>
                            </div>
                        </div>
                        <div class="four col-sm-6 col-md-3 my-2">
                            <div class="counter-box colored">
                                <i class=""><TbBeach /></i>
                                <span class="counter"><p>Beach</p></span>
                            </div>
                        </div>
                        <div class="four col-sm-6 col-md-3 my-2">
                            <div class="counter-box colored">
                                <i class=""><GiPlantsAndAnimals /></i>
                                <span class="counter"><p>Animals & Plants</p></span>
                            </div>
                        </div>
                        <div class="four col-sm-6 col-md-3 my-2">
                            <div class="counter-box colored">
                                <i class=""><GiTeacher /></i>
                                <span class="counter"><p>Teaching</p></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
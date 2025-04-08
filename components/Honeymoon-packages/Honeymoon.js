import classNames from "classnames";
import classes from "../Honeymoon-packages/Honeymoon.module.less"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { kuposModalWithButtonsState, selectedPackageTabState, selectedTabServicesState } from "../../recoil/atoms/common";
import { useEffect, useState } from "react";
import { callApi } from '../../services/api/callApi'


const Honey = () => {

    //recoil states
    const selectedCategory = useRecoilValue(selectedPackageTabState);
    const selectedService = useRecoilValue(selectedTabServicesState);
    const setModal = useSetRecoilState(kuposModalWithButtonsState)

    const sendRequest = (items) => { }

    const callbackModal = (items) => {
        setModal({ showModal: true, showButton1: false, buttonText1: "Send Query", onButtonClick1: () => sendRequest(items), showButton2: false, buttonText2: "Cancel", showCloseIcon: true, children: () => <Form /> })
    }


    useEffect(() => {

        const filteredPackages = packages.filter((item) => (item.category === selectedCategory.title && item.service === selectedService));
        setPackages(filteredPackages)

    }, [selectedCategory, selectedService])



    const [packages, setPackages] = useState([])

    // use effects 
    useEffect(() => {

        callApi({
            endPoint: "packages",
            method: "GET",
            callback: (result) => {
                if (result?.status === 200) {

                    if (result?.data?.data?.length > 0) {
                        setPackages(result?.data?.data)
                    }
                    packages
                } else {
                    console.log("error")
                }



            },
        });




    }, []);


    const makeCall = () => {
        window.open("tel:9999999990")
    }


    return (
        <div className={classNames(classes.honeymoon_parent)}>
            <div className={classNames(classes.honeymoon_parent_head)}>
                <div className={classNames(classes.head_one)}>
                    <span>Honeymoon Special</span>
                </div>
                <div className={classNames(classes.head_two)}>
                    <span>Tailor-Made Honeymoons Just For You</span>
                </div>
            </div>
            <div className={classNames(classes.honeymoon_parent_body)}>
                {packages?.map((items) => {
                    return (
                        <div className={classNames(classes.honeymoon_inner_parent_body)}>
                            <div className={classNames(classes.honeymoon_inner_parent_body_img)}>
                                <img src={items.image} alt="" />
                            </div>
                            <div className={classNames(classes.honeymoon_inner_parent_body_overly)}>
                                <span>{items.discount}%</span>
                            </div>
                            <div className={classNames(classes.honeymoon_inner_parent_body_stars)}>
                                <div className={classNames(classes.stars_one)}>
                                    <span>{items.duration}</span>
                                </div>
                                <div className={classNames(classes.stars_two)}>
                                    <span>{items.rating}</span>
                                    <span className={classes.rating_icon}><img src="./images/icons/star.png" alt="" /></span>
                                </div>
                            </div>
                            <div className={classNames(classes.honeymoon_inner_parent_body_dec)}>
                                <span>{items.name}</span>
                            </div>
                            {/* <div className={classNames(classes.honeymoon_inner_parent_body_christmas)}>
                                <div className={classNames(classes.christmas_text)}>
                                    <span>{items.christmasT}</span>
                                </div>
                                <div className={classNames(classes.christmas_img)}>
                                    <img src={items.christmasI} alt="" />
                                </div>
                            </div> */}
                            <div className={classNames(classes.honeymoon_inner_parent_body_price)}>
                                <span>{items.price}</span>
                                <span>{items.category}</span>
                            </div>
                            <div className="activities_container">
                                <span>{items.activities.split(",")}</span>
                            </div>
                            <div className={classNames(classes.honeymoon_inner_parent_body_call)}>
                                <div className={classNames(classes.call_one)} onClick={makeCall}>
                                    <img src={items.but1img} alt="" />
                                    <span>Call Back</span>
                                </div>
                                <div className={classNames(classes.call_two)}>
                                    <button onClick={() => callbackModal(items)}>{"Request Callback"}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
const Form = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsFormSubmitted(true);
    };
    return (
        <div className={classNames(classes.SmallNavbar_login)}>
            <div className={classNames(classes.SmallNavbar_login_head_image)}>
                <div className={classNames(classes.SmallNavbar_login_img)}>
                    <img src="/images/honey/back2.jpg" alt="loding..." />
                </div>
                <div className={classNames(classes.SmallNavbar_login_text)}>
                    <span>Kashmir Winter Special DEAL With Flights</span>
                    <span> INR 68,550Sale Price!</span>
                </div>
            </div>
            <div className={classNames(classes.SmallNavbar_login_form)}>
                {!isFormSubmitted && (
                    <div className={classNames(classes.SmallNavbar_login_form)}>
                        <div className={classNames(classes.SmallNavbar_login_form_in1)}>
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div className={classNames(classes.SmallNavbar_login_form_in2)}>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className={classNames(classes.SmallNavbar_login_form_in3)}>
                            <input type="text" placeholder="+91" />
                            <input type="text" placeholder="Your Phone" />
                        </div>
                        <div className={classNames(classes.SmallNavbar_login_form_in4)}>
                            <input type="text" placeholder="Teavel Date" />
                            <input type="text" placeholder="Traveller Count" />
                        </div>
                        <div className={classNames(classes.SmallNavbar_login_form_in5)}>
                            <textarea placeholder="Message" cols="30" rows="10"></textarea>
                        </div>
                        {/* <div className={classNames(classes.SmallNavbar_login_form_button)}>
                    <button onClick={() => setShowPopup(true)}>Connect with an export</button>
                </div> */}
                        <div className={classNames(classes.SmallNavbar_login_form_button)}>
                            <button onClick={handleSubmit}>Connect with an export</button>
                        </div>
                    </div>
                )}
                {isFormSubmitted && (
                    <div className={classNames(classes.successMessage)}>
                        <div className={classNames(classes.successMessage_text)}>
                            <span>Your form has been filled <span className={classNames(classes.successMessage_sp)}>successfully!</span></span>
                        </div>
                        <div className={classNames(classes.successMessage_logo)}>
                            <img src="/images/icons/verified.gif" alt="" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Honey;
import React, { useState } from "react";
import MainWrapper from "../../components/wrapper/wrapper";
import ContentContainer from "../../components/content-container/content-container";
import classes from "../contact-us/index.module.less";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setphone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <MainWrapper headerAbsolute headerFixed={false} smallHeader>
      <ContentContainer>
        <div className={classes.contact_form}>
          <div className={classes.main_parent}>
            <div className={classes.right}>
              <div style={{ color: "#111", fontSize: "24px" }}>Contact Us</div>
              <div className={classes.right_red_text}>
                we’re here to help you plan your perfect adventure in Kashmir.
                Whether you have questions, need assistance with your booking,
                or want personalized travel advice, our dedicated team is ready
                to assist you. Reach out to us through any of the following
                methods:
              </div>
              <div className={classes.right_text}>
                <div className={classes.right_text_email}>
                  <div><strong>Email:{" "}</strong>support@kashmirstays.com</div>
                </div>
                <div className={classes.right_text_address}>
                  <div><strong>Address:{" "}</strong>Top Floor, Al Burj Complex, New Colony Pulwama, Kashmir, 192301</div>
                </div>
                <div className={classes.right_text_phone}>
                  <div><strong>Phone:{" "}</strong>7006052604</div>
                </div>
                <div className={classes.right_text_dec}>
                Feel free to contact us at any time. We look forward to helping you create unforgettable memories in the breathtaking landscapes of Kashmir!
                </div>
              </div>
            </div>
            <div className={classes.left}>
              <form className={classes.contact} onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                  type="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

               <div className={classes.submit_button}>
               <button type="submit">Send Message</button>
               </div>

                {formSubmitted && <p>Thank you for your message!</p>}
              </form>
            </div>
          </div>
        </div>
      </ContentContainer>
    </MainWrapper>
  );
};

export default ContactForm;

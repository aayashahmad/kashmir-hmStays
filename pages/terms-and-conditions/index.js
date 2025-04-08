import React from "react";
import MainWrapper from "../../components/wrapper/wrapper";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import classes from "../terms-and-conditions/index.module.less";
import ContentContainer from "../../components/content-container/content-container";
import ImageWithFallback from "../../components/image-with-fallback";

const TermsAndConditions = () => {
  const { t } = useTranslation("common");

  return (
    <MainWrapper
      t={t}
      headerAbsolute={true}
      headerFixed={false}
      smallHeader={true}
    >
      <div className={classNames(classes.terms_and_conditions_hero_img)}>
        <ImageWithFallback
          className="background_img"
          src="/images/hero-a.jpg"
          alt="hero"
          width={1600}
          height={800}
        />
        <div className={classNames(classes.terms_and_conditions_overlay)}>
          <div
            className={classNames(classes.terms_and_conditions_overlay_small)}
          >
            <span>TERMS AND CONDITIONS</span>
          </div>
          <div className={classNames(classes.terms_and_conditions_overlay_big)}>
            <span>
              Welcome to
              <br /> KashmirHomeStays
            </span>
          </div>
        </div>
      </div>
      <ContentContainer>
        <div className={classNames(classes.terms_and_conditions_wrapper)}>
          <span
            className="terms"
          >
            Terms and Conditions
          </span>

          <p style={{ marginTop: "10px" }}>Welcome to KashmirHomeStays!</p>

          <p>
            These terms and conditions outline the rules and regulations for the
            use of KashmirHomeStays Website, located at kashmirstays.com.
          </p>

          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use KashmirHomeStays if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>

          <p>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            "Client", "You" and "Your" refers to you, the person log on this
            website and compliant to the Company's terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves. All terms refer to the offer, acceptance and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Client's needs in respect of
            provision of the Company's stated services, in accordance with and
            subject to, prevailing law of in. Any use of the above terminology
            or other words in the singular, plural, capitalization and/or he/she
            or they, are taken as interchangeable and therefore as referring to
            same.
          </p>

          <span className={classNames(classes.terms_and_conditions_headings)}>
            <strong className="terms" >Cookies</strong>
          </span>

          <p>
            We employ the use of cookies. By accessing KashmirHomeStays, you
            agreed to use cookies in agreement with the KashmirHomeStays's
            Privacy Policy.{" "}
          </p>

          <p>
            Most interactive websites use cookies to let us retrieve the user's
            details for each visit. Cookies are used by our website to enable
            the functionality of certain areas to make it easier for people
            visiting our website. Some of our affiliate/advertising partners may
            also use cookies.
          </p>

          <span className={classNames(classes.terms_and_conditions_headings)}>
            <strong className="terms">License</strong>
          </span>

          <p>
            Unless otherwise stated, KashmirHomeStays and/or its licensors own
            the intellectual property rights for all material on Kashmir
           HomeStays. All intellectual property rights are reserved. You may
            access this from KashmirHomeStays for your own personal use subjected
            to restrictions set in these terms and conditions.
          </p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from KashmirHomeStays</li>
            <li>Sell, rent or sub-license material from KashmirHomeStays</li>
            <li>Reproduce, duplicate or copy material from KashmirHomeStays</li>
            <li>Redistribute content from KashmirHomeStays</li>
          </ul>

          <p>
            This Agreement shall begin on the date hereof. Our Terms and
            Conditions were created with the help of the{" "}
            <a href="https://www.termsandconditionsgenerator.com/">
              Free Terms and Conditions Generator
            </a>
            .
          </p>

          <p>
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            KashmirHomeStays does not filter, edit, publish or review Comments
            prior to their presence on the website. Comments do not reflect the
            views and opinions of KashmirHomeStays,its agents and/or affiliates.
            Comments reflect the views and opinions of the person who post their
            views and opinions. To the extent permitted by applicable laws,
            KashmirHomeStays shall not be liable for the Comments or for any
            liability, damages or expenses caused and/or suffered as a result of
            any use of and/or posting of and/or appearance of the Comments on
            this website.
          </p>

          <p>
            KashmirHomeStays reserves the right to monitor all Comments and to
            remove any Comments which can be considered inappropriate, offensive
            or causes breach of these Terms and Conditions.
          </p>

          <p>You warrant and represent that:</p>

          <ul>
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
          </ul>

          <p>
            You hereby grant KashmirHomeStays a non-exclusive license to use,
            reproduce, edit and authorize others to use, reproduce and edit any
            of your Comments in any and all forms, formats or media.
          </p>

          <h3>
            <strong className="terms">Content Liability</strong>
          </h3>

          <p>
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </p>

          <span className={classNames(classes.terms_and_conditions_headings)}>
            <strong className="terms">Reservation of Rights</strong>
          </span>

          <p>
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amen these terms and conditions and it's linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </p>

          <span className={classNames(classes.terms_and_conditions_headings)}>
            <strong className="terms">Removal of links from our website</strong>
          </span>

          <p>
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us any moment. We will
            consider requests to remove links but we are not obligated to or so
            or to respond to you directly.
          </p>

          <p>
            We do not ensure that the information on this website is correct, we
            do not warrant its completeness or accuracy; nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </p>
        </div>
      </ContentContainer>
    </MainWrapper>
  );
};
export default TermsAndConditions;

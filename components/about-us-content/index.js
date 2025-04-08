// import useState  from "react";
import React from "react";
import { useState } from "react";
import classes from "./index.module.less";

const AboutUSContent = () => {
  const [ArrayOne, setArrayOne] = useState([
    {
      id: 1,
      title: "About Us",
      dec1: [
        {
          decitem:
            "Welcome to Kashmir Homestays, your premier destination for top-notch Kashmir travel services and premium Kashmir tours in the enchanting region of Kashmir. Specializing in Kashmir travel packages, we pride ourselves on delivering 100 percent customer satisfaction through our exceptional services, local expertise, and dedicated local staff.",
        },
        {
          decitem:
            "At Kashmir Homestays, we are rooted in Kashmir, focused on Kashmir, and dedicated to all things in Kashmir., ensuring that every aspect of your journey is meticulously curated by our team to provide a seamless and world-class Kashmir holiday experience. We cater exclusively to our guests without relying on third-party services, allowing us to take care of every detail for a hassle-free tour.",
        },
        {
          decitem:
            "Whether you're looking to explore the picturesque landscapes, delve into the rich cultural heritage, or simply relax in serene surroundings, our expertly crafted Kashmir travel packages are designed to exceed your expectations. Discover the true essence of Kashmir with Kashmir Homestays, where your unforgettable journey begins.",
        },
      ],
    },
    {
      id: 2,
      title: "Our Promise",
      dec: "We guarantee you the best ever experience in the heaven that is Kashmir. Our commitment to excellence ensures that every aspect of your trip is meticulously planned and executed to provide unparalleled comfort, adventure, and cultural enrichment. From the moment you arrive to the time you depart, our team is dedicated to crafting an unforgettable journey that exceeds your expectations and leaves you yearning for more. Experience the magic of Kashmir with us, and discover why it truly is heaven on earth.",
    },
    {
      id: 3,
      title: "Satisfaction Guarantee",
      dec: "Your satisfaction is our highest priority. If, for any reason, you are not completely satisfied with our services during your Kashmir adventure, we will pay you back. We stand by our promise to provide an amazing and memorable experience, and we are confident that our dedication to quality will leave you thoroughly pleased. However, should we fall short of your expectations, rest assured that we will honour our commitment by offering a refund. Your happiness and comfort are paramount to us, and we strive to ensure that every moment of your journey is perfect.",
    },
    {
      id: 4,
      title: "Safety and Security",
      dec: "At Kashmir Homestays Travel Company, your safety and security are our utmost priorities. We are committed to providing a secure travel experience, ensuring that you can explore the beauty of Kashmir with peace of mind. Our team maintains rigorous safety protocols, collaborating closely with local authorities and experts to stay informed about the latest travel advisories and conditions. We carefully select accommodations, transport services, and guided tours that adhere to the highest safety standards. Additionally, our 24/7 support ensures that you have immediate assistance whenever you need it. Trust in our dedication to your well-being, and enjoy a worry-free journey through the enchanting landscapes of Kashmir.",
    },
    {
      id: 5,
      title: "Our Roots",
      dec: "We are Kashmir-based, Kashmir-dedicated, and Kashmir-oriented. This deep-rooted connection with the region allows us to offer an authentic experience that goes beyond typical tourism. Our team, composed of local experts, possesses an intimate understanding of Kashmir's hidden gems, rich history, and vibrant culture. This local expertise ensures that every tour is crafted with a genuine love and respect for the land, showcasing the true essence of Kashmir to our travelers. Trust in our local insights to guide you through an unparalleled journey in this breathtaking paradise.",
    },
    {
      id: 6,
      title: "Personalized Guidance",
      dec: "We pride ourselves on providing personalized guidance to every traveler. From the moment you start planning your trip with us to the final farewell, we will guide you at every moment of your journey. Our dedicated team is always at your service, offering expert advice, insider tips, and seamless support to ensure a smooth and enjoyable travel experience. With our comprehensive assistance, you can focus on making beautiful memories while we handle the logistics. Explore Kashmir with confidence, knowing that you have a knowledgeable and caring team by your side.",
    },
    {
      id: 7,
      title: "Sustainable Travel",
      dec: "At Kashmir Homestays Travel Company, we are deeply committed to sustainable and responsible tourism. Our tours are designed to have a positive impact on local communities and the environment. Here are some of the ways we promote sustainable travel:",
      numberItem: [
        {
          id: 1,
          nuTitle: " Supporting Local Communities",
          nuDec:
            "By collaborating with local businesses, artisans, and guides, we ensure that tourism benefits the people of Kashmir. We prioritize local accommodations, eateries, and craftspeople, providing our travelers with authentic experiences while boosting the local economy.",
        },
        {
          id: 2,
          nuTitle: "Environmental Conservation",
          nuDec:
            "We strive to minimise our ecological footprint through eco-friendly practices. Our tours follow strict guidelines for waste disposal, and we advocate for the reduction of plastic usage. We also support conservation projects that protect the diverse flora and fauna of Kashmir.",
        },
        {
          id: 3,
          nuTitle: "Cultural Preservation",
          nuDec: [
            {
              part: "Preserving the rich cultural heritage of Kashmir is at the core of our mission. Our guided tours emphasize respect for local customs and traditions, providing travelers with deep cultural insights while helping to maintain these practices for future generations.",
            },
            {
              part: "Join us in our commitment to sustainable tourism and enjoy a travel experience that is not only enriching for you but also beneficial for the beautiful region of Kashmir.",
            },
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Dedication of Our Team",
      dec: "At Kashmir Homestays Travel Company, our team's dedication goes beyond just providing service; we consider each guest as part of our extended family. From the moment you begin planning your journey with us, our team is committed to offering personalized support and genuine care. We strive to nurture a warm and welcoming environment, ensuring that every need is met and every concern is addressed. Our goal is to make you feel at home, no matter how far you travel. With heartfelt hospitality and meticulous attention to detail, we aim to create memorable experiences that resonate with you long after your trip has ended.",
    },
    {
      id: 9,
      title: "Understanding the Pain Points",
      dec: "Traveling to destinations as unique and diverse as Kashmir can present a variety of challenges. At Kashmir Homestays Travel Company, we have identified and addressed the most common pain points faced by travelers to ensure you have a seamless and enjoyable experience: By addressing the common pain points and delivering tailored, high-quality experiences, Kashmir Homestays Travel Company ensures that your journey through this enchanting region is nothing short of extraordinary",
    },
    {
      id: 10,
      title: "Our Commitment",
      dec1: [
        {
          decitem:
            "At Kashmir Homestays, our commitment is to provide unparalleled travel experiences that showcase the breathtaking beauty and rich cultural heritage of Kashmir. We are dedicated to delivering top-tier Kashmir travel services, ensuring that your journey is not only memorable but also seamless and stress-free.",
        },
        {
          decitem:
            "Our team of local experts works tirelessly to craft meticulously curated itineraries that cater to your unique preferences and interests. With our deep-rooted knowledge and passion for the region, we guarantee an authentic and immersive experience that goes beyond the ordinary.",
        },
        {
          decitem:
            "We prioritize 100 percent customer satisfaction, striving to exceed your expectations at every step. Our dedicated local staff is always on hand to provide personalized assistance, ensuring that every detail of your trip is flawlessly executed. Unlike many providers, we do not rely on third-party services, which allows us to maintain the highest standards of quality and control.",
        },
        {
          decitem:
            "We understand the importance of preserving the natural beauty and cultural integrity of Kashmir, and we are committed to promoting sustainable tourism practices. Our aim is to offer you a world-class Kashmir holiday while also contributing positively to the local community and environment.",
        },
        {
          decitem:
            "Whether you dream of exploring the picturesque landscapes of Kashmir, delving into its rich cultural tapestry, or finding peace in its serene surroundings, Kashmir Homestays is here to make those dreams a reality. Our expertly crafted Kashmir travel packages are designed to provide you with an unforgettable journey that captures the true essence of this enchanting region.",
        },
        {
          decitem:
            "Trust Kashmir Homestays for an extraordinary travel experience that combines premium Kashmir tours, exceptional service, and a heartfelt commitment to your satisfaction. Let us be your guide to the wonders of Kashmir, where your unforgettable journey begins",
        },
      ],
    },
    {
      id: 11,
      title: "Our Mission",
      title1:
        "Shaping the Future of Travel! Changing the Way People Travel to Kashmir",
      dec1: [
        {
          decitem:
            "At Kashmir Homestays, we are on an ambitious journey to redefine the travel experience in Kashmir. Our goal goes beyond merely reaching destinations—we strive to ignite passion, create lasting memories, and lead the way in crafting adventures that resonate deeply with every explorer. Join us on this remarkable journey, where the spirit of adventure is woven into every expedition!",
        },
        {
          decitem:
            "Our mission goes beyond providing top notch services, we are bound to offer unrivalled travel experiences that capture the heart and soul of Kashmir. We aim to be the leading Kashmir-based travel company by providing top-tier customer service and meticulously curated Kashmir travel packages that cater to the individual needs of each traveller. Through our unwavering commitment to excellence, we strive to ensure that each guest enjoys a world-class Kashmir holiday filled with memorable experiences and unparalleled comfort.",
        },
        {
          decitem:
            "We believe in showcasing the true essence of this beautiful region by leveraging our local expertise and fostering genuine connections with the local communities. Our purpose extends beyond just travel; it is about creating lasting impressions and enriching the lives of our guests through immersive cultural experiences, personalized excursions, and sustainable travel practices. ",
        },
        {
          decitem:
            "By adhering to the highest standards and focusing on continual improvement, we endeavour to set a benchmark in the premium Kashmir tours industry. We are dedicated to making every journey not just a trip, but a cherished memory. ",
        },
      ],
    },
    {
      id: 12,
      title: "Our Promise",
      dec1: [
        {
          decitem:
            "At Kashmir Homestays, our promise is to provide an experience that is nothing short of extraordinary. We are committed to curating premium Kashmir tours that reflect the true essence of this breathtaking region. Our Kashmir travel packages are designed with meticulous attention to detail, ensuring that every moment of your journey is seamless and memorable. ",
        },
        {
          decitem:
            "We promise 100 percent customer satisfaction through our top-notch Kashmir travel services and unparalleled local expertise. Our team is dedicated to crafting personalized travel experiences that cater to your individual preferences, allowing you to explore the picturesque landscapes and rich cultural heritage of Kashmir in an unforgettable way. ",
        },
        {
          decitem:
            "By choosing Kashmir Homestays, you are not just booking a trip, but embarking on a world-class Kashmir holiday that promises comfort, adventure, and genuine local connections. We also place a strong emphasis on sustainability and responsible tourism, ensuring that your journey has a positive impact on the local communities and environment.",
        },
        {
          decitem:
            "Our commitment to excellence drives us to continually innovate and improve our offerings, setting a new benchmark in the Kashmir holiday industry. From the moment you book with us to the conclusion of your tour, we guarantee a hassle-free, enriching, and truly remarkable travel experience. ",
        },
      ],
      numberItem: [
        {
          nuTitle: "At Kashmir Homestays Travel Company, we promise to offer,",
          nuDec: [
            {
              part: "<strong>•	Expert Guidance:</strong> Our team of experienced and knowledgeable local guides will accompany you on your trip, providing insider tips and information to enhance your experience. They are also available to answer any questions or concerns you may have along the way.",
            },
            {
              part: "<strong>•	Exceptional Service:</strong> We believe that every guest deserves exceptional service, and that's exactly what we deliver. From the moment you contact us until your return home, our team will be dedicated to ensuring your trip is seamless, comfortable, and stress-free.",
            },
            {
              part: "<strong>•	Expert Knowledge:</strong> Our team has extensive knowledge and experience in the region, and we are always eager to share our expertise with you. From insider tips to hidden gems, we will provide you with all the information you need for an enriching and authentic experience.",
            },
            {
              part: "<strong>•	Responsible Tourism Practices:</strong> we prioritize responsible tourism in all our operations. We are committed to preserving the natural environment, supporting local communities, and promoting sustainable travel practices.",
            },
            {
              part: "<strong>•	Seamless Travel:</strong> From booking your flights and accommodations to arranging transportation and activities, we take care of all the details, so you can relax and enjoy your trip without any hassle.",
            },
            {
              part: "<strong>•	Local Expertise:</strong> Our guides are locals who possess in-depth knowledge of the region's culture, history, and hidden gems, allowing you to experience Kashmir through the eyes of those who know it best.",
            },
            {
              part: "<strong>• Safety and Comfort: </strong>Your safety and comfort are our top priorities. We carefully select accommodations, transport, and activities to ensure they meet our stringent quality standards.",
            },
            {
              part: "<strong>•	Memorable Experiences:</strong> Our goal is to create a journey that not only meets but exceeds your expectations, leaving you with cherished memories and a deeper appreciation for the beauty and culture of Kashmir. Thank you for considering Kashmir Homestays Travel Company. We look forward to helping you plan your dream trip to this enchanting destination. So why wait? Book now and get ready for an unforgettable journey with us! With our expert guidance, exceptional service, and commitment to responsible travel, we guarantee that your experience in Kashmir will be truly unique and unforgettable.",
            },
            {
              part: "<strong>•	Agent on Call:</strong> To ensure your well-being throughout your journey, we offer a doctor-on-call service. Should any medical concerns arise, professional help will be readily available to assist you, providing peace of mind so you can fully enjoy your trip. ",
            },
            {
              part: "<strong>•	Personalized Itineraries:</strong> We understand that every traveler is unique, which is why we offer personalized itineraries tailored to your interests and preferences. Our team will work with you to create a trip that perfectly fits your needs, ensuring a one-of-a-kind experience.",
            },
            {
              part: "<strong>•	Supporting Local Communities:</strong> By choosing Kashmir Homestays Travel Company, you are also contributing to the growth and development of local communities in Kashmir. We collaborate with local businesses and organizations to support their livelihoods and empower them through sustainable tourism practices.",
            },
            {
              part: "<strong>•	Environmental Conservation:</strong> We believe in preserving our natural environment for generations to come. That's why we take steps to reduce our carbon footprint and promote eco-friendly practices during our trips. At Kashmir Homestays Travel Company, we are dedicated to making your journey as comfortable and enjoyable as possible. To that end, we offer an array of assistance services to cater to your needs:",
            },
            {
              part: "<strong>•	24/7 Customer Support: </strong>Our customer support team is available around the clock to help you with any questions or issues that may arise during your trip. Whether you need help with itinerary changes, travel recommendations, or emergency assistance, we are here for you.",
            },
            {
              part: "<strong>•	Language Assistance:</strong> Understanding the local language can sometimes be a challenge. Our multilingual guides and support staff are on hand to help you with translations and ensure smooth communication during your travels.",
            },
            {
              part: "<strong>•	Special Requests:</strong> Whether you have dietary restrictions, mobility issues, or specific interests, we are happy to accommodate any special requests to ensure your experience is tailored to your needs.",
            },
          ],
        },
      ],
    },
    {
      id: 13,
      title: "Our Vision",
      dec1: [
        {
          decitem:
            "At Kashmir Homestays, our vision is to be the foremost Kashmir-based travel company, renowned for delivering premium Kashmir tours that transcend the ordinary and redefine luxury travel. We aspire to set new standards in the Kashmir holiday industry through our unyielding commitment to customer satisfaction, exceptional service quality, and unparalleled local expertise. ",
        },
        {
          decitem:
            "We envision a future where every travel enthusiast can experience the true essence of Kashmir's picturesque landscapes and rich cultural heritage through our bespoke Kashmir travel packages. Our goal is to create meaningful connections between our guests and the region, fostering a deeper appreciation and understanding of its beauty and traditions. ",
        },
        {
          decitem:
            "By embracing sustainable tourism practices, we aim to contribute positively to the local communities and environment, ensuring that Kashmir remains a pristine haven for generations to come. At Kashmir Homestays, we are dedicated to turning travel dreams into unforgettable realities and continue to innovate and evolve, setting new benchmarks for excellence in the world-class Kashmir holiday experience.",
        },
      ],
    },
  ]);

  return (
    <div className={classes.about_content}>
      {ArrayOne.map((item) => (
        <div key={item.id} className={classes.about_content_inner}>
          <div className={classes.about_content_inner_title}>{item.title}</div>
          <div className={classes.about_content_inner_dec}>{item.dec}</div>
          {item.dec1 &&
            item.dec1.map((dec, index) => (
              <div key={index} className={classes.inner_dec}>
                {dec.decitem && (
                  <div className={classes.inner_dec_1}>{dec.decitem}</div>
                )}
              </div>
            ))}
          {item.numberItem &&
            item.numberItem.map((numItem) => (
              <div
                key={numItem.id}
                className={classes.about_content_inner_numberitem}
              >
                <div className={classes.about_content_inner_numberitem_parent}>
                  <div className={classes.inner_numberitem_num}>
                    {Number(numItem.id) ? Number(numItem.id) : ""}
                  </div>
                  <div className={classes.inner_numberitem_title}></div>
                  {numItem.nuTitle}
                </div>
                {typeof numItem.nuDec === "string" ? (
                  <div className={classes.inner_numberitem_dec}>
                    {numItem.nuDec}
                  </div>
                ) : (
                  <div className={classes.inner_numberitem_dec_part}>
                    {numItem.nuDec.map((part, index) => (
                      <div
                        key={index}
                        className={classes.inner_numberitem_dec_part_one}
                        dangerouslySetInnerHTML={{ __html: part.part }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default AboutUSContent;

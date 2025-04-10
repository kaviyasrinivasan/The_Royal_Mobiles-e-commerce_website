import React from 'react';
import './Contact.css';
import facebook from './facebook.png';

const Contact = () => {
  return React.createElement(
    "section",
    { id: "contactPage" },
    React.createElement(
      "div",
      { id: "contact" },
      React.createElement(
        "div",
        { className: "contact-content" },
        React.createElement(
          "div",
          { className: "contact-left" },
          React.createElement("h1", { className: "contactPageTitle" }, "Contact Us"),
          React.createElement("span", { className: "contactDesc" }, "You can reach us at:"),
          React.createElement(
            "div",
            { className: "contactDetails" },
            React.createElement("p", { className: "contactAddress" }, "707, VS Complex, Dharapuram Road,"),
            React.createElement("p", { className: "contactAddress" }, "Tiruppur, Tamil Nadu - 641608"),
            React.createElement("p", { className: "contactPhone" }, "Mobile: +91 90954 91616")
          ),
          React.createElement(
            "div",
            { className: "contactLinks" },
            React.createElement(
              "div",
              { className: "links" },
              React.createElement(
                "a",
                {
                  href: "https://www.facebook.com/TheRoyalMobilestore",
                  target: "_blank",
                  rel: "noopener noreferrer"
                },
                React.createElement("img", {
                  src: facebook,
                  alt: "Facebook",
                  className: "link"
                })
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "contact-right" },
          React.createElement("iframe", {
            title: "Location Map",
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.211163594637!2d77.35324547473287!3d11.09937609208564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba906a95a34b2f1%3A0x7c4423e5c2dd7c2b!2s707%2C%20VS%20Complex%2C%20Dharapuram%20Rd%2C%20Tiruppur%2C%20Tamil%20Nadu%20641608!5e0!3m2!1sen!2sin!4v1712747341271!5m2!1sen!2sin",
            width: "100%",
            height: "250",
            style: { border: 0, borderRadius: "10px" },
            allowFullScreen: "",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
          })
        )
      )
    )
  );
};

export default Contact;

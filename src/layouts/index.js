import React from "react";
import Link from "gatsby-link";

export const TemplateWrapper = ({ children }) => (
  <body className="theme-base-13 sidebar-overlay">
    <div className="wrap">
      <div className="masthead">
        <div className="masthead-container">
          <h1 className="masthead-title">
            <Link title="Home" to="/">
              {"Deb's"}
            </Link>
            {" "}
            <small>{"Doodles"}</small>
          </h1>
          <div className="masthead-nav">
            <h2 className="masthead-title">
              <Link to="/about">{"About"}</Link>
            </h2>
          </div>
        </div>
      </div>
      <div className="container content">
        {children}
      </div>
    </div>    
  </body>
);

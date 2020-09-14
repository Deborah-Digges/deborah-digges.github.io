import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";

import { TemplateWrapper } from "../layouts/index";

export default function Home({
  data, 
}) {
  const blogList = data.allMarkdownRemark.edges.map(edge => (
  <div class="post">
    <h2 class="post-title">
        <Link to={edge.node.fields.slug}>
          {edge.node.frontmatter.title}
        </Link>
    </h2>
    <span class="post-date">{edge.node.fields.date}</span>
  </div>));

  return (<TemplateWrapper>
    <div class="posts">
      {blogList}
    </div>
  </TemplateWrapper>);
};

export const query = graphql`
query IndexQuery {
  allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }, filter: { fileAbsolutePath: { regex: "/[0-9]{4}-[0-9]{2}-[0-9]{2}-.*/" } } ) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        fields {
          slug
          date
        }
      }
    }
  }
}
`;
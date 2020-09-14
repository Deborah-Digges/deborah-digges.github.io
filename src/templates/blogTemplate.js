import React from "react";
import { graphql } from "gatsby";
import { TemplateWrapper } from "../layouts/index";


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, fields, html } = markdownRemark
  return (
    <TemplateWrapper>
      <div class="post">
        <h1 class="post-title">{frontmatter.title}</h1>
        <span class="post-date">{fields.date}</span>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </TemplateWrapper>
  )
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        date
        slug
      }
    }
  }
`;
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import SearchForm from "../components/BlogSearchForm/BlogSearchForm";
import SearchResults from "../components/SearchResult/SearchResult";
import config from "../../data/SiteConfig";
import blogList from "../generated/blog-result.json";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Badge, Row, Col } from "reactstrap";

export default (
  { data, pageContext: { blogCurrentPage, postsNumPages } },
  props
) => {
  const postEdges = data.allMarkdownRemark.edges;
  const DATA = blogList;

  console.log(blogList)

  const prefix = "/blog/";
  const isFirst = blogCurrentPage === 1;
  const isLast = blogCurrentPage === postsNumPages;
  const prevPage =
    blogCurrentPage - 1 === 1 ? "" : (blogCurrentPage - 1).toString();
  const nextPage = (blogCurrentPage + 1).toString();

  const [isShown, setIsShown] = useState(false);

  const [results, setResults] = useState([]);
  
  
  

  // eslint-disable-next-line react/destructuring-assignment
  let srcLocation = props.location;
  if (typeof window !== `undefined`) {
    // eslint-disable-next-line no-restricted-globals
    srcLocation = location.search;
  }


  const searchQuery = new URLSearchParams(srcLocation).get("keywords") || "";
  var Tag = new URLSearchParams(srcLocation).get("tag") || "";
  var Author = new URLSearchParams(srcLocation).get("author") || "";
  
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }



  useEffect(() => {
    if (searchQuery || Tag) {
      setResults(
        DATA.filter((blog) => {
          const searchRgx = new RegExp(escapeRegExp(searchQuery), "gi");
          const tagRgx = new RegExp(escapeRegExp(Tag), "gi");
          const authorRgx = new RegExp(escapeRegExp(Author), "gi");
          return  blog.title.match(searchRgx) && blog.tags.match(tagRgx) || blog.author.match(authorRgx);
        })
      );
      setIsShown(true);
    } else {
      setResults([]);
      setIsShown(false);
    }
  }, [srcLocation]);

  return (
    <Layout>
      <div className="index-container">
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <SEO />
        <SearchForm query={searchQuery} filter={Tag} />
        {isShown && (
          <SearchResults
            id="src"
            query={searchQuery}
            tag={Tag}
            author={Author}
            results={results}
          />
        )}
        {!isShown && <PostListing id="blog" postEdges={postEdges} />}
      </div>
      <Row>
        {!isFirst && (
          <Col className="text-center m-4">
            <Link
              to={`${prefix}${prevPage}`}
              rel="prev"
              className="btn-primary"
            >
              <FiArrowLeft /> Previous Page
            </Link>
          </Col>
        )}
        {!isLast && (
          <Col className="text-center m-4">
            <Link
              to={`${prefix}${nextPage}`}
              rel="next"
              className="btn-primary"
            >
              Next Page <FiArrowRight />
            </Link>
          </Col>
        )}
      </Row>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const blogQuery = graphql`
  query blogQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { posttype: { eq: "blog" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(format: PLAIN, pruneLength: 120, truncate: true)
          timeToRead
          frontmatter {
            author
            date
            title
            tags
            description
            cover {
              publicURL
              childImageSharp {
                sizes(maxWidth: 768, maxHeight: 432) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;

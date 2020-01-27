import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import BookItem from "../components/BookItem"

const LinkButton = styled.div`
  text-align: right;
  margin-bottom: 8px;

  a {
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: indigo;
    }
  }
`

export default function(props) {
  return (
    <section>
      {props.data.allBook.edges.map(edge => (
        <BookItem
          key={edge.node.id}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
        >
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
      ))}
    </section>
  )
}

export const query = graphql`
  {
    allBook {
      edges {
        node {
          summary
          title
          localImage {
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
`

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import moment from "moment"
import { Input, Button } from "./index"

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;

  ${Input} {
    margin-right: 14px;
    margin-top: auto;
    margin-bottom: auto;
  }

  ${Button} {
    margin: auto 0;
  }
`

const CommentListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 8px 0 14px;

  > strong {
    font-size: 80%;
    color: #666;
  }
`

export function BookComments({ firebase, bookId }) {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(
    function() {
      const unsubscribe = firebase.subscribeToBookComments({
        bookId,
        callback: snapshot => {
          const snapshotComments = []
          snapshot.forEach(doc => {
            snapshotComments.push({
              id: doc.id,
              ...doc.data(),
            })
          })

          setComments(snapshotComments)
        },
      })

      return function() {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    },
    [bookId, firebase]
  )

  function handleInputChange(event) {
    event.persist()
    setCommentText(event.target.value)
  }

  function handlePostCommentSubmit(event) {
    event.preventDefault()
    firebase.postComment({
      text: commentText,
      bookId,
    })
    setCommentText("")
  }

  return (
    <div>
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input type="text" value={commentText} onChange={handleInputChange} />
        <Button type="submit">Post comment</Button>
      </CommentForm>

      {comments.map(function(comment) {
        return (
          <CommentListItem key={comment.id}>
            <strong>
              {comment.username} -{" "}
              {moment(comment.dateCreated.toDate()).format("HH:mm Do MMM YYYY")}
            </strong>
            <div>{comment.text}</div>
          </CommentListItem>
        )
      })}
    </div>
  )
}

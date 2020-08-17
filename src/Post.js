import React, { useState, useEffect } from "react";
import firebase from 'firebase'
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
import { db } from "./firebase";

const Post = ({ username, userImage, caption, imageUrl, postId, user }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(()=>{
    let unsubscribe
    if(postId){
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setComments(snapshot.docs.map((doc) => doc.data()))
      );
    }
    return () => {
      // clean up function
      unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();
    db
      .collection("posts")
      .doc(postId)
      .collection('comments')
      .add({
        text: comment,
        username: user.displayName,
        timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
      })
      setComment('')
  }
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src={userImage} />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="user" />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="posts__comments">
        {comments.map(comment=>(
          <p>
            <b>{comment.username}</b> {comment.text}
            </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
          type="text"
          className="post__input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
          />
          <button 
          disabled={!comment} 
          type="submit" 
          className="post__button"
          onClick={postComment}
          >Post</button>
        </form>
      )}
    </div>
  );
};

export default Post;

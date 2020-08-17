import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

const Post = ({ username, userImage, caption, imageUrl }) => {
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
    </div>
  );
};

export default Post;

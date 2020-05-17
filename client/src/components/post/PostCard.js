import React, { useEffect } from "react";
import { history } from "../../redux/history";

const PostCard = (props) => {
  useEffect(() => {}, []);
  //to={"/post/" + props.post._id}
  return (
    <div
      href="/post/"
      className="postcard"
      onClick={() => {
        history.push(`/post/${props.post._id}`);
      }}
    >
      <div className="img-wrapper">
        <div className="img-inner">
          <img
            src={
              typeof props.post.photos === "undefined" ||
              typeof props.post.photos[0] === "undefined"
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                : props.post.photos[0]
            }
            className="img-inner"
            alt={props.post.title}
          />
        </div>
      </div>
      <div
        style={{
          maxWidth: "inherit",
          height: 48,
          overflowWrap: "break-word",
          textOverflow: "ellipsis",
        }}
      >
        <h5 className="text-info">{props.post.title}</h5>
      </div>
      <p
        style={{
          height: 80,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "pre-wrap",
        }}
        className="text-muted"
      >
        {props.post.description}
      </p>
      <div style={{ height: 77 }}>
        <h6>{props.post.price} €</h6>
        <p>{props.post.category}</p>
      </div>
    </div>
  );
};

export default PostCard;

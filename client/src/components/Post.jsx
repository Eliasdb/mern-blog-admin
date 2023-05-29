import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@mui/material";

const Post = ({ _id, title, summary, createdAt, author, cover }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    console.log("loaded");
    setLoaded(true);
  };
  return (
    <section className="post">
      <div className="image">
        {!loaded && <div className="skeleton" />}
        <Link to={`/post/${_id}`}>
          <img
            src={`${import.meta.env.VITE_UPLOAD_URL}` + cover}
            alt="nice"
            onLoad={onLoad}
          />
        </Link>
      </div>

      <div className="texts">
        <div className="title">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
        </div>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), "MMM d yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </section>
  );
};
export default Post;

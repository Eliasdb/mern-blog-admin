import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, createdAt, author, cover }) => {
  return (
    <section className="post">
      <div className="image">
        <Link to={`/admin/post/${_id}`}>
          <img src={`${import.meta.env.VITE_UPLOAD_URL}/` + cover} alt="nice" />
        </Link>
      </div>
      <div className="texts">
        <div className="title">
          <Link to={`/admin/post/${_id}`}>
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

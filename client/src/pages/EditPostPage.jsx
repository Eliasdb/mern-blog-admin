import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { Navigate, useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <>
      <h2 className="create-title">Edit blog post</h2>
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="summary"
          placeholder="Summary"
          value={summary}
          className="summary-textarea"
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "2rem" }} className="create-post-btn">
          Update post
        </button>
      </form>
    </>
  );
};
export default EditPostPage;

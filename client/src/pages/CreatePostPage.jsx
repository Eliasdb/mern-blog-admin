import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { UserContext } from "../../context/UserContext";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo, setHideCreateBtn } = useContext(UserContext);

  useEffect(() => {
    setHideCreateBtn(true);
  }, []);

  const response = fetch(`${import.meta.env.VITE_API_URL}/profile`, {
    credentials: "include",
  });

  if (response.ok) {
    response.json().then((userInfo) => {
      setUserInfo(userInfo);
    });
  }

  const createNewPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
    console.log(await response.json());
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h2 className="create-title">Create blog post</h2>
      <form onSubmit={createNewPost}>
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
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "2rem" }} className="create-post-btn">
          Create
        </button>
      </form>
    </>
  );
};
export default CreatePostPage;

import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <main className="entries">
      {posts.length > 0 && posts.map((post, id) => <Post {...post} key={id} />)}
    </main>
  );
};
export default IndexPage;

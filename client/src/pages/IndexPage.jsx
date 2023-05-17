import { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { UserContext } from "../../context/UserContext";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const { setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setIsLoggedIn(true);
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

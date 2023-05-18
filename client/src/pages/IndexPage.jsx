import { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { UserContext } from "../../context/UserContext";
import Loading from "../components/Loading";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const { setIsLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(true);
    fetch(`${import.meta.env.VITE_API_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);

  return (
    <main>
      <div>
        <h1 className="overview-title">Overview articles</h1>
      </div>
      {loading && <Loading />}
      <section className="entries">
        {posts.length > 0 &&
          posts.map((post, id) => <Post {...post} key={id} />)}
      </section>
    </main>
  );
};
export default IndexPage;

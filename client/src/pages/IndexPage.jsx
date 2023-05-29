import { Suspense, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../components/Loading";
import PostContainer from "../components/PostContainer";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const { setIsLoggedIn, setHideCreateBtn, loading, setLoading } =
    useContext(UserContext);

  useEffect(() => {
    setIsLoggedIn(true);
    setHideCreateBtn(false);
  }, []);

  return (
    <main>
      <div>
        <h1 className="overview-title">Overview articles</h1>
      </div>
      {/* {loading && <Loading />} */}
      <Suspense fallback={<Loading />}>
        <PostContainer />
      </Suspense>
    </main>
  );
};
export default IndexPage;

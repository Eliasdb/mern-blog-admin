import useGetData from "../suspense/useGetData";
import Post from "./Post";

const PostContainer = () => {
  const data = useGetData(`${import.meta.env.VITE_API_URL}/post`);

  return (
    <section className="entries">
      {data &&
        data.map((post) => {
          return <Post {...post} key={post.id} />;
        })}
    </section>
  );
};
export default PostContainer;

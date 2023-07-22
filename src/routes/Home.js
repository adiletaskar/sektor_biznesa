import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Navigation from "../components/Navigation/Navigation";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import { getPosts, searchPosts } from "../store/features/postSlice";
function Home() {
  let { page } = useParams();
  const { loading, text } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(searchPosts(text));
  }, [text, dispatch]);

  if (loading) return <Loading />;
  return (
    <main>
      <Search />
      <Table />
      <Navigation />
    </main>
  );
}

export default Home;

import { BooksContainer } from "../components";
import useCollection from "../hooks/useCollection";
function Home() {
  let { data } = useCollection();

  return (
    <>
      <BooksContainer data={data} />
    </>
  );
}

export default Home;

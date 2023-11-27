import { randImg } from "@ngneat/falso";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CardGrid from "./components/CardGrid";
import CardImage from "./components/CardImage";
import Heading from "./components/Heading";

type Post = {
  id: number;
  title: string;
};

const App = () => {
  const arr = new Array(6).fill("");

  const [posts, setPosts] = useState<Post[]>([]);

  const changeTitle = async (
    e: FormEvent<HTMLFormElement>,
    postId: number,
    inputTitle: string,
    setPostTitle: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();

    document.querySelector<HTMLDialogElement>(`#modal-${postId}`)?.close();

    await toast.promise(axios.patch(`http://localhost:3000/posts/${postId}`, { title: inputTitle }), {
      loading: "Saving",
      success: "Title changed successfully",
      error: "Something went wrog! Try again later.",
    });

    setPostTitle(inputTitle);
  };

  const deletePost = async (e: FormEvent<HTMLButtonElement>, postId: number) => {
    e.preventDefault();

    await toast.promise(axios.delete(`http://localhost:3000/posts/${postId}`), {
      loading: "Deleting",
      success: "Post deleted successfully",
      error: "Something went wrog! Try again later.",
    });

    setPosts(posts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const { data: posts } = await axios.get<Post[]>("http://localhost:3000/posts");
      setPosts(posts);
    };
    getAllPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="container mx-auto flex justify-between items-center mt-2">
          <Heading />
          <button className="btn btn-primary btn-wide">Follow</button>
        </div>

        <CardGrid>
          {posts.length === 0 && arr.map((_, i) => <div key={i} className="skeleton min-w-full aspect-video my-7"></div>)}
          {posts.length > 0 &&
            posts.map(({ id, title }) => (
              <div key={id}>
                <CardImage
                  title={title}
                  imgUrl={`${randImg()}?${Math.random()}`}
                  postId={id}
                  changeTitle={changeTitle}
                  deletePost={deletePost}
                  key={id}
                />
              </div>
            ))}
        </CardGrid>
      </div>

      <Toaster position="top-right" toastOptions={{ className: "bg-base-100 text-base-content" }} />
    </>
  );
};

export default App;

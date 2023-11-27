import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { randImg } from "@ngneat/falso";
import { ChangeEvent, FormEvent, useState } from "react";
import ImageWithFallback from "../utils/ImageWithFallback";

type CardImageProps = {
  title: string;
  postId: number;
  imgUrl?: string;
  deletePost: (e: FormEvent<HTMLButtonElement>, postId: number) => void;
  changeTitle: (
    e: FormEvent<HTMLFormElement>,
    postId: number,
    inputTitle: string,
    setPostTitle: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

const CardImage = ({ title, postId, imgUrl = randImg(), deletePost, changeTitle }: CardImageProps) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [postTitle, setPostTitle] = useState(title);

  return (
    <>
      <dialog id={`modal-${postId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-10">Change Post Title</h3>
          <form
            className="flex flex-col justify-center items-center gap-y-2"
            onSubmit={(e: FormEvent<HTMLFormElement>) => changeTitle(e, postId, inputTitle, setPostTitle)}
          >
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              value={inputTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value)}
            />
            <div className="flex gap-x-2">
              <button type="submit" className="btn btn-outline btn-success px-10">
                <CheckCircleIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="btn btn-outline btn-error px-10"
                onClick={(e: FormEvent<HTMLButtonElement>) => deletePost(e, postId)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="flex flex-col items-center my-2">
        <div
          className="card w-full aspect-video bg-base-300 cursor-pointer hover:scale-105 transition-all overflow-hidden"
          onClick={() => document.querySelector<HTMLDialogElement>(`#modal-${postId}`)?.showModal()}
        >
          <ImageWithFallback url={imgUrl} fallback={<div className="skeleton w-52 h-52"></div>} />
        </div>
        <span className="mt-2 h-12">{postTitle}</span>
      </div>
    </>
  );
};

export default CardImage;

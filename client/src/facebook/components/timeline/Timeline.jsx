import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { Container, FormControl, Input } from "@mui/material";
import { BsFillMegaphoneFill } from "react-icons/bs";
import Story from "./stories/Story";
import Posts from "./posts/Posts";
import { postData, postImage, reset } from "../../../features/posts/postSlice";
import { IoImagesSharp } from "react-icons/io5";

import Skeleton from "react-loading-skeleton";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";

const Timeline = () => {
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { postLoading, postSuccess } = useSelector((state) => state.post);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (postSuccess) {
      setImagePreviews([]);
    }
    dispatch(reset());
  }, [postSuccess]);

  const postCaption = (e) => {
    e.preventDefault();
    const data = {
      user_id: user?._id,
      caption: caption,
    };

    dispatch(postData(data));
    if (!postLoading) {
      setCaption("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files;
    const files = Array.from(file);
    setImagePreviews(files);
  };

  // username:dyxoufsb0
  // preset: xola95pc

  const uploadMultipleImages = async () => {
    const promises = imagePreviews.map(async (img) => {
      try {
        setLoad(true);
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "xola95pc");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const imageData = await res.json();
        setLoad(false);
        return imageData.url;
      } catch (error) {
        console.log(error);
      }
    });

    try {
      const imageURls = await Promise.all(promises);
      return imageURls;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const URLs = await uploadMultipleImages(imagePreviews);

      // Check if URLs is an array and not undefined
      if (Array.isArray(URLs) && URLs.length > 0) {
        // Dispatch postImage action for each URL
        URLs.forEach((img) => {
          const postData = {
            caption,
            image: img,
            user: user?._id,
          };
          dispatch(postImage(postData));
        });
        // Reset caption and image previews after posting
        setCaption("");
        setImagePreviews([]);
        toast.success("Posted Successfully!");
      } else {
        console.error("No URLs found");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <div className="w-3/4  mx-auto relative top-20">
        {load ? (
          <Card className="p-3 my-3">
            <div className="flex gap-3 items-center">
              <Skeleton circle height={50} width={50} />
              <Skeleton height={30} width={350} />
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <Skeleton height={10} width={90} />
              <Skeleton height={10} width={90} />
              <Skeleton height={10} width={90} />
            </div>
            <div className="flex gap-3">
              <Skeleton width={80} height={60} />
              <Skeleton width={80} height={60} />
              <Skeleton width={80} height={60} />
              <Skeleton width={80} height={60} />
            </div>
          </Card>
        ) : (
          <Card variant="outlined" className="px-5    py-4 my-3 shadow">
            <div className="flex items-center gap-4 ">
              <div className="img rounded-full w-[45px] h-[45px]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={
                    user?.image
                      ? user?.image
                      : "https://cdn-icons-png.flaticon.com/512/9655/9655066.png"
                  }
                  alt=""
                />
              </div>

              <FormControl className="w-full d-flex align-items-center">
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  type="text"
                  className="w-full rounded-full outline-none"
                  placeholder={`What's on your mind ${user?.username}?`}
                />
              </FormControl>
            </div>
            <hr className="my-2" />
            <div className="flex gap-5 text-sm  items-center">
              <div className="flex relative cursor-pointer gap-4 items-center">
                <img
                  width="20px"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/88/Orange_ENTER_International_Logo_for_2022.png"
                />
                <input
                  type="file"
                  className="absolute cursor-pointer  opacity-0"
                  multiple
                  onChange={handleImageChange}
                />
                <h4>Photo</h4>
              </div>

              <div className="flex cursor-pointer gap-4 items-center">
                <img
                  width="20px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/2048px-Eo_circle_orange_film-camera.svg.png"
                />
                <h4>Video</h4>
              </div>
            </div>
            {imagePreviews?.length > 0 && (
              <div className="flex">
                {imagePreviews?.map((image, index) => {
                  return (
                    <>
                      <div className="w-[20%]">
                        <div className="card p-2">
                          <img
                            width={"100%"}
                            height={200}
                            src={URL.createObjectURL(image)}
                            alt=""
                          />
                        </div>
                      </div>
                    </>
                  );
                })}

                <IoMdSend
                  onClick={handleClick}
                  className="ms-auto self-end cursor-pointer text-blue-600"
                />
              </div>
            )}
          </Card>
        )}

        <Posts caption={caption} images={images} />
      </div>
    </>
  );
};

export default Timeline;

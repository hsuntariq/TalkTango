import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, FormControl } from "@mui/material";
import { IoIosSend, IoMdSend } from "react-icons/io";
import { CircleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  uploadStoryData,
} from "../../../../features/stories/storySlice";
import { toast } from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StoryModal({ open, setOpen, handleOpen, handleClose }) {
  const { user } = useSelector((state) => state.auth);
  const { stories, storyLoading, storyMessage, storyError, storySuccess } =
    useSelector((state) => state.story);
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const dispatch = useDispatch();
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("video")) {
      setImage(null);
      setIsVideo(true);
      setVideoPreview(url);
      setVideo(file);
    } else {
      setIsVideo(false);
      setVideo(null);
      setImagePreview(url);
      setImage(file);
      setError(true);
    }

    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  useEffect(() => {
    if (caption.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [caption.length]);

  const uploadFile = async () => {
    if (video) {
      setIsVideo(true);
      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "vgvxg0kj");
      try {
        setUploading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djo5zsnlq/video/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const videoUrl = await res.json();
        setUploading(false);
        return videoUrl.url;
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsVideo(false);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "vgvxg0kj");
      try {
        setUploading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const imageUrl = await res.json();
        setUploading(false);
        return imageUrl.url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addData = async () => {
    const url = isVideo ? await uploadFile(video) : await uploadFile(image);
    const data = {
      user: user?._id,
      caption,
      content: url,
    };

    dispatch(uploadStoryData(data));
    toast.success("Story uploaded successfully");
  };

  useEffect(() => {
    if (storyError) {
      toast.error(storyMessage);
    }
    if (storySuccess) {
      handleClose();
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
      setCaption("");
    }
    dispatch(reset());
  }, [storyError, storySuccess]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload a story
          </Typography>

          <FormControl fullWidth>
            <div className="">
              <input
                className="my-2 w-full"
                type="file"
                onChange={handleVideoChange}
              />
              {isVideo ? (
                <>
                  {videoPreview && <video src={videoPreview} controls></video>}
                </>
              ) : (
                <>{imagePreview && <img src={imagePreview}></img>}</>
              )}
              <div className="flex items-center">
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full"
                />
                {uploading || storyLoading ? (
                  <CircleLoader height={15} width={15} />
                ) : (
                  <IoIosSend
                    onClick={addData}
                    size={20}
                    className={`transition-all ${
                      show
                        ? "translate-y-[0px] opacity-100"
                        : "translate-y-[-20px] opacity-0"
                    } `}
                  />
                )}
              </div>
            </div>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

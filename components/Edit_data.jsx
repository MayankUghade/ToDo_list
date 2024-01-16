"use client";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Edit_data({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setShowAlert(true);
      return;
    }

    try {
      const res = await fetch(
        `https://to-do-tan-nine.vercel.app/api/topics/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newTitle, newDescription }),
        }
      );

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Could not add note");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="p-4 flex items-center justify-center ">
      <div className="mt-[70px] flex justify-center gap-3 flex-col w-[800px] p-5">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="p-3 bg-transparent border-2 border-white rounded-lg"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="p-3 bg-transparent border-2 border-white rounded-lg"
          type="text"
          placeholder="Description"
        />

        <div
          onClick={handleSubmit}
          className="px-4 py-3 bg-green-600 rounded-lg w-fit gap-3 flex font-semibold cursor-pointer"
        >
          Update Task
          <SendIcon />
        </div>
      </div>

      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert severity="error" onClose={handleCloseAlert} variant="filled">
            Title and Description are required
          </Alert>
        </div>
      )}
    </div>
  );
}

"use client";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Addnote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setShowAlert(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="p-3 bg-transparent border-2 border-white rounded-lg"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-3 bg-transparent border-2 border-white rounded-lg"
          type="text"
          placeholder="Description"
        />

        <div
          onClick={handleSubmit}
          className="px-4 py-3 bg-green-600 rounded-lg w-fit gap-3 flex font-semibold cursor-pointer"
        >
          Add Task
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

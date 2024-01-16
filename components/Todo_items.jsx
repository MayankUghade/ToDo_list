"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteBtn from "./DeleteBtn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import loader from "@/public/loader.svg";
import Complete from "@/components/Complete";
import Link from "next/link";
import Image from "next/image";

const Todo_items = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://to-do-tan-nine.vercel.app/api/topics",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("Error loading topics: ", error);
        setTopics([]); // Set topics to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Image className="w-20 h-20" src={loader} alt="Loading" />
      </div>
    );
  }

  return (
    <>
      {topics.map((topic, index) => (
        <div
          key={index}
          className={`w-[680px] bg-slate-900 rounded-lg border-2 border-white`}
        >
          <div className="gap-7 p-4 flex flex-col">
            {/* Title and the description */}
            <div>
              <h1 className="font-bold text-2xl overflow-hidden whitespace-nowrap overflow-ellipsis">
                {topic.title}
              </h1>
              <p className="mt-4 overflow-hidden overflow-ellipsis">
                {topic.description}
              </p>
            </div>

            {/* The completed tag and buttons */}
            <div className="flex items-center justify-between">
              <Complete />
              <div className="flex gap-3 items-center">
                {/* Pass the router as a prop to DeleteBtn */}
                <DeleteBtn id={topic._id} />
                <Link href={`/edit_item/${topic._id}`}>
                  <EditNoteIcon className="w-[40px] h-[40px] mt-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo_items;

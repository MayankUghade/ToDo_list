import BookIcon from "@mui/icons-material/Book";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="bg-blue-900 p-5 ">
      <div className="flex justify-between items-center md:ml-[80px] md:mr-[80px]">
        <Link href="/" className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold">TO-DO</h1>
          <BookIcon className="w-9 h-9" />
        </Link>

        <div>
          <Link
            href="/addNote"
            className="bg-gray-200 py-2 px-3 rounded-lg text-black font-semibold flex items-center"
          >
            New Note
          </Link>
        </div>
      </div>
    </div>
  );
}

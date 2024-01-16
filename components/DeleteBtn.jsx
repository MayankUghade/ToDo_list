import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }) {
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      location.reload();
    }
  };

  return (
    <button onClick={removeTopic}>
      <DeleteOutlineOutlinedIcon className="w-[33px] h-[33px] text-red-600" />
    </button>
  );
}

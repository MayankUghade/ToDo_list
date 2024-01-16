import Edit_data from "@/components/Edit_data";

const fetchData = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/topics/${id}?timestamp=${Date.now()}`
    );
    if (!res.ok) {
      throw new Error("Not able to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return null;
  }
};

export default async function Edit_item({ params }) {
  const { id } = params;
  const { topic } = await fetchData(id);
  const { title, description } = topic;
  console.log(topic);
  console.log(title, description);
  return <Edit_data id={id} title={title} description={description} />;
}

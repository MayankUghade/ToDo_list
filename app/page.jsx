import Todo_items from "../components/Todo_items";

export default function Home() {
  return (
    <div className="p-8 flex items-center justify-center flex-wrap gap-4 mt-8">
      <Todo_items />
    </div>
  );
}

import { useParams } from "react-router-dom";

export default function ModuleDetailPage() {
  const { id } = useParams();
  
  return (
    <div className="pt-24 px-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Module Detail {id ? `(ID: ${id})` : ''}</h1>
      <p>Resources, notes, and Start Quiz button will go here.</p>
    </div>
  );
}

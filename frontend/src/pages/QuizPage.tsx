import { useParams } from "react-router-dom";

export default function QuizPage() {
  const { id } = useParams();

  return (
    <div className="pt-24 px-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Quiz for Module {id}</h1>
      <p>MCQ questions will appear here.</p>
    </div>
  );
}

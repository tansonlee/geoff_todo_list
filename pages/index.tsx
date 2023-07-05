import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export type TodoType = {
  _id: string;
  created_at: string;
  description: string;
  due_date: string;
  is_complete: boolean;
  title: string;
};

export default function Home() {
  const handleClear = async () => {
    const response = await fetch(`/api/todos/clear`, {
      method: "DELETE",
    });
    const dataResponse = await response.json();
    console.log(dataResponse);
    fetchData();
  };
  const [data, setData] = useState<TodoType[]>([]);
  const fetchData = async () => {
    const response = await fetch("/api/todos/list", { method: "GET" });
    const todos = await response.json();
    setData(todos.todos);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const boolToInt = (bool: boolean) => {
    if (bool) {
      return 1;
    }
    return 0;
  };
  return (
    <>
      <Navbar />
      {data.length > 0 && (
        <Button sx={{ m: 1 }} variant="contained" onClick={handleClear}>
          Clear
        </Button>
      )}
      {data
        .sort((todo1, todo2) => {
          return boolToInt(todo1.is_complete) - boolToInt(todo2.is_complete);
        })

        .map((todo) => (
          <TodoCard key={todo._id} todo={todo} fetchData={fetchData} />
        ))}
    </>
  );
}

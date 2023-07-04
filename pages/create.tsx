import React, { useState } from "react";
import { TextField, Stack, Container, Typography, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Navbar from "@/components/Navbar";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    console.log("Title inputted is: ", { title });
    console.log("Date inputted is: ", { dueDate });
    console.log("Description inputted is: ", { description });

    const response = await fetch("/api/todos/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        due_date: dueDate,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    // Clear the form fields.
    setTitle("");
    setDueDate(null);
    setDescription("");
  };

  return (
    <form>
      <Navbar />
      <Stack direction="column" spacing={1} alignItems={"center"}>
        <TextField
          variant="outlined"
          label="title"
          value={title}
          sx={{ width: "500px" }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="date"
          type="date"
          value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setDueDate(new Date(e.target.value))}
        />
        <TextField
          variant="outlined"
          label="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ width: "1000px" }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          endIcon={<AddTaskIcon />}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Create;

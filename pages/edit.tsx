import React, { useState } from "react";
import { TextField, Stack, Container, Typography, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Navbar from "@/components/Navbar";

const Edit = (title: string, dueDate: Date, description: String) => {
  const [title2, setTitle2] = useState<string>("");
  const [dueDate2, setDueDate2] = useState<Date | null>(null);
  const [description2, setDescription2] = useState<string>("");
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
    setTitle2("");
    setDueDate2(null);
    setDescription2("");
  };

  return (
    <form>
      <Navbar />
      <Stack direction="column" spacing={1} alignItems={"center"}>
        <TextField
          placeholder={title}
          variant="outlined"
          label="title"
          value={title}
          sx={{ width: "500px" }}
          onChange={(e) => setTitle2(e.target.value)}
        />
        <input
          className="date"
          type="date"
          value={dueDate2 ? dueDate2.toISOString().split("T")[0] : ""}
          onChange={(e) => setDueDate2(new Date(e.target.value))}
        />
        <TextField
          variant="outlined"
          label="description"
          value={description}
          onChange={(e) => setDescription2(e.target.value)}
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

export default Edit;

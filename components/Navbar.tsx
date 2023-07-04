import React from "react";
import { Button, Modal } from "@mui/material";
import Link from "next/link";
import { Grid, Container, Typography } from "@mui/material";
import sendImage from "*.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import ClearIcon from "@mui/icons-material/Clear";
import { TodoType } from "@/pages";

const Navbar: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Typography variant="h3" fontWeight="bold" align="center">
        Todo List
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingBottom={10}
      >
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            endIcon={<BackupTableIcon fontSize="inherit" />}
            sx={{ m: "5px" }}
          >
            Todos
          </Button>
        </Link>
        <Link href="/create">
          <Button
            variant="contained"
            endIcon={<AddCardIcon />}
            sx={{ m: "5px" }}
          >
            Create
          </Button>{" "}
        </Link>
      </Grid>
    </>
  );
};

export default Navbar;

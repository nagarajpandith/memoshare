import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import MemoCard from "./MemoCard";
import { MemoCreate } from "./MemoCreate";
import { Snackbar, Alert } from "@mui/material";
import { Note } from "../data/DummyData";

const MemoDashboard: React.FC<{
  changeUserExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ changeUserExist }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [createAlert, setCreateAlert] = useState<boolean>(false);
  const [memoList, setMemoList] = useState<Note[]>([]);

  useEffect(() => {
    let list = JSON.parse(
      JSON.stringify(localStorage.getItem("MemoList") || "[]")
    );

    list = JSON.parse(list);
    console.log(typeof list + list);

    if (list == null || list?.length == 0) {
      setMemoList([]);
    } else {
      setMemoList(list);
    }
  }, [createAlert]);

  const createNote = () => {
    setOpen(true);
  };

  const logout = () => {
    localStorage.removeItem("EmailCred");
    localStorage.removeItem("MemoList");
    changeUserExist(false);
  };

  const handleCreateAlert = () => {
    setCreateAlert(false);
  };

  return (
    <Box
      className="flex flex-row justify-start items-center rounded-3xl shadow-md p-20 flex-wrap mx-20"
      style={{ background: "#F5E8DD" }}
    >
      {open ? (
        <MemoCreate
          open={open}
          setOpen={setOpen}
          alertSet={setCreateAlert}
          memoList={memoList}
          setMemoList={setMemoList}
        />
      ) : (
        <></>
      )}
      <h1
        className="text-center w-full"
        style={{ fontFamily: "Delicious Handrawn", fontSize: "4em" }}
      >
        MemoShare
      </h1>
      <h4
        className="text-center w-full mb-5"
        style={{ fontFamily: "Delicious Handrawn", fontSize: "2em" }}
      >
        Start sharing your notes now
      </h4>

      <Box className="w-full flex flex-row justify-between">
        <Button
          onClick={createNote}
          className="justify-start bottom-5"
          variant="outlined"
          startIcon={<Add />}
        >
          Create Note
        </Button>

        <Button
          onClick={logout}
          color="error"
          className="justify-end bottom-5"
          variant="outlined"
        >
          Log out
        </Button>
      </Box>

      {memoList.length ? (
        memoList?.map((memo: Note, i) => {
          return <MemoCard key={i} title={memo.title} content={memo.content} />;
        })
      ) : (
        <Box className="flex flex-row justify-center items-center w-full">
          <p style={{ fontFamily: "Delicious Handrawn", fontSize: "2em" }}>
            No memo yet
          </p>
        </Box>
      )}
      <Snackbar
        open={createAlert}
        autoHideDuration={2000}
        onClose={handleCreateAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCreateAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Memo created successfully!!!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MemoDashboard;

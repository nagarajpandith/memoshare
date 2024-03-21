import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { url } from "../data/DummyData";
import { Note } from "../data/DummyData";

export const MemoCreate: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertSet: React.Dispatch<React.SetStateAction<boolean>>;
  memoList: Note[];
  setMemoList: React.Dispatch<React.SetStateAction<Array<Note>>>;
}> = ({ open, setOpen, alertSet, memoList, setMemoList }) => {
  const [noteTitle, setnoteTitle] = useState<string>("");
  const [noteContent, setnoteContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const emailCred = JSON.stringify(localStorage.getItem("EmailCred"));
    if (emailCred != "null") {
      const emailChanged = emailCred.substring(1, emailCred.length - 1);
      setEmail(emailChanged);
    } else {
      setEmail("");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const handleSetMemo = () => {
    const tempList: Note[] = [...memoList];
    tempList.push({ title: noteTitle, content: noteContent });
    localStorage.setItem("MemoList", JSON.stringify(tempList));
    setMemoList(tempList);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            //handleSetBody();
            console.log(noteTitle);
            console.log(noteContent);

            handleClose();
          },
        }}
      >
        <DialogTitle
          style={{ fontFamily: "Delicious Handrawn", fontSize: "2em" }}
        >
          Create your note
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="Title"
            name="Title"
            label="Enter the title"
            type="text"
            fullWidth
            variant="outlined"
            value={noteTitle}
            onChange={(e) => setnoteTitle(e.target.value)}
          />
          <TextField
            required
            id="Content"
            name="Content"
            label="Enter the Content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
            className="top-2"
            value={noteContent}
            onChange={(e) => setnoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => {
              if (!email) return console.log("email not found");
              console.log({
                email,
                title: noteTitle,
                content: noteContent,
              });

              handleSetMemo();

              postData(url, {
                email,
                title: noteTitle,
                content: noteContent,
              }).then((data) => {
                console.log(data);
              });

              alertSet(true);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { url } from '../data/DummyData';
import { Note } from '../data/DummyData';
import { toast } from 'sonner';

export const MemoCreate: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memoList: Note[];
  setMemoList: React.Dispatch<React.SetStateAction<Array<Note>>>;
}> = ({ open, setOpen, memoList, setMemoList }) => {
  const [noteTitle, setnoteTitle] = useState<string>('');
  const [noteContent, setnoteContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const emailCred = JSON.stringify(localStorage.getItem('EmailCred'));
    if (emailCred != 'null') {
      const emailChanged = emailCred.substring(1, emailCred.length - 1);
      setEmail(emailChanged);
    } else {
      setEmail('');
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const handleSetMemo = (link: string) => {
    const tempList: Note[] = [...memoList];
    tempList.push({
      title: noteTitle,
      content: noteContent,
      link,
    });
    localStorage.setItem('MemoList', JSON.stringify(tempList));
    setMemoList(tempList);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle
          style={{ fontFamily: 'Delicious Handrawn', fontSize: '2em' }}
        >
          Create your note
        </DialogTitle>
        <DialogContent>
          <div className="pt-2">
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
              className="top-3 !rounded-none"
              value={noteContent}
              onChange={(e) => setnoteContent(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between w-full px-4 pb-2">
            <button onClick={handleClose} className="danger-btn">
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              onClick={() => {
                if (!email) return toast.error('email not found');
                toast.loading('Creating your note...', {
                  id: 'memoCreate',
                });
                postData(url, {
                  email,
                  title: noteTitle,
                  content: noteContent,
                }).then((data) => {
                  toast.dismiss('memoCreate');
                  console.log(data);
                  if (data.error) {
                    toast.error('Something went wrong', {
                      style: {
                        backgroundColor: 'red',
                        color: 'white',
                      },
                    });
                  } else {
                    handleSetMemo(data.link);
                    toast.success(data.message);
                  }
                });
              }}
            >
              Create
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

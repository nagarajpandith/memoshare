import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export const MemoCreate: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [noteTitle, setnoteTitle] = useState<string>('');
  const [noteContent, setnoteContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const emailCred = localStorage.getItem('EmailCred');
    if (emailCred) setEmail(emailCred);
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

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
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
          style={{ fontFamily: 'Delicious Handrawn', fontSize: '2em' }}
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
              if (!email) return console.log('email not found');
              postData(
                'https://prod-91.eastus.logic.azure.com/workflows/8738d724d71e4889a43b46be70a28d39/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2mhH0x5L_xdgEnqvG4mMrNfLJbil55wm_aP8ICvAaes',
                {
                  email,
                  title: noteTitle,
                  content: noteContent,
                }
              ).then((data) => {
                console.log(data);
              });
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import MemoCard from './MemoCard';
import { data, Memo } from '../data/DummyData';
import { MemoCreate } from './MemoCreate';

const MemoDashboard: React.FC<{
  changeUserExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ changeUserExist }) => {
  const [open, setOpen] = useState(false);

  const createNote = () => {
    setOpen(true);
  };

  const logout = () => {
    localStorage.removeItem('EmailCred');
    changeUserExist(false);
  };

  return (
    <Box
      className="flex flex-row justify-start items-center rounded-3xl shadow-md p-20 flex-wrap"
      style={{ background: '#F5E8DD' }}
    >
      {open ? <MemoCreate open={open} setOpen={setOpen} /> : <></>}
      <h1
        className="text-center w-full"
        style={{ fontFamily: 'Delicious Handrawn', fontSize: '4em' }}
      >
        MemoShare
      </h1>
      <h4
        className="text-center w-full mb-5"
        style={{ fontFamily: 'Delicious Handrawn', fontSize: '2em' }}
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

      {data.map((memo: Memo) => {
        return <MemoCard Title={memo.Title} Shared={memo.Shared} />;
      })}
    </Box>
  );
};

export default MemoDashboard;

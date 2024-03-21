import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import MemoCard from './MemoCard';
import { MemoCreate } from './MemoCreate';
import { Note } from '../data/DummyData';
import { toast } from 'sonner';

const MemoDashboard: React.FC<{
  changeUserExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ changeUserExist }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [memoList, setMemoList] = useState<Note[]>([]);

  useEffect(() => {
    let list = JSON.parse(
      JSON.stringify(localStorage.getItem('MemoList') || '[]')
    );

    list = JSON.parse(list);

    if (list == null || list?.length == 0) {
      setMemoList([]);
    } else {
      setMemoList(list);
    }
  }, []);

  const createNote = () => {
    setOpen(true);
  };

  const logout = () => {
    toast.success('Logged out successfully!');
    localStorage.removeItem('EmailCred');
    localStorage.removeItem('MemoList');
    changeUserExist(false);
  };

  return (
    <Box className="flex flex-row justify-start items-center shadow-md p-20 flex-wrap mx-20 bg-gray-100">
      {open ? (
        <MemoCreate
          open={open}
          setOpen={setOpen}
          memoList={memoList}
          setMemoList={setMemoList}
        />
      ) : (
        <></>
      )}
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
        <button
          onClick={createNote}
          className="justify-start bottom-5 flex items-center gap-1 btn"
        >
          <Add fontSize={'small'} />
          Create Note
        </button>

        <button
          onClick={logout}
          color="error"
          className="justify-end bottom-5 danger-btn flex items-center gap-1"
        >
          <Logout fontSize={'small'} />
          Log out
        </button>
      </Box>

      {memoList.length ? (
        memoList?.map((memo: Note, i) => {
          return (
            <MemoCard
              key={i}
              title={memo.title}
              content={memo.content}
              link={memo.link}
            />
          );
        })
      ) : (
        <Box className="flex flex-row justify-center items-center w-full">
          <p style={{ fontFamily: 'Delicious Handrawn', fontSize: '2em' }}>
            No memo yet
          </p>
        </Box>
      )}
    </Box>
  );
};

export default MemoDashboard;

import { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { toast } from 'sonner';

const LoginPage: React.FC<{
  changeUserExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ changeUserExist }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email == '') {
      return toast.error('Please enter your email');
    } else {
      const emailCred = JSON.stringify(localStorage.getItem('EmailCred'));
      if (emailCred != 'null') {
        return;
      } else {
        toast.success('Logged in successfully!');
        localStorage.setItem('EmailCred', email);
      }
      changeUserExist(true);
    }
  };

  return (
    <Box className="flex justify-center items-center p-8 shadow-md flex-wrap w-1/2 bg-gray-100">
      <form action="" onSubmit={handleSubmit}>
        <div
          className="w-full text-center"
          style={{ fontFamily: 'Delicious Handrawn', fontSize: '2em' }}
        >
          👋 Welcome to{' '}
        </div>
        <div className="flex gap-5 flex-col">
          <h2
            className="text-center"
            style={{ fontFamily: 'Delicious Handrawn', fontSize: '4em' }}
          >
            MemoShare
          </h2>
          <div className="flex items-center gap-4">
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              placeholder="Enter email..."
              variant="standard"
              color="secondary"
              type="email"
              sx={{ bottom: 3 }}
              value={email}
            />
            <button color="primary" type="submit">
              <img src="src\assets\enter.png" className="size-7 p-0" />
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default LoginPage;

import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import MemoDashboard from './components/MemoDashboard';
import { Toaster } from 'sonner';

function App() {
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    const emailCred = JSON.stringify(localStorage.getItem('EmailCred'));
    if (emailCred != 'null') {
      setUserExist(true);
    } else {
      setUserExist(false);
    }
  }, []);

  return (
    <main
      className="min-h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage: `url('https://picsum.photos/1024/928?blur')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {userExist ? (
        <MemoDashboard changeUserExist={setUserExist} />
      ) : (
        <LoginPage changeUserExist={setUserExist} />
      )}
      <Toaster position="bottom-right" />
    </main>
  );
}

export default App;

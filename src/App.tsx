import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import MemoDashboard from "./components/MemoDashboard";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [userExist, setUserExist] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    const emailCred = JSON.stringify(localStorage.getItem("EmailCred"));
    if (emailCred != "null") {
      setUserExist(true);
    } else {
      setUserExist(false);
    }
  }, []);

  const handleClose = () => {
    setEmailError(false);
  };

  return (
    <main
      className="min-h-screen flex justify-center items-center flex-col"
      style={{ background: "#FBF3D5" }}
    >
      {userExist ? (
        <MemoDashboard changeUserExist={setUserExist} />
      ) : (
        <LoginPage
          changeUserExist={setUserExist}
          setEmailError={setEmailError}
        />
      )}

      {/* Alert pop up to notify login was successful */}
      <Snackbar
        open={emailError}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          U logged in successfully!!!
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;

import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)

    const handleSubmit = () => {
        if (email == '') {
            setEmailError(true)
        } else {
            const emailCred = JSON.stringify(localStorage.getItem('EmailCred'))
            if (emailCred != "null") {
                /// continue with the found email => emailCred
            } else {
                localStorage.setItem("EmailCred", email)
            }
        }
        setEmailError(true);
    }

    const handleClose = () => {
        setEmailError(false);
    };

    return (
        <Box className="flex justify-center items-center p-8 shadow-md rounded-3xl flex-wrap" style={{ background: "#F5E8DD" }}>
            <div
                className="w-full text-center"
                style={{ fontFamily: "Delicious Handrawn", fontSize: "2em" }}
            >👋 Welcome to </div>
            <div>
                <h2
                    className="text-center"
                    style={{ fontFamily: "Delicious Handrawn", fontSize: "4em" }}
                >MemoShare
                </h2>
                <TextField
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email to get started..."
                    variant="standard"
                    color="secondary"
                    type="email"
                    sx={{ bottom: 3 }}
                    value={email}
                    error={emailError}

                />
                <Button variant="text" color="primary" onClick={handleSubmit} >
                    <img src="src\assets\enter.png" className="size-7 p-0" />
                </Button>
            </div>

            {/* Alert pop up to notify login was successful */}
            <Snackbar open={emailError} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    U logged in successfully!!!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default LoginPage;
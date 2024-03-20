import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const LoginPage: React.FC<any> = ({ changeUserExist, setEmailError }) => {

    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        if (email == '') {
            setEmailError(true)
        } else {
            const emailCred = JSON.stringify(localStorage.getItem('EmailCred'))
            if (emailCred != "null") {
                /// continue with the found email => emailCred
                console.log("found");

            } else {
                localStorage.setItem("EmailCred", email)
            }
            changeUserExist(true);
        }
        setEmailError(true);
    }

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

                />
                <Button variant="text" color="primary" onClick={handleSubmit} >
                    <img src="src\assets\enter.png" className="size-7 p-0" />
                </Button>
            </div>

        </Box>
    );
}

export default LoginPage;
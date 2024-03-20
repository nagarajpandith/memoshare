import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import MemoCard from "./MemoCard";
import {data,Memo} from "../data/DummyData";

const MemoDashboard = () => {
    return (
        <Box className="flex flex-row justify-start items-center rounded-3xl shadow-md p-20 flex-wrap" style={{ background: "#F5E8DD" }}>
            <h1
                className="text-center w-full"
                style={{ fontFamily: "Delicious Handrawn", fontSize: "4em" }}>MemoShare
            </h1>
            <h4
                className="text-center w-full mb-5"
                style={{ fontFamily: "Delicious Handrawn", fontSize: "2em" }}>
                Start sharing your notes now
            </h4>

            <Button
            className="justify-start bottom-5"
            variant="outlined" startIcon={<Add />}>
                Create Note
            </Button>
            {
                data.map((memo:Memo)=>{
                    return <MemoCard
                        Title={memo.Title}
                        Shared={memo.Shared}
                    />
                })
            }

        </Box>
    )
}

export default MemoDashboard;

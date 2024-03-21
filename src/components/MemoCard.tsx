import { Download, Share } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const MemoCard: React.FC<{
  title: string;
  content: string;
}> = ({ title, content }) => {
  return (
    <Box
      className="shadow-md w-full p-2 rounded-md my-2"
      sx={{ flexGrow: 1 }}
      style={{ background: "#F1EF99" }}
    >
      <Grid
        container
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <h1
            style={{ fontFamily: "Delicious Handrawn", fontSize: "1.8em" }}
            className="mx-12"
          >
            {title}
          </h1>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="text"
            startIcon={<Share />}
            style={{
              color: "black",
              fontFamily: "Delicious Handrawn",
              fontSize: "1.2em",
            }}
          >
            Share note
          </Button>
        </Grid>
        <Grid item xs={10}>
          <h3
            style={{ fontFamily: "Delicious Handrawn", fontSize: "1.2em" }}
            className="mx-12"
          >
            {content.substring(0, 10)} ....
          </h3>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="text"
            startIcon={<Download />}
            style={{
              color: "black",
              fontFamily: "Delicious Handrawn",
              fontSize: "1.2em",
            }}
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemoCard;

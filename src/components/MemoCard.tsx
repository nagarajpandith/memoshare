import { Download, Share } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { toast } from 'sonner';

const MemoCard: React.FC<{
  title: string;
  content: string;
  link: string;
}> = ({ title, content, link }) => {
  return (
    <Box
      className="shadow-md w-full p-2 rounded-md my-2"
      sx={{ flexGrow: 1 }}
      style={{ background: '#F1EF99' }}
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
            style={{ fontFamily: 'Delicious Handrawn', fontSize: '1.8em' }}
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
              color: 'black',
              fontFamily: 'Delicious Handrawn',
              fontSize: '1.2em',
            }}
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success('Shared successfully!');
            }}
          >
            Share note
          </Button>
        </Grid>
        <Grid item xs={10}>
          <h3
            style={{ fontFamily: 'Delicious Handrawn', fontSize: '1.2em' }}
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
              color: 'black',
              fontFamily: 'Delicious Handrawn',
              fontSize: '1.2em',
            }}
            onClick={() => {
              window.open(link, '_blank');
              toast.success('Downloaded successfully!');
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

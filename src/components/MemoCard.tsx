import { Download, Share } from '@mui/icons-material';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { toast } from 'sonner';

const MemoCard: React.FC<{
  title: string;
  content: string;
  link: string;
}> = ({ title, content, link }) => {
  return (
    <Box
      className="shadow-md w-full p-2 rounded-md my-5 py-5"
      sx={{ flexGrow: 1 }}
      style={{ background: '#ffffff' }}
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
          <button
            style={{
              fontFamily: 'Delicious Handrawn',
              fontSize: '1.2em',
            }}
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success('Shared successfully!');
            }}
            className="flex items-center gap-2 btn"
          >
            <Share fontSize="small" />
            Share note
          </button>
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
          <button
            style={{
              fontFamily: 'Delicious Handrawn',
              fontSize: '1.2em',
            }}
            onClick={() => {
              window.open(link, '_blank');
              toast.success('Downloaded successfully!');
            }}
            className="flex items-center gap-2 ghost-btn"
          >
            <Download fontSize="small" />
            Download
          </button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemoCard;

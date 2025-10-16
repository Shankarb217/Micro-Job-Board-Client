import { Box, Chip, Tooltip } from '@mui/material';
import { Science as ScienceIcon } from '@mui/icons-material';

const MockModeIndicator = () => {
  return (
    <Tooltip 
      title="Demo Mode: Using static data (no backend required). Changes persist during session only."
      arrow
      placement="left"
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        <Chip
          icon={<ScienceIcon />}
          label="DEMO MODE"
          color="warning"
          variant="filled"
          sx={{
            fontWeight: 'bold',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default MockModeIndicator;

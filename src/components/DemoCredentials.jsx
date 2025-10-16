import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ContentCopy as ContentCopyIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useState } from 'react';

const DemoCredentials = () => {
  const [expanded, setExpanded] = useState(true);
  const [copiedField, setCopiedField] = useState('');

  const credentials = [
    {
      role: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      color: 'error',
      description: 'Full access to dashboard, user management, job approval'
    },
    {
      role: 'Employer',
      email: 'employer@example.com',
      password: 'employer123',
      color: 'primary',
      description: 'Post jobs, manage listings, review applications'
    },
    {
      role: 'Seeker',
      email: 'seeker@example.com',
      password: 'seeker123',
      color: 'success',
      description: 'Browse jobs, apply, track applications'
    },
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3,
        backgroundColor: 'warning.light',
        borderLeft: 4,
        borderColor: 'warning.main'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon color="warning" />
          <Typography variant="h6" fontWeight="bold">
            Demo Mode - Test Credentials
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s'
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            This app is running in <strong>Demo Mode</strong> with static data. 
            No backend required! Use the credentials below to test different user roles.
          </Alert>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Password</strong></TableCell>
                  <TableCell><strong>Features</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credentials.map((cred) => (
                  <TableRow key={cred.role} hover>
                    <TableCell>
                      <Chip 
                        label={cred.role} 
                        color={cred.color} 
                        size="small" 
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontFamily="monospace">
                          {cred.email}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(cred.email, `${cred.role}-email`);
                          }}
                          title="Copy email"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        {copiedField === `${cred.role}-email` && (
                          <Typography variant="caption" color="success.main">
                            Copied!
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontFamily="monospace">
                          {cred.password}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(cred.password, `${cred.role}-password`);
                          }}
                          title="Copy password"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        {copiedField === `${cred.role}-password` && (
                          <Typography variant="caption" color="success.main">
                            Copied!
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {cred.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              💡 <strong>Tip:</strong> You can also register new accounts. 
              All changes persist during your session but reset on page refresh.
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default DemoCredentials;

import React from 'react';
import { Box, Typography, Button, Menu, MenuItem, IconButton, Stack, Chip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StudentInfoHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
       
      
       
      }}
    >
      {/* Left: Icon + Title */}
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: '#5558FF',
            color: '#fff',
            borderRadius: '10px',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
         <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0183 7.7593H16.9086M7.09151 7.7593H8.07322M7.09151 12.6678H8.07322M7.09151 17.5764H8.07322M11.0183 12.6678H16.9086M11.0183 17.5764H16.9086M2.67383 12.6678C2.67383 8.27175 2.67383 6.07272 4.03938 4.70717C5.40494 3.34161 7.60298 3.34161 12 3.34161C16.3961 3.34161 18.5952 3.34161 19.9607 4.70717C21.3263 6.07272 21.3263 8.27077 21.3263 12.6678C21.3263 17.0639 21.3263 19.2629 19.9607 20.6285C18.5952 21.9941 16.3971 21.9941 12 21.9941C7.60396 21.9941 5.40494 21.9941 4.03938 20.6285C2.67383 19.2629 2.67383 17.0649 2.67383 12.6678Z" stroke="white" stroke-width="1.47256" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Student Information
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Get All Student Details Regarding Fee Payment, And More...
          </Typography>
        </Box>
      </Box>

      {/* Right: Class Selector */}
      <Stack direction="row" spacing={1} alignItems="center" style={{border:'1px', backgroundColor:'#F0F0F0'}}>
        <Button
          size="small"
          variant="outlined"
          disabled
          sx={{
            backgroundColor: '#f1f1f1',
            color: '#aaa',
            border: 'none',
            minWidth: '64px',
            textTransform: 'none',
          }}
        >
          Class 9
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: '#5558FF',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#4a4ddf',
            },
          }}
        >
          Class 8
        </Button>
        <Button
          size="small"
          variant="text"
          sx={{
            color: '#000',
            textTransform: 'none',
          }}
        >
          Class 7
        </Button>
        <Button
          size="small"
          onClick={handleMoreClick}
          endIcon={<ArrowDropDownIcon />}
          sx={{
            textTransform: 'none',
            color: '#444',
          }}
        >
          More
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Class 6</MenuItem>
          <MenuItem onClick={handleClose}>Class 5</MenuItem>
          <MenuItem onClick={handleClose}>Archived</MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default StudentInfoHeader;

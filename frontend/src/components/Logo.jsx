import React from 'react'
import { Box, Typography } from '@mui/material'
import LogoDevIcon from '@mui/icons-material/LogoDev';

function Logo() {
  return (
    <Box sx={{display:"flex"}}>
        
        <Typography variant="h4" component="h2">
        <LogoDevIcon/>
   Your Logo
  </Typography>
    </Box>
  )
}

export default Logo
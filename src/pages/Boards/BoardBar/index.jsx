import  Box  from "@mui/material/Box"
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from "@mui/material/Tooltip"
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'




const MENU_STYLE = {
  color: 'primary.main',
  gbColor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgColor: 'primary.50'
  }

}

function BoardBar({board}){
    
    return(
        <Box sx={{
            width:'100%',
            height: theme => theme.trelloCustom.boardBarHeight,
            display:'flex',
            alignItems:'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            borderTop: '1px solid #00bfa5'
          }}>
            <Box sx={{display: 'flex', alignItems:'center', gap: 2}}>
              <Chip 
                sx={MENU_STYLE}
                icon={<DashboardIcon />} 
                label= {board?.title} 
                clickable
              />

              <Chip 
                sx={MENU_STYLE}
                icon={<VpnLockIcon />} 
                label= {board?.type}
                clickable
              />

              
              <Chip 
                sx={MENU_STYLE}
                icon={<AddToDriveIcon />} 
                label="Add to google drive" 
                clickable
              />

              <Chip 
                sx={MENU_STYLE}
                icon={<BoltIcon />} 
                label="Automation" 
                clickable
              />

              <Chip 
                sx={MENU_STYLE}
                icon={<FilterListIcon />} 
                label="filters" 
                clickable
              />
            </Box>

            <Box sx={{display: 'flex', alignItems:'center', gap: 2}}>
              
            </Box>

            <Box sx={{display: 'flex', alignItems:'center', gap: 2}}>
            <Button variant="outlined" startIcon={<PersonAddIcon/>}>Create</Button>
            
            <AvatarGroup 
            max={2}
            sx={{    
              color: 'white',
              cursor: 'pointer',
            }}
            >
              <Tooltip title='sang'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Tooltip>
              <Tooltip title='sang'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Tooltip>
              <Tooltip title='sang'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Tooltip>
          </AvatarGroup>
            </Box>
          </Box>
    )
}
export default BoardBar
import Typography from "@mui/material/Typography"
import  Box  from "@mui/material/Box"
import React from "react"
import Tooltip from "@mui/material/Tooltip"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { Button } from "@mui/material"
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent(){
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <Box sx={{
            backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
            width:'100%',
            height: theme => theme.trelloCustom.boardContentHeight,
            display:'flex',
            alignItems:'center',
            p: '10px 0',
            '&::-webkit-scrollbar-track': { m: 2 }
          }}>

            <Box sx={{
              bgColor: 'inherit',
              width: '100%',
              height: '100%',
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden'
            }}> 
                {/* BOX COLUMN 01 */}
              <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ?  '#333643' : '#ebecf0'),
                ml: 2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} -
                  ${theme.spacing(5)})`
              }}>
                <Box sx={{
                  height: COLUMN_HEADER_HEIGHT,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>
                    Conlumn title
                  </Typography>
                  <Box>
                      <Tooltip title='More options'>
                        <ExpandMoreIcon
                          sx={{
                            color: 'text.primary',
                            cursor: 'pointer',
                          }}

                          id="basic-menu-column-dropdown"
                          aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        />
                      </Tooltip>
                    
                      <Menu
                          id="basic-menu-column-dropdown"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                          'aria-labelledby': 'basic-menu-column-dropdown',
                          }}
                      >
                          <MenuItem>
                            <ListItemIcon>
                                <AddCardIcon/>
                            </ListItemIcon>
                            <ListItemText>Add new cart</ListItemText>
                          </MenuItem>

                          <MenuItem>
                            <ListItemIcon>
                                <ContentCutIcon/>
                            </ListItemIcon>
                            <ListItemText>Cut</ListItemText>
                          </MenuItem>
                          <MenuItem>
                            <ListItemIcon>
                              <ContentCopyIcon/>
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                          </MenuItem>

                          <MenuItem>
                            <ListItemIcon>
                                <ContentPasteIcon />
                            </ListItemIcon>
                            <ListItemText>Paste</ListItemText>
                          </MenuItem>
                            
                          <Divider />

                          <MenuItem>
                            <ListItemIcon>
                                    <DeleteForeverIcon />
                                </ListItemIcon>
                            <ListItemText>Remove this column</ListItemText>
                          </MenuItem>
                          <MenuItem>
                              <ListItemIcon>
                                  <Cloud fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Archive this column</ListItemText>
                          </MenuItem>

                        
                      </Menu>
                  </Box>
                </Box>

                <Box sx={{
                  p: '0 5px',
                  m: '0 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)}
                  - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
                  '&::-webkit-scrollbar-thumb':{
                    backgroundColor: '#ced0da'
                  },
                  '&::-webkit-scrollbar-thumb:hover':{
                      backgroundColor: '#bfc2cf',
                  }
                }}>
                  <Card sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset'
                  }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TT54hJZO28765CFATTfuqrZDmn3gDDW1e90E3GNP3wXjeBIFs5OuX2rk7x56N9JfahU&usqp=CAU"
                      title="green iguana"
                    />
                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>Panda</Typography>
                    </CardContent>
                    <CardActions sx={{ p: '0 4px 8px 4px' }}>
                      <Button size="small" startIcon={<GroupsIcon/>}>20</Button>
                      <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                      <Button size="small" startIcon={<AttachmentIcon/>}>20</Button>
                    </CardActions>
                  </Card>

                  <Card sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset'
                  }}>

                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>Panda 02 </Typography>
                    </CardContent>
                  </Card>

      
                </Box>

                  {/* ---------FOOTER-------- */}
                <Box sx={{
                  height: COLUMN_FOOTER_HEIGHT,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Button startIcon={<AddCardIcon/>}>Add new cart</Button>
                  <Tooltip title='Drag to move'>
                    <DragHandleIcon sx={{cursor: 'pointer'}}/>
                  </Tooltip>
                </Box>
              </Box>

                {/* BOX COLUMN 02 */}
                <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ?  '#333643' : '#ebecf0'),
                ml: 2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} -
                  ${theme.spacing(5)})`
              }}>
                <Box sx={{
                  height: COLUMN_HEADER_HEIGHT,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>
                    Conlumn title
                  </Typography>
                  <Box>
                      <Tooltip title='More options'>
                        <ExpandMoreIcon
                          sx={{
                            color: 'text.primary',
                            cursor: 'pointer',
                          }}

                          id="basic-menu-column-dropdown"
                          aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        />
                      </Tooltip>
                    
                      <Menu
                          id="basic-menu-column-dropdown"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                          'aria-labelledby': 'basic-menu-column-dropdown',
                          }}
                      >
                          <MenuItem>
                            <ListItemIcon>
                                <AddCardIcon/>
                            </ListItemIcon>
                            <ListItemText>Add new cart</ListItemText>
                          </MenuItem>

                          <MenuItem>
                            <ListItemIcon>
                                <ContentCutIcon/>
                            </ListItemIcon>
                            <ListItemText>Cut</ListItemText>
                          </MenuItem>
                          <MenuItem>
                            <ListItemIcon>
                              <ContentCopyIcon/>
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                          </MenuItem>

                          <MenuItem>
                            <ListItemIcon>
                                <ContentPasteIcon />
                            </ListItemIcon>
                            <ListItemText>Paste</ListItemText>
                          </MenuItem>
                            
                          <Divider />

                          <MenuItem>
                            <ListItemIcon>
                                    <DeleteForeverIcon />
                                </ListItemIcon>
                            <ListItemText>Remove this column</ListItemText>
                          </MenuItem>
                          <MenuItem>
                              <ListItemIcon>
                                  <Cloud fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Archive this column</ListItemText>
                          </MenuItem>

                        
                      </Menu>
                  </Box>
                </Box>

                <Box sx={{
                  p: '0 5px',
                  m: '0 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)}
                  - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
                  '&::-webkit-scrollbar-thumb':{
                    backgroundColor: '#ced0da'
                  },
                  '&::-webkit-scrollbar-thumb:hover':{
                      backgroundColor: '#bfc2cf',
                  }
                }}>
                  <Card sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset'
                  }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TT54hJZO28765CFATTfuqrZDmn3gDDW1e90E3GNP3wXjeBIFs5OuX2rk7x56N9JfahU&usqp=CAU"
                      title="green iguana"
                    />
                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>Panda</Typography>
                    </CardContent>
                    <CardActions sx={{ p: '0 4px 8px 4px' }}>
                      <Button size="small" startIcon={<GroupsIcon/>}>20</Button>
                      <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                      <Button size="small" startIcon={<AttachmentIcon/>}>20</Button>
                    </CardActions>
                  </Card>

                  <Card sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset'
                  }}>

                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>Panda 02 </Typography>
                    </CardContent>
                  </Card>

      
                </Box>

                  {/* ---------FOOTER-------- */}
                <Box sx={{
                  height: COLUMN_FOOTER_HEIGHT,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Button startIcon={<AddCardIcon/>}>Add new cart</Button>
                  <Tooltip title='Drag to move'>
                    <DragHandleIcon sx={{cursor: 'pointer'}}/>
                  </Tooltip>
                </Box>
              </Box>

            </Box>
          
          </Box>
    )
}

export default BoardContent
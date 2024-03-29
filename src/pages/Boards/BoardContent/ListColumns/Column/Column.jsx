import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
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
import ListCards from "./ListCards/ListCards"
import { mapOrder } from "~/utils/sorts"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'


function Column({ column }){
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id")
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
      id: column._id,
      data: {...column}
    })
    
    const dndKitColumnStyles = {
      transform: CSS.Translate.toString(transform),
      transition,
      height: '100%',
      opacity: isDragging ? 0.5 : undefined
    }
    
    return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ?  '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} -
            ${theme.spacing(5)})`
          }}
          {...listeners}
      >
          <Box sx={{
            height: (theme) => theme.trelloCustom.columnHeaderHeight,
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
              {column?.title}
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
          
            {/* List cards */}
          <ListCards cards={orderedCards}/>
            {/* ---------FOOTER-------- */}
          <Box sx={{
            height:  (theme) => theme.trelloCustom.columnFooterHeight,
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
    </div>
    )
}

export default Column
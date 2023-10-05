import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'
import {useColorScheme} from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'


function ModeSelect(){
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mod">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mod"
        id="label-select-dark-light-mod"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <div style={ {display:'flex', alignItems:'center', gap:'8px'} }>
            <LightModeIcon fontSize='small'/>
            Light
          </div>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <DarkModeOutlinedIcon fontSize='small'/>
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <SettingsBrightnessIcon fontSize='small'/>
            System   
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}


function App() {

  return (
    <>
      <ModeSelect/>
      <hr/>
      <ModeToggle/>
      <div>React JS</div>
      <Button variant="contained">Hello world</Button>
      <AccessAlarm/>
      <ThreeDRotation/>
    </>
  )
}

export default App

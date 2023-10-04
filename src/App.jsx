import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import Typography  from '@mui/material/Typography';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}


function App() {

  return (
    <>
      <ModeToggle/>
      <div>React JS</div>
      <Button variant="contained">Hello world</Button>
      <AccessAlarm/>
      <ThreeDRotation/>
    </>
  )
}

export default App

import { Snackbar, Slide, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const Snack = ({title, openSnackBar, setOpenSnackBar}: any) => {

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setOpenSnackBar(false);
    }
    setOpenSnackBar(false);
  };

  return (
    <Snackbar
    open={openSnackBar}
    TransitionComponent={Slide}
    message={title}
    ContentProps={{sx: {background: '#E52F5B', color: '#fff'}}}
    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    action={
        <IconButton
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
    }
    />
  )
}

export default Snack
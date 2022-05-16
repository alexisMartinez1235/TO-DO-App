import React from 'react';
import {
  Avatar,
  MenuItem,
  Menu,
  Badge,
  // IconButton,
  Fab,
} from '@mui/material';
import {
  useNavigate,
} from 'react-router-dom';

interface IProps {
  alt: string;
}

export default function AvatarMenu(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item: string | null) => {
    if (item !== null) {
      navigate(`/dashboard/${item}`);
      // alert(item);
    }
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <Badge color="secondary">
      <Fab
        color="secondary"
        aria-label="avatar"
        size="small"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt={props.alt} />
      </Fab>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose('account')}>My account</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </Badge>
  );
}

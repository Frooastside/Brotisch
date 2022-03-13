import { Logout } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchSelfProfile } from '../../api/user';

const Profile = () => {
  const [profile, setProfile] = useState();
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    fetchSelfProfile().then(setProfile);
  }, []);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      {profile === undefined
        ? <CircularProgress />
        : <>
          {profile === null
            ? <Button component="a" href={`${process.env.REACT_APP_BACKEND}/authenticate`}>Login</Button>
            : <>
              {profile.avatar
                ?
                <Avatar
                  alt={profile.username}
                  id="avatar-button"
                  onClick={handleClick}
                  src={profile.avatar}
                  sx={{ cursor: 'pointer' }} />
                :
                <Avatar
                  id="avatar-button"
                  onClick={handleClick}
                  sx={{ cursor: 'pointer' }} >
                  {profile.username.substring(0, 2)}
                </Avatar>
              }
              <Menu
                MenuListProps={{
                  'aria-labelledby': 'avatar-button',
                }}
                anchorEl={anchor}
                id="basic-menu"
                onClose={handleClose}
                open={anchor !== null}
                sx={{ marginTop: '.5em' }}
              >
                <MenuItem button component="a" href={`${process.env.REACT_APP_BACKEND}/logout`}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          }
        </>
      }
    </>
  );
};

export default Profile;
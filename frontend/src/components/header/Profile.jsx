import { Logout, OpenInNew } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelfProfile } from "../../api/profile";
import { setProfile } from "../../redux/socialSlice";

const Profile = () => {
  const [anchor, setAnchor] = useState(null);
  const profile = useSelector((state) => state.social.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSelfProfile().then((profile) => dispatch(setProfile(profile)));
  }, []);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile === null ? (
            <Button
              component="a"
              href={`${process.env.REACT_APP_BACKEND}/authenticate`}
            >
              Login
            </Button>
          ) : (
            <>
              {profile.avatar ? (
                <Avatar
                  alt={profile.username}
                  id="avatar-button"
                  onClick={handleClick}
                  src={profile.avatar}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <Avatar
                  id="avatar-button"
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                >
                  {profile.username.substring(0, 2)}
                </Avatar>
              )}
              <Menu
                MenuListProps={{
                  "aria-labelledby": "avatar-button"
                }}
                anchorEl={anchor}
                id="basic-menu"
                onClose={handleClose}
                open={anchor !== null}
                sx={{ marginTop: ".5em" }}
              >
                <MenuItem
                  component="a"
                  href={`${process.env.REACT_APP_BACKEND}/redirect/profile`}
                >
                  <ListItemIcon>
                    <OpenInNew fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </MenuItem>
                <Divider />
                <MenuItem
                  component="a"
                  href={`${process.env.REACT_APP_BACKEND}/logout`}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;

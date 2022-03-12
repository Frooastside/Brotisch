import { Avatar, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchSelfProfile } from '../../api/user';

const Profile = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    fetchSelfProfile().then(setProfile);
  }, []);


  return (
    <>
      {profile === undefined
        ? <CircularProgress />
        : <>
          {profile === null
            ? <Button href={`${process.env.REACT_APP_BACKEND}/authenticate`}>Login</Button>
            : <>
              {profile.avatar
                ? <Avatar alt={profile.username} src={profile.avatar} />
                : <Avatar>{profile.username.substring(0, 2)}</Avatar>
              }
            </>
          }
        </>
      }
    </>
  );
};

export default Profile;
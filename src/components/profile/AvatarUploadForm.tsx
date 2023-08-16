import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPLOAD_AVATAR } from '../../apollo/operations';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateUser } from '../../store/usersSlice';
import { getUserNameAbbreviation } from '../../utils';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import { InfoBar } from '../';
import type { User } from '../../apollo/types';

interface AvatarUploadFormProps {
  visible: boolean;
}

interface OutletContext {
  user: User;
}

const AVATAR_MAX_SIZE = 500_000;

export default function AvatarUploadForm({ visible }: AvatarUploadFormProps) {
  const { user } = useOutletContext<OutletContext>();
  const [upload, { loading, error }] = useMutation(UPLOAD_AVATAR);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const handleAvatarClick = () => {
    if (!user.profile.avatar) {
      inputRef.current?.click();
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0];

    if (!avatar || avatar.size > AVATAR_MAX_SIZE) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener('load', async () => {
      const { data } = await upload({
        variables: {
          id: user.profile.id,
          avatar: {
            base64: fileReader.result,
            size: avatar.size,
            type: avatar.type,
          },
        },
      });
      dispatch(
        updateUser({
          id: user.id,
          changes: {
            profile: { ...user.profile, avatar: data.uploadAvatar },
          },
        }),
      );
    });

    fileReader.readAsDataURL(avatar);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Avatar
        sx={{ width: 120, height: 120, fontSize: 40 }}
        src={user.profile.avatar!}
        alt={user.profile.full_name || user.email}
        onClick={handleAvatarClick}
      >
        {loading ? <CircularProgress color="inherit" /> : getUserNameAbbreviation(user)}
      </Avatar>

      {visible && (
        <Box sx={{ m: 'auto' }} component="form">
          <InputLabel sx={{ cursor: 'pointer' }} htmlFor="avatar-upload">
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'text.primary',
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              <UploadIcon fontSize="large" /> Upload avatar image
            </Typography>
            <Typography>png, jpg or gif no more than 0.5MB</Typography>
          </InputLabel>
          <Input
            sx={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            inputRef={inputRef}
            inputProps={{ accept: '.png, .jpeg, .jpg, .gif' }}
            onChange={handleAvatarUpload}
          />
        </Box>
      )}

      {error ? <InfoBar text={error.message} status="error" /> : null}
    </Box>
  );
}

import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPLOAD_AVATAR, DELETE_AVATAR } from '../../apollo/operations';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateUser } from '../../store/usersSlice';
import { getUserNameAbbreviation } from '../../utils';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
  const [upload, avatarUpload] = useMutation(UPLOAD_AVATAR);
  const [mutate, avatarDeletion] = useMutation(DELETE_AVATAR);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const error = avatarUpload.error || avatarDeletion.error;

  const avatarExists = !!user.profile.avatar;

  const handleAvatarClick = () => {
    if (!avatarExists) {
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

  const handleAvatarDeletion = async () => {
    await mutate({
      variables: { id: user.profile.id },
    });
    dispatch(
      updateUser({
        id: user.id,
        changes: {
          profile: { ...user.profile, avatar: null },
        },
      }),
    );
    formRef.current?.reset();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Badge
        badgeContent={
          <IconButton onClick={handleAvatarDeletion}>
            <CloseIcon />
          </IconButton>
        }
        invisible={!avatarExists}
      >
        <Avatar
          sx={{ width: 120, height: 120, fontSize: 40 }}
          src={user.profile.avatar!}
          alt={user.profile.full_name || user.email}
          onClick={handleAvatarClick}
        >
          {avatarUpload.loading ? <CircularProgress color="inherit" /> : getUserNameAbbreviation(user)}
        </Avatar>
      </Badge>

      {visible && (
        <Box sx={{ m: 'auto' }} component="form" ref={formRef}>
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

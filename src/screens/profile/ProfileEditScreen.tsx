import { FC, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import { Controller, useForm } from 'react-hook-form';
import { TProfilePayload } from '../../models/AuthModel';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { deleteProfile, updateProfile } from '../../store/authSlice';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { Avatar, Button, Dialog, Icon, Input } from '@rneui/base';
import ImageCropPicker, {
  PickerErrorCode,
} from 'react-native-image-crop-picker';
import { getAvatarSource } from '../../helpers/upload';
import { spacing } from '../../styles/spacing';

const AVATAR_SIZE = 150;

export interface ICropPickerError {
  code: PickerErrorCode;
}

const ProfileEditScreen: FC<IScreenProps> = props => {
  const { navigation } = props;

  const { isLoading, profile } = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  const [uploadDialog, setUploadDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<TProfilePayload>({
    defaultValues: {
      name: profile?.name || '',
      surname: profile?.surname || '',
      avatar_url: profile?.avatar_url || null,
    },
  });

  const avatar_url = watch('avatar_url');

  const onSubmit = handleSubmit(data => {
    dispatch(updateProfile(data))
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Something went wrong', error);
      });
  });

  const handleDeleteProfile = () => {
    setDeleteDialog(false);
    dispatch(deleteProfile())
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Something went wrong', error);
      });
  };

  const onPickerError = (error: ICropPickerError) => {
    if (error.code === 'E_PICKER_CANCELLED') {
      console.info('user cancelled crop picker');
      return;
    }
    console.error('image picker error', error);
    Alert.alert('Something went wrong', 'Unable to upload image');
  };

  const handleLibrary = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        setValue('avatar_url', image);
      })
      .catch(error => {
        onPickerError(error);
      })
      .finally(() => {
        setUploadDialog(false);
      });
  };

  const handleCamera = () => {
    ImageCropPicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        setValue('avatar_url', image);
      })
      .catch(error => {
        onPickerError(error);
      })
      .finally(() => {
        setUploadDialog(false);
      });
  };

  return (
    <View style={[global.container, global.fillCenter]}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => setUploadDialog(true)}>
        <Avatar
          rounded
          size={AVATAR_SIZE}
          source={getAvatarSource(avatar_url)}
        />
        <View style={styles.upload}>
          <Icon name="upload" type="material" color={colors.gray[0]} />
        </View>
      </TouchableOpacity>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Name is required',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="surname"
        rules={{
          required: 'Surname is required',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Surname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error?.message}
          />
        )}
      />
      <View style={styles.buttons}>
        <Button
          title="Submit"
          disabled={!isValid}
          loading={isLoading}
          onPress={() => onSubmit()}
        />
        <Button
          title="Delete profile"
          color={colors.red[9]}
          onPress={() => setDeleteDialog(true)}
        />
      </View>
      <Dialog
        isVisible={uploadDialog}
        overlayStyle={styles.dialog}
        onBackdropPress={() => setUploadDialog(false)}>
        <Dialog.Title title="Upload" />
        <Dialog.Actions>
          <Dialog.Button title="Library" onPress={() => handleLibrary()} />
          <Dialog.Button title="Camera" onPress={() => handleCamera()} />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        isVisible={deleteDialog}
        overlayStyle={styles.dialog}
        onBackdropPress={() => setDeleteDialog(false)}>
        <Dialog.Title title="Delete your profile?" />
        <Dialog.Actions>
          <Dialog.Button title="Yes" onPress={() => handleDeleteProfile()} />
          <Dialog.Button
            title="Cancel"
            onPress={() => setDeleteDialog(false)}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    position: 'relative',
    overflow: 'hidden',
  },
  upload: {
    height: 30,
    width: '100%',
    backgroundColor: colors.dark[9] + '80',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing[4],
  },
});

export default ProfileEditScreen;

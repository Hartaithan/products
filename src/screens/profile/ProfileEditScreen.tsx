import { FC } from 'react';
import { View, Alert } from 'react-native';
import global from '../../styles/global';
import { IScreenProps } from '../../models/NavigationModel';
import { Controller, useForm } from 'react-hook-form';
import { TProfilePayload } from '../../models/AuthModel';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { Button, Input } from 'react-native-elements';
import { updateProfile } from '../../store/authSlice';

const ProfileEditScreen: FC<IScreenProps> = props => {
  const { navigation } = props;

  const { isLoading, profile } = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TProfilePayload>({
    defaultValues: {
      name: profile?.name || '',
      surname: profile?.surname || '',
      avatar_url: profile?.avatar_url || null,
    },
  });

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

  return (
    <View style={[global.container, global.fillCenter]}>
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
      <Button
        title="Submit"
        disabled={!isValid}
        loading={isLoading}
        onPress={() => onSubmit()}
      />
    </View>
  );
};

export default ProfileEditScreen;

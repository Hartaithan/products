import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import global from '../../styles/global';
import { IScreenProps, SCREENS } from '../../models/NavigationModel';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'react-native-elements';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { signUp } from '../../store/authSlice';
import Text from '../../components/Text';
import { spacing } from '../../styles/spacing';

const SignUpScreen: FC<IScreenProps> = props => {
  const { navigation } = props;

  const { isLoading } = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<SignUpWithPasswordCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    dispatch(signUp(data))
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        setError('email', { message: error });
      });
  });

  return (
    <View style={[global.container, styles.content]}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          validate: {
            maxLength: v =>
              v.length <= 50 || 'The email should have at most 50 characters',
            matchPattern: v =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'Email address must be a valid address',
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should have at least 5 characters',
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Password"
            secureTextEntry
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
      <Text tg="text-xs" c="gray" cs={6} style={styles.message}>
        Already have account?&nbsp;
        <Text
          tg="text-xs"
          c="blue"
          onPress={() => navigation.replace(SCREENS.SignIn)}>
          Sign In!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: spacing[5],
  },
});

export default SignUpScreen;

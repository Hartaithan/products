import { StyleSheet, View } from 'react-native';
import { FC } from 'react';
import { IScreenProps, SCREENS } from '../../models/NavigationModel';
import global from '../../styles/global';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useStore';
import { Controller, useForm } from 'react-hook-form';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { signIn } from '../../store/authSlice';
import { Button, Input } from 'react-native-elements';
import Text from '../../components/Text';
import { spacing } from '../../styles/spacing';

const SignInScreen: FC<IScreenProps> = props => {
  const { navigation } = props;

  const { isLoading } = useTypedSelector(state => state.auth);
  const dispatch = useTypedDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<SignInWithPasswordCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        setError('email', { message: error });
      });
  });

  return (
    <View style={[global.container, global.fillCenter]}>
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
        Don&apos;t have an account?&nbsp;
        <Text
          tg="text-xs"
          c="blue"
          onPress={() => navigation.replace(SCREENS.SignUp)}>
          Sign Up!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    marginTop: spacing[5],
  },
});

export default SignInScreen;

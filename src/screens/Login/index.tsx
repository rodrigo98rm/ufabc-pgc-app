import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {api} from '../../api';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      navigation.replace('Home');
    }
  }, [loggedIn, navigation]);

  const handleLoginButtonPressed = async () => {
    try {
      const result = await api.post('/login', {
        email,
        password,
      });

      if (result.status === 200) {
        setLoggedIn(true);
      }
    } catch (err) {
      Alert.alert(
        'Login Inválido',
        'Verifique suas credenciais e tente novamente',
      );
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        keyboardType="numeric"
        secureTextEntry
        testID="password-input"
        autoCorrect={false}
      />

      <Button
        onPress={handleLoginButtonPressed}
        title="Login"
        testID="login-button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;

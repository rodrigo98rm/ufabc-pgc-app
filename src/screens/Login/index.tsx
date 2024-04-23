import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, Alert, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LOGIN_ENDPOINT =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/login'
    : 'http://localhost:3000/login';

function Login(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<any>();

  const handleLoginButtonPressed = async () => {
    try {
      const result = await axios.post(LOGIN_ENDPOINT, {
        email,
        password,
      });

      if (result.status === 200) {
        navigation.replace('Home');
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
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;

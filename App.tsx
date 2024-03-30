/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, Button, Text, TextInput, StyleSheet} from 'react-native';

function App(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const validateLogin = () => {
    if (email === 'rodrigo@teste.com' && password === '123456') {
      setLoggedIn(true);
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

      <Button onPress={validateLogin} title="Login" testID="login-button" />

      {loggedIn && (
        <Text style={{alignSelf: 'center', marginTop: 32}}>
          You are now logged in!
        </Text>
      )}
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

export default App;

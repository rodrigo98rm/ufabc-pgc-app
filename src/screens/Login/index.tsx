import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  Alert,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {api} from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS} from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('loggedIn').then(value => {
      if (value === 'true') {
        setLoggedIn(true);
      }
      setLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.background);
    }

    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

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
        AsyncStorage.setItem('loggedIn', 'true');
        setLoggedIn(true);
      }
    } catch (err) {
      Alert.alert(
        'Login Inválido',
        'Verifique suas credenciais e tente novamente',
      );
    }
  };

  if (loggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="notebook" size={100} color="#fff" />
        <Text style={styles.title}>Bloco de Notas</Text>
      </View>
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

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleLoginButtonPressed}
          title="Login"
          color={COLORS.secondary}
          testID="login-button"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#006d35e4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#006d35e4',
    flex: 1,
  },
  iconContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 16,
  },
});

export default Login;

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../../api';

const HeaderButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="trash-can-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const NewNote = () => {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Nova Nota',
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerRight: () => <HeaderButton onPress={() => {}} />,
    });
  }, [navigation]);

  const toggleSwitch = () => setIsPinned(previousState => !previousState);

  const handleSubmit = async () => {
    setLoading(true);

    await api.post('/notes', {
      title,
      description,
      pinned: isPinned,
    });

    setLoading(false);

    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        style={styles.title}
        placeholder="Título"
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Fixar no topo</Text>
        <Switch
          trackColor={{false: '#3e3e3e', true: '#ffcf75'}}
          thumbColor={isPinned ? COLORS.secondary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPinned}
        />
      </View>
      <TextInput
        style={styles.description}
        multiline
        placeholder="Descrição"
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar"
            onPress={handleSubmit}
            color={COLORS.primary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 40,
    marginVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  description: {
    height: 160,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 16,
  },
  switchText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 12,
  },
});

export default NewNote;

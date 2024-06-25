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
  Modal,
  Alert,
} from 'react-native';
import {COLORS} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../../api';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'NewNote'>;

const HeaderButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="trash-can-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const NewNote = ({route, navigation}: Props) => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: route.params ? 'Editar Nota' : 'Nova Nota',
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () =>
        route.params ? (
          <HeaderButton
            onPress={() => {
              setConfirmDeleteModalVisible(true);
            }}
          />
        ) : null,
    });

    if (route.params) {
      setTitle(route.params.title);
      setDescription(route.params.description);
      setIsPinned(route.params.pinned);
    }
  }, [navigation, route]);

  const toggleSwitch = () => setIsPinned(previousState => !previousState);

  const handleDelete = async () => {
    await api.delete(`/notes/${route.params!.id}`);
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Preencha o título');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Erro', 'Preencha a descrição');
      return;
    }

    setLoading(true);

    const data = {
      title,
      description,
      pinned: isPinned,
    };

    if (route.params) {
      await api.put(`/notes/${route.params.id}`, data);
    } else {
      await api.post('/notes', data);
    }

    setLoading(false);

    navigation.goBack();
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={confirmDeleteModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Apagar Nota</Text>
            <Text style={styles.modalBody}>
              Tem certeza que deseja apagar esta nota?
            </Text>
            <View style={styles.modalActionsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setConfirmDeleteModalVisible(false);
                }}>
                <Text style={styles.modalCancelAction}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.modalConfirmAction}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    backgroundColor: '#00000088',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    width: '85%',
  },
  modalTitle: {fontSize: 20, color: '#000'},
  modalBody: {marginTop: 8},
  modalActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
    marginTop: 16,
  },
  modalCancelAction: {fontWeight: 'bold'},
  modalConfirmAction: {color: '#000', fontWeight: 'bold'},
});

export default NewNote;

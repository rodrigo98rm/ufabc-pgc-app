import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import {View} from 'react-native';
import {api} from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils/colors';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="delete-note-button">
      <Icon name="logout" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [sectionListData, setSectionListData] = useState<Section[]>([]);

  const handleLogout = useCallback(() => {
    AsyncStorage.removeItem('loggedIn');
    navigation.replace('Login');
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('focus', getNotes);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton
          onPress={() => {
            handleLogout();
          }}
        />
      ),
    });
  }, [navigation, handleLogout]);

  const handleItemSelected = (item: Note) => {
    navigation.navigate('NewNote', item);
  };

  const getNotes = async () => {
    const {data} = await api.get('/notes');

    const pinned = data.filter((note: Note) => note.pinned);
    const others = data.filter((note: Note) => !note.pinned);

    const sections: Section[] = [
      {
        title: 'Favoritas',
        data: pinned,
      },
      {
        title: 'Notas',
        data: others,
      },
    ];

    setSectionListData(sections);
  };

  const isListEmpty = useMemo(() => {
    return sectionListData.every(section => section.data.length === 0);
  }, [sectionListData]);

  return (
    <SafeAreaView style={styles.container}>
      {isListEmpty ? (
        <View style={styles.emptyViewContainer}>
          <Icon name="note-alert" size={100} color="#6b6b6b" />
          <Text>Nenhuma nota cadastrada</Text>
          <Text>Crie sua primeira nota clicando no botão "+" abaixo</Text>
        </View>
      ) : (
        <SectionList
          sections={sectionListData}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Pressable
              testID={`list-item-pinned:${item.pinned}-${item.title}`}
              style={styles.item}
              onPress={() => {
                handleItemSelected(item);
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </Pressable>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
          stickySectionHeadersEnabled
        />
      )}
      <View style={styles.fabContainer}>
        <FloatingActionButton
          testID="new-note-button"
          onPress={() => {
            navigation.navigate('NewNote');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ededed',
    padding: 8,
    marginVertical: 2,
  },
  header: {
    fontSize: 24,
    backgroundColor: '#fff',
    padding: 8,
    color: COLORS.primary,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 12,
    height: 32,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  emptyViewContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
});

export default Home;

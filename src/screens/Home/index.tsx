import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
  Pressable,
} from 'react-native';

type Note = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

type Section = {
  title: string;
  data: Note[];
};

const DATA: Section[] = [
  {
    title: 'Favoritas',
    data: [
      {
        id: 1,
        title: 'Nova Nota',
        description: 'Crie uma nova nota',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Notas',
        description: 'Veja todas as notas',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    title: 'Notas',
    data: [],
  },
];

const Home = () => {
  const navigation = useNavigation<any>();

  const handleItemSelected = (item: Note) => {
    navigation.navigate('NewNote', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Pressable
            style={styles.item}
            onPress={() => {
              handleItemSelected(item);
            }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Pressable>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  item: {
    backgroundColor: '#ededed',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  header: {
    fontSize: 24,
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
});

export default Home;

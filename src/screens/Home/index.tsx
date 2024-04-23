import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
  Pressable,
} from 'react-native';

const DATA = [
  {
    title: 'Testes básicos',
    data: ['Login'],
  },
  {
    title: 'Testes de compatibilidade',
    data: [],
  },
  {
    title: 'Testes de sistema',
    data: [],
  },
];

const Home = () => {
  const navigation = useNavigation<any>();

  const handleItemSelected = (item: string) => {
    navigation.navigate(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Pressable
            style={styles.item}
            onPress={() => {
              handleItemSelected(item);
            }}>
            <Text style={styles.title}>{item}</Text>
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
});

export default Home;

import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import {View} from 'react-native';
import {api} from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Note = {
  id: number;
  title: string;
  description: string;
  pinned: boolean;
  createdAt: string;
};

type Section = {
  title: string;
  data: Note[];
};

const Home = () => {
  const navigation = useNavigation<any>();

  const [sectionListData, setSectionListData] = useState<Section[]>([]);

  const handleItemSelected = (item: Note) => {
    navigation.navigate('NewNote', item);
  };

  useEffect(() => {
    navigation.addListener('focus', getNotes);
  }, [navigation]);

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
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
      )}
      <View style={styles.fabContainer}>
        <FloatingActionButton
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
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default Home;

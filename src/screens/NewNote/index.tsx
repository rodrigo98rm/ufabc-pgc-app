import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const NewNote = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View>
      <TextInput style={styles.title} placeholder="Título" />
      <TextInput style={styles.description} multiline placeholder="Descrição" />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Salvar" onPress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  description: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default NewNote;

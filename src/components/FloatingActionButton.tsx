import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingActionButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name="plus" size={32} color="#fff" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FloatingActionButton;

import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './Styles';

const GiphyItem = ({item, onItemClick, toggleFav}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.images['480w_still'].url}}
        style={styles.thumbnail}
      />
      <View style={styles.textContainer} onTouchEnd={() => onItemClick(item)}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.favorite} onPress={() => toggleFav(item)}>
        {item.isFavorited ? (
          <Image
            source={require('./../../assets/imgs/heart_fill.png')}
            style={styles.fav}
          />
        ) : (
          <Image
            source={require('./../../assets/imgs/heart_outline.png')}
            style={styles.fav}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GiphyItem;

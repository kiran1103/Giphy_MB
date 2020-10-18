import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './Styles';

const Details = (props) => {
  const item = props.route.params.item;

  useEffect(() => {
    props.navigation.setOptions({
      title: item.username ? item.username : 'Detail',
    });
  }, [item.username, props.navigation]);

  const navigateBack = (giphy) => {
    const {navigation, route} = props;
    navigation.goBack();
    route.params.onSelect({giphy});
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.gif}
        source={{uri: item.images.fixed_width.url}}
        resizeMode="contain"
      />
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => navigateBack(item)}>
        <Text>
          {item.isFavorited ? 'Remove from Favorite' : 'Add To Favorite'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;

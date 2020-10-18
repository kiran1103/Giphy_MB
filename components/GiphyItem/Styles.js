import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderColor: '#eaeaea',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  thumbnail: {
    width: 50,
    height: 50,
    flex: 2,
  },
  textContainer: {
    marginHorizontal: 5,
    justifyContent: 'center',
    flex: 6,
  },
  username: {
    fontSize: 14,
  },
  title: {
    fontSize: 10,
    color: 'gray',
  },
  favorite: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 10,
  },
  fav: {
    width: 25,
    height: 25,
  },
});

export default styles;

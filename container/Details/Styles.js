import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'flex-start',
  },
  gif: {
    width: 300,
    height: 500,
    borderColor: 'white',
    borderWidth: 1,
  },
  username: {
    fontSize: 24,
    marginVertical: 5,
  },
  title: {
    color: 'gray',
  },
  favBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 4,
  },
});

export default styles;

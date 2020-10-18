import React from 'react';
import {TextInput} from 'react-native';

const Search = (props) => {
  return (
    <TextInput
      placeholder="Type username..."
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 15,
        paddingHorizontal: 12,
        height: 50,
        marginVertical: 5,
      }}
      onChangeText={(text) => props.onSearch(text)}
    />
  );
};

export default Search;

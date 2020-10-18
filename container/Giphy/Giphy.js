import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, SafeAreaView} from 'react-native';
import styles from './Styles';
import GiphyItem from './../../components/GiphyItem/GiphyItem';
import axios from 'axios';
import config from './../../config';
import Search from './../../components/Search/Search';

class Giphy extends Component {
  state = {
    giphys: [],
    allGiphys: [],
    loading: true,
    offset: 0,
    loadingMore: false,
    searching: false,
  };

  componentDidMount() {
    this.loadGiphys();
  }

  onSelect = ({giphy}) => {
    this.onToggleFavHandler(giphy);
  };

  loadGiphys = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${config.GIPHY_KEY}&limit=20&offset=${this.state.offset}&rating=g`,
      )
      .then((response) => {
        let resData = response.data.data.map((item) => {
          return {...item, isFavorited: false};
        });

        this.setState(
          (prevState, nextProps) => ({
            giphys: [...this.state.giphys, ...resData],
            allGiphys: [...this.state.giphys, ...resData],
            loading: false,
          }),
          () => {
            console.log(this.state.giphys);
          },
        );
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        console.warn('Error occrured', err);
      });
  };

  onItemClickHandler = (item) => {
    this.props.navigation.navigate('Details', {
      item: item,
      onSelect: this.onSelect,
    });
  };

  onToggleFavHandler = (item) => {
    let newGiphys = [...this.state.giphys];
    let index = newGiphys.findIndex((giphy) => giphy.id === item.id);
    newGiphys[index].isFavorited = !newGiphys[index].isFavorited;
    let maxFavorites = this.checkMaxFavorite(newGiphys);
    if (maxFavorites > 5) {
      newGiphys[index].isFavorited = !newGiphys[index].isFavorited;
      alert('Maximum 5 favorites are allowed');
    } else {
      this.setState(
        {
          giphys: newGiphys,
        },
        () => {
          this.storeToFirebase();
        },
      );
    }
  };

  storeToFirebase = () => {
    axios.put(
      'https://giphy-f3880.firebaseio.com/giphys.json',
      this.state.giphys,
    );
  };

  checkMaxFavorite = (giphys) => {
    return giphys.reduce((accum, giphy) => {
      if (giphy.isFavorited) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0);
  };

  renderItem = ({item}) => {
    return (
      <GiphyItem
        onItemClick={this.onItemClickHandler}
        item={item}
        toggleFav={this.onToggleFavHandler}
      />
    );
  };

  _handleLoadMore = () => {
    if (this.state.searching) {
      return null;
    }
    this.setState(
      (prevState, nextProps) => ({
        offset: prevState.offset + 20,
        loadingMore: true,
      }),
      () => {
        this.loadGiphys();
      },
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }
    return (
      <View style={{marginVertical: 10}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };

  onSeachTermHandler = (term) => {
    const newData = this.state.giphys.filter((item) => {
      const itemData = `${item.username.toUpperCase()}`;
      const textData = term.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (!term) {
      this.setState({
        giphys: this.state.allGiphys,
        loadingMore: false,
        searching: false,
      });
    } else {
      this.setState({giphys: newData, searching: true});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <View>
              <Search onSearch={this.onSeachTermHandler} />
              <FlatList
                data={this.state.giphys}
                renderItem={(item) => this.renderItem(item)}
                keyExtractor={(item) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this._renderFooter}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default Giphy;

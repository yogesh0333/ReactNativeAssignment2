import React, {Component} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DisplayData from './DisplayData';

export default class FetchData extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      responseList: [],
      fetchingStatus: false,
      setOnLoad: false,
    };
    this.page = -1;
  }

  componentDidMount() {
    this.apiCall();
  }
  apiCall = () => {
    var that = this;
    that.page = that.page + 1;

    that.setState({fetching_Status: true});
    fetch(
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' +
        that.page,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        that.setState({
          responseList: [...this.state.responseList, ...responseJson.hits],
          isLoading: false,
          setOnLoad: true,
        });
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
        that.setState({setOnLoad: false, fetching_Status: false});
      });
  };
  footer = () => {
    return (
      <View style={styles.bottomLoader}>
        {this.state.fetchingStatus ? (
          <ActivityIndicator size="large" color="#6CD0FA" />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <ActivityIndicator size={100} color="#6CD0FA" style={styles.loader} />
        ) : (
          <FlatList
            style={{width: '100%'}}
            keyExtractor={(item, index) => index}
            data={this.state.responseList}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              this.apiCall();
            }}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity>
                  <View style={styles.viewStyle}>
                    <DisplayData
                      title={item.title}
                      URL={item.URL}
                      created_at={item.created_at}
                      author={item.author}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={true}
            ListFooterComponent={this.footer}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

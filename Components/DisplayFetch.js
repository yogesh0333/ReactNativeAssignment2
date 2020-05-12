import React, {Component} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import DataTable from './DataTable';

export default class DisplayFetch extends Component {
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
    this._interval = setInterval(() => {
      this.apiCall();
    }, 10000);
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
    const state = this.state;
    return (
      <View style={styles.container}>
        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.title} style={styles.head} textStyle={styles.text} />
        </Table> */}
        {this.state.isLoading ? (
          <View style={styles.bottomLoader}>
            <ActivityIndicator
              size={100}
              color="#6CD0FA"
              style={styles.loader}
            />
          </View>
        ) : (
          <FlatList
            style={{width: '100%'}}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.responseList}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('DataDisplay', {
                      data: item,
                    });
                  }}>
                  <View style={styles.viewStyle}>
                    <DataTable
                      title={item.title}
                      URL={item.url}
                      created_at={item.created_at}
                      author={item.author}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomLoader: {
    marginTop: '70%',
  },
  container: {backgroundColor: '#f2f2f2'},
});

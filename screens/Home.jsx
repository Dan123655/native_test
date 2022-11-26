// import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {Text, View,Alert,FlatList,ActivityIndicator,RefreshControl,TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import React from 'react';

export const HomeScreen = ({navigation})=> {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchPosts = () => {
    setIsLoading(true)

    axios
      .get('https://638132cd9440b61b0d13dc39.mockapi.io/articles/articles')

      .then(({ data }) => { setItems(data) })

      .catch((err) => {
        console.log(err);
        Alert.alert('Alert! cant retrive articles')
      })
      .finally(() => {
        setIsLoading(false)
      })
  };
  React.useEffect(fetchPosts, []);
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }}>
      <ActivityIndicator size='large' />
      <Text>Loading...</Text>

    </View>)
  }
  return (
   
    <View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchPosts}
          />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('FullPost',{id:item.id,title:item.title})}>
          <Post
            title={item.title}
            imageUrl={item.imageUrl}
            text={item.text}
              createdAt={item.createdAt} />
          </TouchableOpacity>)}
      />
      {/* <StatusBar hidden={false} style='auto' /> */}
      </View>
   
  );
}


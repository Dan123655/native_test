import React from 'react'
import axios from 'axios'
import { View,Alert } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';
const PostImage = styled.Image`
border-radius:10px;
width:100%;
height:250px;
matgin-bottom:20px;
`;
const PostText = styled.Text`
font-size:18px;
line-height:24px;`

export const FullPostScreen = ({route,navigation}) => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { id, title } = route.params;
    console.log(route)
    React.useEffect(() => {
        navigation.setOptions({
            title
        })
        axios
        .get('https://638132cd9440b61b0d13dc39.mockapi.io/articles/articles/' + id)
  
        .then(({ data }) => { setData(data) })
  
        .catch((err) => {
          console.log(err);
          Alert.alert('Alert! cant read article')
        })
        .finally(() => {
          setIsLoading(false)
        }) 
    }, []);
    if (isLoading) {
        return (
            <View style={{
                flex:1,
            }}>
                <Loading />
                </View>
)
      }
  return (
      <View
          style={{
          padding:20
      }}><PostImage
          source={{
          uri:data.imageUrl
          }} />
          <PostText
 >
            {data.text}
          </PostText>
      </View>
  )
}


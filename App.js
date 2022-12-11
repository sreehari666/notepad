import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
  <View style={styles.separator} />
);


export default function App() {
  const [task,setTask] = useState(null)

  const add = async()=>{
    try{
      console.log(task)
      if(task != null){
        await AsyncStorage.setItem('note',task)
        ToastAndroid.show('Task added', ToastAndroid.SHORT);
       
      }
    }catch(e){
      console.error(e)
    }
  }

  const get = async()=>{
    try{
      const value = await AsyncStorage.getItem('note')
      if(value != null){
        setTask(value)
      }
    }catch(e){
      console.error(e)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task}</Text>
      <TextInput onChangeText={e=>setTask(e)} style = {styles.input} placeholder = "Enter task" />
      <Separator />
      <Button onPress={add} title='Add' />
      <Separator />
      <Button onPress={get} title='Get' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:'80%',
    height:50,
    borderWidth:1,
    borderColor:'#00000',
    margin:10,
    paddingLeft:20,
    borderRadius:5,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
  }
});

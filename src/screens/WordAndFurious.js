import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'

import UserContext from '../core/User'
import { useContext, useEffect } from 'react'
import { SocketContext} from '../core/Socket'
import { Modal, Text, Pressable, StyleSheet, View, Alert } from "react-native"

export default function WordAndFurious({ navigation }) {
  const [key, setKey] = useState('')
  const [keyToSpam, setKeyToSpam] = useState('')
  const {user} = useContext(UserContext)
  const socket = useContext(SocketContext)



  const Send = (text) => {
    console.log(text)
    socket.emit('key',{ username : user.name.text, key: text})
  }
  //UseEffect called only on load, to get the word to type
  useEffect(() => {    
    socket.emit('newClient',{user:user.name.text})
  },[])
  //Use effect called on every render
  useEffect(() => {
    const keyListener = msg => {
      setKeyToSpam(msg.key)
    }
    const gameOverListener = msg => {
      console.log(`game won by ${msg.username}`)
      Alert.alert(
          `Game won by ${msg.username}`,
          `Leaderboard : \n
          ${Object.entries(msg.scoreboard).map(([key, value])=> {
              return(`${key} : ${value} points`)
          })}`,
          [
              {
                  text: "Cancel",
                  onPress: () => console.log("cancel pressed"),
              },
              {
                  text: "OK",
                  onPress: () => console.log("ok pressed")
              }
          ]
      )
    }
  const timeOverListener = msg => {
    console.log(`Round won by ${msg.username}`)
    Alert.alert(
        `Game won by ${msg.username}`,
        `Leaderboard : \n
        ${Object.entries(msg.scorenoard).map(([key, value])=> {
            return(`${key} : ${value} points`)
        })}`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("cancel pressed"),
            },
            {
                text: "OK",
                onPress: () => console.log("ok pressed")
            }
        ]
    )
  }
  
    socket.on('keyOver',gameOverListener)
    socket.on('timeOver',timeOverListener)
    socket.on('keyToSpam',keyListener)
    return () => {
      socket.off('keyToSpam',keyListener)
      
      socket.off('wordgameover', gameOverListener)
    }
  })
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Quickly type the word :{"\n"}</Header>
        <Header>{keyToSpam}</Header>
        <TextInput
            returnKeyType="next"
            keyboardType = 'default'
            value={key}
            onChangeText={(text) => Send(text)}
            autoCapitalize="none"
        />
        <Header>{user.name.text}</Header>
    </Background>
  )
}
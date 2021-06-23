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

export default function QuickWord({ navigation }) {
  const [word, setWord] = useState('')
  const [wordToType, setWordToType] = useState('')
  const {user} = useContext(UserContext)
  const socket = useContext(SocketContext)



  const onSendPressed = () => {
    socket.emit('word',{ username : user.name.text, word: word})
    setWord('')
  }
  //UseEffect called only on load, to get the word to type
  useEffect(() => {    
    socket.emit('newPlayer',{user:user.name.text})
  },[])
  //Use effect called on every render
  useEffect(() => {
    const wordListener = msg => {
      setWordToType(msg.randomWord)
    }
    socket.on('wordToType',wordListener)
    return () => {
      socket.off('wordToType', wordListener)
    }
  })
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Quickly type the word :{"\n"}</Header>
        <Header>{wordToType}</Header>
        <TextInput
            label={word}
            returnKeyType="next"
            keyboardType = 'numeric'
            value={word}
            onChangeText={(text) => setWord(text)}
            autoCapitalize="none"
        />
      <Button mode="contained" onPress={onSendPressed}>
            Send
        </Button>
        <Header>{user.name.text}</Header>
    </Background>
  )
}
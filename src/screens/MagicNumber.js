import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import {io} from "socket.io-client"
import UserContext from '../core/User'
import { useContext, Text } from 'react'
import { SocketContext} from '../core/Socket'


export default function MagicNumber({ navigation }) {    
    const [number, setNumber] = useState({ value: '', error: '' })
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext)

    const onSendPressed = () => {
        setNumber({ ...number})
        console.log(number.value)
        socket.emit('number',{ username : user.name.text, number: number.value})
    }
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Find the random number between 0 and 1337</Header>
        <TextInput
            label="Number"
            returnKeyType="next"
            value={number.value}
            onChangeText={(text) => setNumber({ value: text, error: '' })}
            autoCapitalize="none"
        />
        <Button mode="contained" onPress={onSendPressed}>
            Send
        </Button>
        <Header>{user.name.text}</Header>
    </Background>
  )
}
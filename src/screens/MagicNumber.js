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
import { useContext, useEffect } from 'react'
import { SocketContext} from '../core/Socket'
import { Modal, Text, Pressable, StyleSheet, View, Alert } from "react-native"


export default function MagicNumber({ navigation }) {    
    const [number, setNumber] = useState({ value: '', error: '' })
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext)

    const AlertVictory = () => {
        Alert.alert(
            "Nombre trouvé ",
            "",
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

    const AlertGameOver = () => {
        Alert.alert(
            "Alert title",
            "Alert msg",
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

    const onSendPressed = () => {
        setNumber({ ...number})
        console.log(number.value)
        socket.emit('number',{ username : user.name.text, number: number.value})
    }
    useEffect(() => {
        socket.once('victory',msg => {
            console.log(`number : ${msg.number} found by user : ${msg.username}`)
            AlertVictory()
            //Popup saying who found the number (msg.username) and the number (msg.number)
        })
        socket.once('gameOver', msg => {
            AlertGameOver
            //Render new screen, with un tableau des scores (msg)
        })
    })
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Find the random number between 0 and 1337</Header>
        <TextInput
            label="Number"
            returnKeyType="next"
            keyboardType = 'numeric'
            value={number.value}
            onChangeText={(text) => setNumber({ value: text, error: '' })}
            autoCapitalize="none"
        />
        <Button mode="contained" onPress={onSendPressed}>
            Send
        </Button>
        <Header>{user.name.text}</Header>
        <Button
        onPress={AlertVictory}
        >
            Victoire
        </Button>
        <Button
        onPress={AlertGameOver}
        >
            Game Over
        </Button>
    </Background>
  )
}


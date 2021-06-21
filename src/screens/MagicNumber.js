import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'



export default function MagicNumber({ navigation }) {
    const [number, setNumber] = useState({ value: '', error: '' })


    const onSendPressed = () => {
        setNumber({ ...number})
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
    </Background>
  )
}
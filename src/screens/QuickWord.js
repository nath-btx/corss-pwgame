import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'


export default function MagicNumber({ navigation }) {
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Quick Word</Header>
        
    </Background>
  )
}
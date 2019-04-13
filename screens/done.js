import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { WebBrowser } from 'expo'
import AppNavigator from '../navigator/appNavigator'
import Styles from '../assets/styles'
import {Button} from 'native-base'

export default class Done extends React.Component {

  render() {
    return (
    <View style={Styles.home_Hunt}>
      <Text style={Styles.done}> Done! </Text>
      <Text style={Styles.endTime}> End Time: </Text>
      <Button danger block large onPress={() => this.props.navigation.navigate('Home')} style={Styles.button}>
        <Text style={Styles.buttonText}> Back to Home </Text>
      </Button>
    </View>
     )
   }
 }

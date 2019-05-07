import React from 'react'
import { Alert, AsyncStorage, Image, Text, View } from 'react-native'
import AppNavigator from '../navigator/appNavigator'
import Styles from '../assets/styles'
import Photos from '../photos.json'
import { Button } from 'native-base'
import { Icon } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export var hunt

export var setHunt = (choice) => {hunt = choice}

export default class Hunt extends React.Component {

  constructor() {
    super()
    let photos = require('../photos.json')
    let icons = photos.map((hunt) => {
      this.getIcon(hunt.huntName).then((completed) => {
        this.updateIcon(hunt.huntName, completed)
      })
      return { huntName: hunt.huntName, completed: '' }
    })
    this.state = {
      photos,
      icons
    }
  }

  updateIcon(huntName, completed) {
    let icons = this.state.icons
    for (var hunt of icons) {
      if (hunt.huntName === huntName) {
        hunt.completed = completed
      }
    }
    this.setState({ icons })
  }

  async getIcon(key) {
    try {
      let value = await AsyncStorage.getItem(key)
      if (value != null) {
        return true
      }
      else {
        return false
      }
    }
    catch (error) {
      return '??'
    }
  }

  componentWillMount() {
    this.forceUpdate()
  }

  componentDidMount() {
    this.props.navigation.setParams({ toScores: this.toScores })
  }

  setHunt(name) {
    for (var hunt of this.state.photos) {
      if (hunt.huntName === name) {
        setHunt(hunt)
      }
    }
    this.props.navigation.navigate('Instructions')
  }

  backToHome = () => {
    Alert.alert(
      "Are you Sure?",
      "Your game will be lost",
      [
        { text: 'Cancel' },
        { text: 'End Game', onPress: () => {this.props.navigation.navigate('Hunt')} }
      ]
    )
  }

  toScores = () => {
    this.props.navigation.navigate('HighScores')
  }

  render() {

    let hunts = this.state.icons.map(hunt => (
      <Button block success style={Styles.huntButton} onPress={() => this.setHunt(hunt.huntName)} key={hunt.huntName}>
        <Icon name={hunt.completed ? 'check-box' : 'check-box-outline-blank'} color='white' iconStyle={{ marginLeft: 20, marginRight: 10}}/>
        <Text style={Styles.buttonText}> {hunt.huntName} </Text>
      </Button>
      )
    )

    return (
      <View style={{flex: 1, backgroundColor: '#B5E1E2'}}>
        <View style={Styles.huntScreen}>
            {hunts}
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={{position: 'absolute', bottom: '0%', width: wp('100%'), height: hp('35%')}}
                source={{ uri: 'https://res.cloudinary.com/lirvin/image/upload/v1556311054/college.jpg'}}>
          </Image>
        </View>
      </View>
    )
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#B5E1E2' },
      headerRight: (<Icon name="list" iconStyle={{ paddingHorizontal: 15 }} underlayColor='#B5E1E2' onPress={navigation.getParam('toScores')}/>),
      headerStyle: { backgroundColor: '#B5E1E2' },
      headerTitleStyle: {textAlign: 'center', width: '105%'}
      }
    }
  }

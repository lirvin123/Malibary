import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from '../screens/main'
import Riddle from '../screens/riddle'
import { photoIndex } from '../screens/riddle'
import Hunt from '../screens/hunt'
import Done from '../screens/done'
import Instructions from '../screens/instructions'
import HighScores from '../screens/highScores'
import { Icon } from 'react-native-elements'

const MainStack = createStackNavigator({
    Main: { screen: Main, navigationOptions: { gesturesEnabled: false, headerLeft: null, headerBackTitle: "Back" }},
    Riddle: { screen: Riddle},
    Done: { screen: Done, navigationOptions: { header: null, gesturesEnabled: false }}
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
)

const Home = createStackNavigator({
    Hunt: { screen: Hunt, navigationOptions: { title: "Select a Hunt:", headerBackTitle: "Back" }},
    Instructions : { screen: Instructions, navigationOptions: { headerBackTitle: "Back"} }
})

const Scores = createStackNavigator({
    HighScores: { screen: HighScores }
})

const AppNavigator = createStackNavigator(
  {
    Hunt: { screen: Home },
    HighScores: { screen: Scores },
    Main: { screen: MainStack }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const App = createAppContainer(AppNavigator)

export default App

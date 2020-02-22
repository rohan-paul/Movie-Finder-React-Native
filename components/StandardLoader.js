import React from 'react'
import { View, Image, Text } from 'react-native'
import HelperCard from './HelperCard'
import constants from './constants'
import LottieView from 'lottie-react-native'
import {
  convert_width as cw,
  convert_height as ch,
} from '../UtilsFunctions/UtilFunctions'

export default class StandardLoader extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <HelperCard
            title={this.props.title}
            data={this.props.data}
            headingStyle="h1"
          />
        </View>

        <View style={{ flex: 9, alignItems: 'center', paddingTop: ch(70) }}>
          <LottieView
            source={require('../assets/lottie/loading-plane.json')}
            style={{
              flex: 1,
              height: ch(600),
              transform: [{ scale: cw(2.4) }],
            }}
            autoPlay={true}
            loop={true}
          />
          <Text
            style={{
              flex: 6,
              marginTop: ch(130),
              textAlign: 'center',
              fontFamily: 'NunitoSans-Regular',
              color: constants().BLACK,
              opacity: 0.7,
              width: '80%',
            }}
          >
            Hold on till we fetch the report for you. This usually takes 3-4
            seconds.
          </Text>
        </View>
      </View>
    )
  }
}

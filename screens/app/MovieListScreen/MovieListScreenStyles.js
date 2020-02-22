import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../../UtilsFunctions/UtilFunctions'
import constants from '../../../components/constants'

export default StyleSheet.create({
  welcometext: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: cf(28),
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 0,
    color: constants().GLOBAL_BLUE,
  },
  makepayment: {
    fontSize: cf(18),
    fontWeight: '600',
    lineHeight: ch(36),
    textAlign: 'left',
    letterSpacing: 0,
    color: constants().CLOUD_TEXT,
  },
  paymentreminder: {
    fontFamily: 'NunitoSans-Regular',
    alignSelf: 'flex-start',
    fontSize: cf(20),
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 0,
    color: constants().CLOUD_TEXT,
  },
  donthavereminder: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: cf(12),
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 0,
    color: constants().CLOUD_TEXT,
  },
})

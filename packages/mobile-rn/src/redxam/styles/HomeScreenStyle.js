import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../utils/Variables';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden'
  },
  logoStyle: {
    width: width,
    resizeMode: 'cover',
    height: width/3

  },
footerimage: {
    width: 60,
    resizeMode: 'contain',
    height: 60
  },
  headercard: {
    padding: 20,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc'
  },
  rowdirection: {
    flexDirection: 'row'
  },
  user: {
    padding: 15,
  },
  name: {
    fontSize : 16,
    fontWeight: '400',
    color: '#2A3037',
    opacity: 0.5,
  },
  money: {
    fontWeight: '700',
    fontSize: 31,
    color: colors.black
  },
  cardstripe: {
    backgroundColor: '#FAFAFA',
    padding: 5,
    marginVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection : 'row',
    justifyContent: 'center'
  }
});
export default styles;

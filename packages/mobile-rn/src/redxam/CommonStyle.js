import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from './utils/Variables';
const {width, height} = Dimensions.get('window');

const commonestyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  rowdirection: {
    flexDirection: 'row',
  },
  headingtext: {
    color: colors.black,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  blackicon: {
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 20,
  },
  refferbackground: {
    width: '100%',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  cardborder: {
    borderRadius: 25,
    backgroundColor: colors.white,
    width: '100%',
    marginVertical: 10,
    shadowColor: 'rgba(61, 88, 11, 0.08)',
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 1,
    elevation: 5,
  },
  header: {
    height: 70,
    backgroundColor: colors.primaryGreen,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    elevation: 3,
    padding: 10,
    paddingTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headertext: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    padding: 5,
    textTransform: 'uppercase',
  },
  body: {
    padding: 15,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.85)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    padding: 40,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 120,
  },
});
export default commonestyles;

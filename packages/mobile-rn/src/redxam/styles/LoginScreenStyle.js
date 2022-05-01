import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../utils/Variables';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  content: {
    padding: 40,
  },
  remtop: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#65bf15',
  },
  rows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
  },
  registerTextStyle2: {
    color: '#5dc204',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
});
export default styles;

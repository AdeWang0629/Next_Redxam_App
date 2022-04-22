import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../utils/Variables';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  logoStyle: {
    width: width,
    resizeMode: 'stretch',
    height: width/2-21
  },
  iconrowlist: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 50
  },
  imagefull: {
    width: '100%',
    resizeMode: 'stretch',
  },
  statusBar: {
    height: 44,
  },
  headertab: {
      backgroundColor: colors.white,
      height: 40,
      borderColor: colors.gray,
      borderWidth: 0.3,
      borderRadius: 30,
      flexDirection: 'row'
  },
  activetab: {
    width : '33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 30,
  },
  singletab: {
      width : '33%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  darktext: {
    color: '#2A3037',
    fontSize: 14,
    fontWeight: '500'
  },
  lighttext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  kyctest: {
      paddingHorizontal: 10,
      paddingVertical: 50
  },
  kyctext: {
      color: colors.black,
      padding: 20,
      textAlign: 'center'
  },
  buttontext: {
    color: colors.white,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
  button: {
    backgroundColor: colors.primaryGreen,
    marginHorizontal: '10%',
    padding: 13,
    borderRadius: 30
  },
  footerimage: {
      width: 60,
      resizeMode: 'contain',
      height: 60
  },
  photoimage: {
    width: 200,
  },
  madelimage: {
    width: 40,
    height: 40,
    margin: 10,
    marginLeft:50,
},
madelimage1: {
  width: 40,
  height: 40,
  margin: 10,
  marginLeft:30,
},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  DatacenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginTop: 22,
  },
  DatamodalView: {
    margin: 20,
    width: width-40,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView: {
    margin: 20,
    width: width,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
      paddingHorizontal: 30,
    backgroundColor: colors.primaryGreen,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textdarkStyle: {
    color: "black",
    textAlign: "center",
    paddingVertical: 12
  },
  icontext: {
    textAlign: "center",
    paddingVertical: 12
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'blue'
  },
  modaltextfont: {
    color: colors.black,
    textAlign: 'center'
  },
  continueonphone: {
    color: colors.blue,
    paddingTop: 20,
    textDecorationLine: 'underline'
  },
  headercard: {
      padding: 20,
      borderBottomWidth: 0.4,
      borderBottomColor: '#ccc'
  },
  headertextcard : {fontSize: 20, fontWeight: '500'},
  listtext: {paddingVertical: 5},
  simpletext: {fontSize: 14, color: '#95989B', marginTop: 20},
  TranslucentView: {
    margin: 20,
    width: width-40,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  madels: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#98A3AA',
    borderTopWidth: 0.4,
    borderTopColor: '#98A3AA',
    borderLeftWidth: 0.4,
    borderLeftColor: '#98A3AA',
    borderRightWidth: 0.4,
    borderRightColor: '#98A3AA',
    borderRadius: 20,
    height: '18%',
    width: '85%',
    padding:10,
    top:10,

  },
  madels1: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#98A3AA',
    borderTopWidth: 0.4,
    borderTopColor: '#98A3AA',
    borderLeftWidth: 0.4,
    borderLeftColor: '#98A3AA',
    borderRightWidth: 0.4,
    borderRightColor: '#98A3AA',
    borderRadius: 20,
    height: '14%',
    width: '85%',
    padding:10,

  },
  modelamount: {
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0.4,
    borderBottomColor: '#FAFAFA',
    borderTopWidth: 0.4,
    borderTopColor: '#FAFAFA',
    borderLeftWidth: 0.4,
    borderLeftColor: '#FAFAFA',
    borderRightWidth: 0.4,
    borderRightColor: '#FAFAFA',
    borderRadius: 20,
    height: '25%',
    width: '85%',
    padding:10,
    top:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingbutton: {
      padding: 30
  },
  inputspan: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
  },
  dropdowntext: {
    fontWeight: '500',
    fontSize: 15,
    padding: 8,
    width: '80%'
  },
  dropdowntextfull: {
    fontWeight: '500',
    fontSize: 15,
    padding: 8,
    width: '90%'
  },
  dropdowntextfulls: {
    fontWeight: '500',
    fontSize: 15,
    paddingVertical: 8,
    width: '90%'
  }
});
export default styles;

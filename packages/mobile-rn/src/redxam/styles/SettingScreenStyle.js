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
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
      },
      buttonStyle: {
        borderWidth: 1,
        color: 'black',
        borderColor: '#dbd7d7',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 60,
        marginBottom: 25,
      },
      buttonTextStyle: {
        color: 'black',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight:'bold',
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
      rows:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:50,
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
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        padding: 10,
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
    });
    export default styles;
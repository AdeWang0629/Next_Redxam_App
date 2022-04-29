import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonStylePrimary: {
    backgroundColor: '#272B22',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 25,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  buttonTextStylePrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    textTransform: 'uppercase',
  },
});

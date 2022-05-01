import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 40,
    paddingTop: 100,
  },
  titleText: {
    color: '#fff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#fff',
  },
});

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 40,
  },
  titleText: {
    color: '#000',
    fontSize: 35,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  buttonText: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonSize: {
    width: '80%',
  },
  blurContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    marginBottom: 40,
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  blurBox: {
    borderRadius: 20,
    position: 'absolute',
    height: 150,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 20,
  },
  blurFirstText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  blurLastText: {
    fontSize: 15,
  },
  level: {
    marginLeft: 10,
    color: '#5EB12F',
    fontSize: 40,
    fontWeight: 'bold',
  },
  th: {
    color: '#5EB12F',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  homeText: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

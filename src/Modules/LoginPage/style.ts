import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: height * 0.03,
    },
    heading: {
      fontSize: 50,
      alignSelf: 'center',
    },
    textInput: {
      marginVertical: height * 0.0188,
      width: isPortrait?width*0.8:height*0.5,
      alignSelf: 'center',
    },
    button: {
      alignSelf: 'center',
      width: 100,
      alignItems: 'center',
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
    },
    buttonText: {
      padding: height * 0.0125,
      color: ColorPalette.white,
      fontSize: 18,
    },
    lastViewContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: height * 0.0125,
    },
    greenUnderlinetext: {
      color: ColorPalette.green,
      textDecorationLine: 'underline',
    },
    selfAlignCenter: {
      alignSelf: 'center',
    },
  });

export default styles;

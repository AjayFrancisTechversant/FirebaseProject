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
    container: {padding: height * 0.02, flex: 1},
    heading: {
      fontSize: 20,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    AddBookButtonStyle: {
      position: 'absolute',
      bottom: height * 0.03,
      right: height * 0.03,
    },
  });

export default styles;

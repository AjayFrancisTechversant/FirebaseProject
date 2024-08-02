import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Contexts/ScreenContext';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    container: {padding: height * 0.02, flex: 1},
    detailsContainer: {
      backgroundColor: 'orange',
      borderRadius: 10,
      padding: height * 0.01,
      alignSelf: 'center',
      width: width * 0.5,
      height: isPortrait ? height * 0.5 : width * 0.5,
    },
  });

export default styles;

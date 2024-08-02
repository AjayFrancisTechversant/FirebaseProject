import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const HomeScreen = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  ); //the height and width that are passed are permanent height and width of the device's window irrespective of screen orientation. So the height and width of the ui elements doesnt get changed if device rotated(only if the style if given according to the height or width of the device)

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.detailsContainer}>
        <Text>height:{screenContext.height}</Text>
        <Text>width:{screenContext.width}</Text>
        <Text>scale:{screenContext.scale}</Text>
        <Text>fontScale:{screenContext.fontScale}</Text>
        <Text>isPortrait:{screenContext.isPortrait ? 'true' : 'false'}</Text>
        <Text>isTablet:{screenContext.isTypeTablet ? 'true' : 'false'}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

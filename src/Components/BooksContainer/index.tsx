import {View, Text, VirtualizedList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {Booktype} from '../../Modules/Firestore';
import BookCard from '../BookCard';
import styles from './style';
import {TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';

type BooksContainerPropsType = {
  books: Booktype[];
};

const BooksContainer: React.FC<BooksContainerPropsType> = ({books}) => {
  const emptyComponent = () => {
    return (
      <View style={screenStyles.emptyComponentContainer}>
        <Text style={screenStyles.emptyComponentText}> No Books :(</Text>
      </View>
    );
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <View style={[screenStyles.commentsContainer]}>
      <VirtualizedList
        data={books}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({item}) => <BookCard book={item} />}
        ListEmptyComponent={emptyComponent}
        ListHeaderComponent={<View style={screenStyles.separator}></View>}
        ListFooterComponent={<View style={screenStyles.separator}></View>}
        keyExtractor={item => Math.random().toString(36).substring(2)}
        initialNumToRender={10}
        persistentScrollbar
        maxToRenderPerBatch={20}
        windowSize={11}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default React.memo(BooksContainer);

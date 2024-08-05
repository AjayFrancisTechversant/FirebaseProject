import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import StaticVariables from '../../Preferences/StaticVariables';

import AddBookButton from '../../Components/AddBookButton';
import BooksContainer from '../../Components/BooksContainer';
import {TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';

export type Booktype = {
  title: string;
  desc: string;
  id?: string;
};

const Firestore = () => {
  const [books, setBooks] = useState<Booktype[]>(StaticVariables.EMPTY_ARRAY);
  const userId = auth().currentUser?.uid;
  const [searchText, setSearchText] = useState(StaticVariables.EMPTY_STRING);
  const [searchResultBooks, setSearchResultBooks] = useState<Booktype[]>(
    StaticVariables.EMPTY_ARRAY,
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection(`users/${userId}/Books`)
      .onSnapshot(
        documentSnapshot => {
          const books: Booktype[] = [];
          documentSnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            books.push({
              id: documentSnapshot.id,
              title: data.title,
              desc: data.desc,
            });
          });
          setBooks(books);
        },
        error => {
          console.error('Error fetching books: ', error);
        },
      );
    return () => subscriber();
  }, [userId]);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSearch = (text: string) => {
    setSearchText(text);

    firestore()
      .collection(`users/${userId}/Books`)
      .where('title', '>=', text)
      .where('title', '<=', text + '\uf8ff')
      .get()
      .then(querySnapshot => {
        const searchedBooks: Booktype[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          searchedBooks.push({
            id: doc.id,
            title: data.title,
            desc: data.desc,
          });
        });
        setSearchResultBooks(searchedBooks);
      })
      .catch(error => {
        console.error('Error searching books: ', error);
      });
  };

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.heading}>Books FireStore</Text>
      <TextInput
        value={searchText}
        onChangeText={handleSearch}
        mode="outlined"
        label="Search"
        selectionColor={ColorPalette.lightOrange}
        underlineColor={ColorPalette.lightOrange}
        activeUnderlineColor={ColorPalette.lightOrange}
        outlineColor={ColorPalette.lightOrange}
        activeOutlineColor={ColorPalette.lightOrange}
      />
      <BooksContainer books={searchText == '' ? books : searchResultBooks} />
      <View style={screenStyles.AddBookButtonStyle}>
        <AddBookButton />
      </View>
    </View>
  );
};

export default Firestore;

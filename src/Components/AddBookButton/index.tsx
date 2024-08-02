import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {Booktype} from '../../Modules/Firestore';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

type AddBookButtonPropsType = {};

const AddBookButton: React.FC<AddBookButtonPropsType> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBook, setNewBook] = useState<Booktype>({
    title: StaticVariables.EMPTY_STRING,
    desc: StaticVariables.EMPTY_STRING,
  });
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0);
  const userId = auth().currentUser?.uid;
  const openModal = () => {
    setIsModalVisible(true);
    modalOpacity.value = withSpring(1);
    modalScale.value = withSpring(1);
  };
  const closeModal = () => {
    modalOpacity.value = withSpring(0);
    modalScale.value = withSpring(0);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
      transform: [{scale: modalScale.value}],
    };
  });

  const handlePlusButton = () => {
    openModal();
  };
  const handlePostButton = () => {
    handleAddBook(newBook);
    setNewBook({
      title: StaticVariables.EMPTY_STRING,
      desc: StaticVariables.EMPTY_STRING,
    });
    closeModal();
  };
  const handleCancel = () => {
    setNewBook({
      title: StaticVariables.EMPTY_STRING,
      desc: StaticVariables.EMPTY_STRING,
    });
    closeModal();
  };
  const handleAddBook = (newBook: Booktype) => {
    firestore()
      .collection(`users/${userId}/Books`)
      .add(newBook)
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
    <>
      <TouchableOpacity onPress={handlePlusButton}>
        <Entypo name="plus" color={ColorPalette.lightOrange} size={50} />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={() => closeModal()}>
        <View style={screenStyles.modalFullScreenBackground}>
          <Animated.View
            style={[screenStyles.modalCommentContainer, animatedStyle]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={() => closeModal()}>
              <FontAwesome name="close" size={30} />
            </TouchableOpacity>
            <Text style={screenStyles.commentTitle}>Add Book</Text>
            <TextInput
              value={newBook.title}
              onChangeText={e => setNewBook({...newBook, title: e})}
              mode="outlined"
              label="Title"
              selectionColor={ColorPalette.lightOrange}
              underlineColor={ColorPalette.lightOrange}
              activeUnderlineColor={ColorPalette.lightOrange}
              outlineColor={ColorPalette.lightOrange}
              activeOutlineColor={ColorPalette.lightOrange}
            />
            <TextInput
              value={newBook.desc}
              onChangeText={e => setNewBook({...newBook, desc: e})}
              mode="outlined"
              label="Description"
              selectionColor={ColorPalette.lightOrange}
              underlineColor={ColorPalette.lightOrange}
              activeUnderlineColor={ColorPalette.lightOrange}
              outlineColor={ColorPalette.lightOrange}
              activeOutlineColor={ColorPalette.lightOrange}
            />
            <View style={screenStyles.buttonsContainer}>
              <TouchableOpacity
                onPress={handlePostButton}
                style={screenStyles.postButton}>
                <Text style={screenStyles.postButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                style={screenStyles.cancelButton}>
                <Text style={screenStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default AddBookButton;

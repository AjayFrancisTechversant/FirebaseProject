import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
import styles from './style';

type BookCardPropsType = {
  book: Booktype;
};

const BookCard: React.FC<BookCardPropsType> = ({book}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatingBookDetails, setUpdatingBookDetails] = useState<Booktype>({
    id: book.id,
    title: book.title,
    desc: book.desc,
  });
  const userId = auth().currentUser?.uid;
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0);
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

  const handleCloseButton = () => {
    closeModal();
    setTimeout(() => {
      setIsEditing(false);
    }, 300);
  };
  const handleEditbutton = async () => {
    setIsEditing(true);
  };
  const handelSaveEditing = async () => {
    firestore()
      .collection(`users/${userId}/Books`)
      .doc(updatingBookDetails.id)
      .update(updatingBookDetails)
      .then(() => {
        console.log('User updated!');
      });
    closeModal();
  };
  const handleCancelEditing = () => {
    setIsEditing(false);
  };
  const handleDelete = async (id: string | undefined) => {
    firestore().collection(`users/${userId}/Books`).doc(id).delete();
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
    <View style={screenStyles.commentCard}>
      <TouchableOpacity onPress={() => openModal()}>
        <Text style={screenStyles.commentTitle}>{book.title}</Text>
        <Text>{book.desc}</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={handleCloseButton}>
        <View style={screenStyles.modalFullScreenBackground}>
          <Animated.View
            style={[screenStyles.modalCommentContainer, animatedStyle]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={handleCloseButton}>
              <FontAwesome name="close" size={25} />
            </TouchableOpacity>
            {!isEditing ? (
              <>
                <Text style={screenStyles.commentTitle}>{book.title}</Text>
                <Text>{book.desc}</Text>
              </>
            ) : (
              <>
                <TextInput
                  value={updatingBookDetails.title}
                  onChangeText={e =>
                    setUpdatingBookDetails({
                      ...updatingBookDetails,
                      title: e,
                    })
                  }
                  mode="outlined"
                  label="Title"
                  multiline
                  numberOfLines={3}
                  selectionColor={ColorPalette.lightOrange}
                  underlineColor={ColorPalette.lightOrange}
                  activeUnderlineColor={ColorPalette.lightOrange}
                  outlineColor={ColorPalette.lightOrange}
                  activeOutlineColor={ColorPalette.lightOrange}
                />
                <TextInput
                  value={updatingBookDetails.desc}
                  onChangeText={e =>
                    setUpdatingBookDetails({
                      ...updatingBookDetails,
                      desc: e,
                    })
                  }
                  mode="outlined"
                  multiline
                  label="Description"
                  numberOfLines={3}
                  selectionColor={ColorPalette.lightOrange}
                  underlineColor={ColorPalette.lightOrange}
                  activeUnderlineColor={ColorPalette.lightOrange}
                  outlineColor={ColorPalette.lightOrange}
                  activeOutlineColor={ColorPalette.lightOrange}
                />
              </>
            )}
            {!isEditing ? (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => handleEditbutton()}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(book.id)}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={handelSaveEditing}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEditing}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(BookCard);

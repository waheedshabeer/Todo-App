import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Theme from '../../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import styles from './Styles';
import Strings from '../../utils/Strings';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [detail, setDetail] = useState('');
  const [detailError, setDetailError] = useState('');
  const [indexValue, setIndexValue] = useState(false);
  const [data, setData] = useState([]);

  const createTodo = () => {
    setTitleError('');
    setDetailError('');

    if (!title) {
      setTitleError('Label is Required');
    } else if (!detail) {
      setDetailError('Description is Required');
    } else {
      if (edit) {
        let arr = [...data];
        arr[indexValue].label = title;
        arr[indexValue].desc = detail;

        setData(arr);
        setEdit(false);
      } else {
        let arr = [...data];
        arr.push({
          label: title,
          desc: detail,
        });
        setData(arr);
      }

      setIsVisible(false);
      setTitle('');
      setDetail('');
    }
  };

  const handleEdit = (item, index) => {
    setEdit(true);
    setTitle(item.label);
    setDetail(item.desc);
    setIndexValue(index);
    setIsVisible(true);
  };

  const handleDelete = (item, myIndex) => {
    let arr = data.filter((item, index) => index !== myIndex);
    setData(arr);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{Strings.header}</Text>
      {data.length ? (
        <FlatList
          style={styles.listView}
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.columnView}>
              <View style={styles.rowView}>
                <Text numberOfLines={1} style={styles.label}>
                  {item.label}
                </Text>
                <View style={styles.innerRow}>
                  <TouchableOpacity
                    onPress={() => handleEdit(item, index)}
                    style={styles.edit}>
                    <AntDesign name="edit" size={20} color={Theme.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item, index)}
                    style={styles.delete}>
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color={Theme.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.text1}>{Strings.noTodo}</Text>
      )}

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.addBtn}>
        <AntDesign name="plus" size={24} color={Theme.secondary} />
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => {
          setIsVisible(false), setEdit(false), setDetail(''), setTitle('')
        }}
        onBackdropPress={() => {
          setIsVisible(false), setEdit(false), setDetail(''), setTitle('') 
        }}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading2}>{Strings.newTodo}</Text>
            <TextInput
              style={styles.input}
              placeholder={Strings.label}
              value={title}
              selectionColor={Theme.black}
              onChangeText={setTitle}
            />
            {titleError ? (
              <Text numberOfLines={1} style={styles.errorMsg}>
                {'* ' + titleError}
              </Text>
            ) : null}
            <TextInput
              style={styles.input2}
              placeholder={Strings.description}
              value={detail}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={10}
              selectionColor={Theme.black}
              onChangeText={setDetail}
            />
            {detailError ? (
              <Text numberOfLines={1} style={styles.errorMsg}>
                {'* ' + detailError}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={createTodo}
              activeOpacity={0.6}
              style={styles.Btn}>
              <Text style={styles.btnText}>
                {edit ? Strings.updateTodo : Strings.addTodo}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

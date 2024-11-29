import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useExpenses } from '../context/ExpenseContext';
import { useNavigation } from '@react-navigation/native';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const ExpenseForm: React.FC = () => {
  const { dispatch } = useExpenses();
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    if (!category) {
      Alert.alert('Invalid Category', 'Please select a category.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parsedAmount,
      category,
      date,
      note,
      photo,
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setNote('');
    setPhoto(null);

    navigation.navigate('Dashboard'); 
  };

  const handlePhotoSelect = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (response.didCancel) {
          console.log('Photo selection canceled.');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setPhoto(response.assets[0].uri);
        }
      }
    );
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setDropdownVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.dropdownButtonText}>
            {category || 'Select Category'}
          </Text>
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCategorySelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          placeholder="YYYY-MM-DD"
          onChangeText={setDate}
        />

        <Text style={styles.label}>Note (Optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          placeholder="Enter a note"
          onChangeText={setNote}
        />

        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.photoButton} onPress={handlePhotoSelect}>
          <Text style={styles.photoButtonText}>Select Photo</Text>
        </TouchableOpacity>
        {photo && (
          <Image source={{ uri: photo }} style={styles.imagePreview} />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 150,
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  photoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseForm;

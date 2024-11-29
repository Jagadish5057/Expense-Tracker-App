import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { getTotalSpending, getCategoryBreakdown } from '../utils/utils';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const DashboardScreen: React.FC<any> = () => {
  const { state } = useExpenses();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const currentMonth = moment().format('MMMM YYYY');

  const currentMonthExpenses = useMemo(
    () =>
      state.expenses.filter((expense) =>
        moment(expense.date).isSame(moment(), 'month')
      ),
    [state.expenses]
  );

  const totalSpending = getTotalSpending(currentMonthExpenses);

  const categoryBreakdown = getCategoryBreakdown(currentMonthExpenses);

  const filteredExpenses =
    selectedCategory === 'All'
      ? currentMonthExpenses
      : currentMonthExpenses.filter(
        (expense) => expense.category === selectedCategory
      );

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Dashboard</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.total}>Total Spending for {currentMonth}</Text>
          <Text style={styles.amount}>${totalSpending.toFixed(2)}</Text>
        </View>

        <Text style={styles.subHeader}>Category Breakdown</Text>
        {categoryBreakdown.length > 0 ? (
          categoryBreakdown.map((category, index) => (
            <View key={index} style={styles.breakdownRow}>
              <Text style={styles.category}>{category.name}</Text>
              <Text style={styles.amount}>${category.total.toFixed(2)}</Text>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(category.total / totalSpending) * 100}%` },
                ]}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No data available</Text>
        )}

        <Text style={styles.subHeader}>Recent Transactions</Text>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedCategory || 'Select Category'}
            </Text>
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdown}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategory(category);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {filteredExpenses.length > 0 ? (
          <FlatList
            data={filteredExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionRow}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionCategory}>{item.category}</Text>
                  <Text style={styles.transactionNote}>{item.note || 'No note'}</Text>
                  <Text style={styles.transactionAmount}>
                    ${item.amount.toFixed(2)}
                  </Text>
                </View>
                {item?.photo && (
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.transactionImage}
                  />
                )}
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}>No transactions match your filter</Text>
        )}

      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ExpenseForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryCard: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 16,
    color: '#fff',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    color: '#333',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#007bff',
    borderRadius: 3,
    marginTop: 5,
    flex: 1,
  },
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 10,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transactionDetails: {
    flex: 1,
    marginRight: 10,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionNote: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginVertical: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
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
});

export default DashboardScreen;


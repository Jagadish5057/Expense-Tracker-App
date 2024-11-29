- Expense Tracker App :- 

- Overview :- 

- The Expense Tracker App is a React Native application that helps users manage their daily expenses. Users can add expenses using a form with various fields such as amount, category, 
  date, optional note, and photo upload functionality. The app provides a dashboard to view total spending for the current month, a category-wise breakdown, and filtered views by 
  category.

- Setup Instructions :- 
- Prerequisites :- 
- Ensure you have completed the React Native Environment Setup:
  https://reactnative.dev/docs/environment-setup.
- Install required dependencies like Node.js, Android Studio, or Xcode depending on your platform.
- Steps to Run the Application
   1. Clone the repository:
   git clone <repository-url>
   cd expense-tracker
   2. Install dependencies:
   npm install
   # OR
   yarn install
   3. Start the Metro Bundler:
   npm start
   # OR
   yarn start
   4. Launch the app on your emulator/simulator:
   - For Android:
       npm run android
       # OR
       yarn android
   - For iOS:
       npm run ios
       # OR
       yarn ios

- Technical Decisions 
- Technology Choices
- React Native: Selected for its cross-platform capabilities to deliver a consistent experience on both iOS and Android.
- Context API: Used to manage global states such as expenses and the theme (dark/light mode).
- TypeScript: Provides type safety and improved developer experience.
- React Navigation: Handles navigation between the screens efficiently.
- Async Storage: Used to persist data locally for a better user experience.
- Dynamic Themes: Implemented light and dark modes using React Native's Appearance and Context API.
Key Functionalities
1. Expense Form:
- Input fields for amount, date, category (dropdown), optional note, and photo upload.
- Validates required fields to prevent incomplete entries.

2. Dashboard:
- Displays the total spending for the current month.
- Shows a category-wise breakdown of expenses.
- Includes a filter to view expenses by category.
- Recent transactions displayed with optional photos.

3. Dark Mode:
- User-controlled theme toggle with a global application impact.

4. State Management:
- Expenses and theme states managed through Context API.
Assumptions Made
- Categories are predefined and limited to common spending categories such as 'Food,' 'Travel,' 'Utilities,' etc.
- The current month is derived from the system date, and only expenses within this month are considered for the dashboard summary.
- Expense photos are stored temporarily for demonstration purposes (file storage not implemented for production use).
- Data filtering applies only to categories and not other parameters like date or amount.
Future Improvements
1. Backend Integration:
- Implement a cloud-based backend for storing user data and syncing across devices.
- Add user authentication to allow multiple users to maintain their expenses.

2. Advanced Filtering:
- Provide filters for date ranges, amounts, and multiple categories.

3. Enhanced UI/UX:
- Add animations and transition effects for a more polished user experience.
- Support dynamic resizing for tablets.

4. Chart Visualizations:
- Use libraries like react-native-svg or Victory to show detailed graphs for category-wise breakdowns and spending trends.

5. Data Export and Sharing:
- Allow users to export expenses as CSV or PDF.
- Share reports or summaries via email or messaging apps.

6. Notifications:
- Add reminders for recurring expenses or daily spending limits.

7. Offline Support:
- Cache data for offline usage and sync updates when online.
Troubleshooting
If you encounter issues, ensure the following:
- All dependencies are correctly installed.
- Your environment setup matches the React Native Environment Setup Guide: https://reactnative.dev/docs/environment-setup.
- The Metro server is running while you try to launch the app.

For additional help, refer to the React Native Troubleshooting Guide: https://reactnative.dev/docs/troubleshooting.
Learn More
- React Native Documentation: https://reactnative.dev/docs/getting-started
- TypeScript in React Native: https://reactnative.dev/docs/typescript
- React Navigation Documentation: https://reactnavigation.org/docs/getting-started

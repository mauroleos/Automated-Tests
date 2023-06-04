# Automated Tests

This README provides instructions on how to run the automated tests for the JSONPlaceholder API and the SauceDemo UI.

# Prerequisites

Make sure you have the following dependencies installed:

Node.js
NPM (Node Package Manager)
Chrome browser (for the SauceDemo UI tests)

# Installation

Clone the repository:

1. Copy code
   git clone https://github.com/mauroleos/Automated-Tests

2. Navigate to the project directory:
   cd <project-directory>

3. Install the required packages:

npm install

# Running the JSONPlaceholder API Tests

The JSONPlaceholder API tests are defined in the api.spec.js file.

To run the tests, use the following command:

npm run test

The tests will execute and display the test results in the terminal.

# Running the SauceDemo UI Tests

The SauceDemo UI tests are defined in the index.spec.js file.

Before running the tests, make sure you have the Chrome browser installed.

To run the tests, use the following command:

npm run test

The tests will launch the Chrome browser and execute the UI interactions. The test results will be displayed in the terminal.

Please note that the tests assume the availability of the SauceDemo website at https://www.saucedemo.com. Make sure you have internet connectivity during the test execution.

# Test Results

The test results will be displayed in the terminal. The tests utilize the assert library to verify the expected behavior. If any assertions fail, an error message will be displayed indicating the reason for failure.

# Test Customization

Both test files (api.spec.js and index.spec.js) can be modified to include additional test cases or customize the existing tests according to your requirements. Feel free to explore and extend the tests as needed.

# Conclusion

By following the instructions in this README, you can run the automated tests for the JSONPlaceholder API and the SauceDemo UI. The tests will help ensure the functionality and behavior of the API and UI.

# Author

<strong>Mauro Leos</strong> - <i>Software Developer</i> - <a href="https://www.linkedin.com/in/mauro-leos-b4103a11b/">LinkedIn </a>

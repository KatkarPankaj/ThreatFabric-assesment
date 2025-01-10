# Playwright Automation Project
This is an automation framework designed for both UI and API tests using Playwright. The framework supports modular test structures with utilities and logging to ensure scalability and maintainability.
## Overview

This project demonstrates automated testing using the Playwright framework, implementing the Page Object Model (POM) design pattern. The tests cover various scenarios related to Book Searches, also it enables the data driven testing.
## Folder Structure
The project is organized as follows:

```
.
├── tests
│   ├── api
│   │   ├── apiTest1.spec.ts      # API Test 1
│   │   ├── apiTest2.spec.ts      # API Test 2
│   │   └── apiTest3.spec.ts      # API Test 3
│   ├── ui
│   │   ├── uiTest1.spec.ts       # UI Test 1
│   │   ├── uiTest2.spec.ts       # UI Test 2
│   │   └── uiTest3.spec.ts       # UI Test 3
├── config
│   ├── .env                      # Environment variables for local setup
│   ├── staging.env               # Environment variables for staging setup
├── utils
│   ├── logger.ts                 # Optional logger for better tracking
│   └── SelfHealingutils.ts       # To handle fleky tests elements
├── package.json                  # Project configuration and dependencies
├── README.md                     # Documentation file
└── playwright.config.ts          # Playwright config file
```

- **`tests/api/`**: Contains all the API test specifications and optional utility functions for API tests.
- **`tests/ui/`**: Contains all the UI test specifications and optional utility functions for UI tests.
- **`config/`**: Holds environment-specific configuration files.
- **`utils/`**: Contains shared utilities such as a logger and fleky functions.

## Setup Instructions

To set up the project and run the tests, follow the steps below:

### 1. Initialize the Project

Initialize the Playwright framework:
```bash
npm init playwright@latest
npm install dotenv
```
## Running Specific Tests

You can run different sets of tests based on your needs:

### UI Tests only
To run only the UI tests, use the following command: Similarly use API path for API only tests
```bash
playwright test src/tests/UI
```

### FilterByAuthor Tests
To run only the tests in filterByAuthor file, use the following command:
```bash
playwright test src/tests/UI/filterByAuthor.spec.ts
```

## Running All Tests (Alternate way)

To run **all API tests** across both UI and API projects, use the following command:
```bash
npx playwright test --project="API Tests"
```
To run **all  tests** across both UI and API projects, use the following command:
```bash
npx playwright test 
```

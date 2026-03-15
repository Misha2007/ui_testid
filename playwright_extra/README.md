# Playwright Extra Testing Exercise

## Overview

This repository contains a **Playwright testing exercise** created for school practice.
The goal of this exercise is to practice **end-to-end (E2E) testing**, UI automation, and basic validation of a web application.

The tests simulate real user behavior in the **Siseveeb student portal**, including:

- Logging into the system
- Navigating to the timetable page
- Viewing teachers' schedules
- Verifying login page elements
- Measuring page load time
- Detecting login error messages

This is **not a full project**, but a **learning exercise** for understanding automated browser testing.

---

# Technologies Used

- **Node.js**
- **Playwright**
- **dotenv**

These tools allow automated browser testing and secure handling of login credentials via environment variables.

---

# Installation

### 1. Install dependencies

Run the following command in the project folder:

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Variables

The project uses a `.env` file to store login credentials and configuration.

Create a file named `.env` in the root directory.

Example:

```
SISSELOGIMIS_EMAIL=your_email_here
SISSELOGIMIS_PASSWORD=your_password_here
SISSELOGIMIS_URL=school_url

TEACHERS=[{"firstName":"John","lastName":"Smith"},{"firstName":"Selena","lastName":"Gomez"}]
```

### Variable descriptions

| Variable                | Description                                   |
| ----------------------- | --------------------------------------------- |
| `SISSELOGIMIS_EMAIL`    | Login email/username                          |
| `SISSELOGIMIS_PASSWORD` | Login password                                |
| `SISSELOGIMIS_URL`      | Login page URL                                |
| `TEACHERS`              | JSON list of teachers used for schedule tests |

The `TEACHERS` variable is parsed inside the test file:

```javascript
const teachers = JSON.parse(process.env.TEACHERS);
```

This allows running the same test for multiple teachers.

---

# Running the Tests

Run all tests:

```bash
npx playwright test
```

Run tests with visible browser:

```bash
npx playwright test --headed
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

---

# Test Cases

## 1. Timetable Screenshot Test

Logs into the system and navigates to the **Tunniplaan (Timetable)** page.

Actions:

1. Login
2. Open **Õppetöö**
3. Click **Tunniplaan**
4. Capture a screenshot

Output file:

```
tunniplaan.png
```

---

# 2. Teacher Schedule Tests

This test runs for **each teacher listed in the `.env` file**.

Steps:

1. Login to the system
2. Switch to **Vana õpilase vaade**
3. Open **Kutseõpe**
4. Select a teacher from the dropdown
5. Capture a screenshot of the timetable

Example output:

```
teachersFirstName_teachersLastName_schedule.png
```

The dropdown element is hidden in the DOM, so Playwright selects the option using:

```
{ force: true }
```

---

# 3. Locator Testing

This test verifies that important login page elements exist using different Playwright locator strategies.

Elements checked:

- Username input field
- Password input field
- Login button

Purpose:

- Practice Playwright locators
- Ensure login UI elements are visible

---

# 4. Page Load Time Test

Measures how long the login page takes to load.

Example console output:

```
Leht laadis 622ms
```

Purpose:

- Practice measuring page performance

---

# 5. Invalid Login Test

Checks whether an **error message appears when login fails**.

The test searches for errors using:

- CSS selectors
- Text pattern matching

Possible error indicators include words like:

```
vale
incorrect
vigane
parool
password
```

---

# Screenshots

Some tests generate screenshots automatically:

```
tunniplaan.png
teachersFirstName_teachersLastName_schedule.png
```

These help visually verify the results of the tests.

---

# Learning Goals

This exercise demonstrates:

- Writing automated browser tests
- Using Playwright locators
- Automating login workflows
- Running tests with dynamic data
- Handling hidden HTML elements
- Capturing screenshots
- Measuring page performance
- Validating UI elements

---

# Notes

- Login credentials are stored in `.env` for security.
- Teachers are stored as JSON in an environment variable.
- The tests are written **for educational purposes only**.

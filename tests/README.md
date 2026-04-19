# Testing Portfolio Pro

This directory contains test suites for the Portfolio Pro application.

## Test Structure

- **`app.test.js`** - Frontend React component tests
- **`api.test.js`** - API endpoint and email template tests

## Setup

1. Install dependencies:
   ```bash
   npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
   ```

2. Add test script to `package.json`:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui"
     }
   }
   ```

3. Create `vitest.config.js`:
   ```js
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       setupFiles: ['./tests/setup.js'],
       globals: true
     }
   });
   ```

4. Create `tests/setup.js`:
   ```js
   import '@testing-library/jest-dom';
   ```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

## Test Coverage

### Frontend Tests (`app.test.js`)
- **Hero Section**: Verifies name and title display correctly
- **About Section**: Checks paragraph rendering and typography
- **Project Cards**: Validates 3 cards with titles, descriptions, and links
- **Contact Form**: Tests validation, submission, and toast notifications
- **Mobile Navigation**: Ensures mobile nav buttons exist

### API Tests (`api.test.js`)
- **Method Validation**: Only POST requests allowed
- **Input Validation**: Required fields and email format
- **Email Sending**: Both notification and confirmation emails
- **Security**: HTML escaping in email templates
- **Environment Variables**: Proper use of env vars

## Mocking

- **Fetch API**: Mocked for contact form submissions
- **Resend**: Mocked for email sending tests
- **Environment Variables**: Set in test files

## Writing New Tests

When adding new features:

1. For React components:
   ```js
   import { render, screen, fireEvent } from '@testing-library/react';
   
   describe('NewComponent', () => {
     it('should do something', () => {
       render(<NewComponent />);
       expect(screen.getByText('Expected text')).toBeInTheDocument();
     });
   });
   ```

2. For API endpoints:
   ```js
   describe('New API', () => {
     it('should handle requests', async () => {
       const req = mockReq({ data: 'test' });
       const res = mockRes();
       await handler(req, res);
       expect(res.status).toHaveBeenCalledWith(200);
     });
   });
   ```

## Continuous Integration

Add to your CI pipeline:
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
```

## Coverage Reports

To generate coverage reports:
```bash
npm test -- --coverage
```

Add coverage configuration to `vitest.config.js`:
```js
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
});
```
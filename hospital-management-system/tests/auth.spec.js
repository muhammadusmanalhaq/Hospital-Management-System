import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login successfully and redirect to dashboard', async ({ page }) => {
    // Mock the API login response
    await page.route('**/api/auth/login', async route => {
      const json = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBobXMudGVzdCIsInJvbGVfaWQiOjEsImV4cCI6OTk5OTk5OTk5OX0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: { id: 1, name: 'Admin User', email: 'admin@hms.test', role_id: 1 }
      };
      await route.fulfill({ json });
    });

    // Go to login page
    await page.goto('/login');

    // Fill in credentials
    await page.fill('input[type="email"]', 'admin@hms.test');
    await page.fill('input[type="password"]', 'admin123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard — sidebar or navbar should appear
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Hospital Management System')).toBeVisible();
  });
});

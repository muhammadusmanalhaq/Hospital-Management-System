import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login successfully and redirect to dashboard', async ({ page }) => {
    // Mock the API response for login
    await page.route('**/api/auth/login', async route => {
      const json = {
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Admin User', role: 'admin' }
      };
      await route.fulfill({ json });
    });

    // Mock Auth Check (used by AuthContext)
    await page.route('**/api/protected-test', async route => {
      await route.fulfill({ json: { message: 'Success', user: { id: 1, role: 'admin', name: 'Admin User' } } });
    });

    // Go to login page
    await page.goto('/login');

    // Fill in credentials
    await page.fill('input[type="email"]', 'admin@hms.test');
    await page.fill('input[type="password"]', 'admin123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard by checking URL and an element that exists
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Hospital Management System')).toBeVisible();
  });
});

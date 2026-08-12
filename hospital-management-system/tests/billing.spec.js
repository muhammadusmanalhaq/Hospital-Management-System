import { test, expect } from '@playwright/test';

test.describe('Billing Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Auth
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({ json: { token: 'fake-jwt', user: { id: 1, role: 'admin' } } });
    });
    // Mock Bills
    await page.route('**/api/bills', async route => {
      await route.fulfill({ 
        json: [
          {
            bill_id: 1,
            patient_id: 123,
            consultation_charge: 500,
            lab_charge: 200,
            medicine_charge: 100,
            hospital_charge: 0,
            total_amount: 800,
            status: 'pending'
          }
        ] 
      });
    });

    // Login and go to Billing
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@hms.test');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.goto('/billing');
  });

  test('should display bills without NaN', async ({ page }) => {
    // Wait for the table to load the mocked bill
    await expect(page.locator('table')).toContainText('123');
    
    // Check that $800 is displayed and NaN is NOT displayed
    await expect(page.locator('table')).toContainText('$800');
    await expect(page.locator('body')).not.toContainText('NaN');
  });

  test('should open Generate Invoice modal', async ({ page }) => {
    // Mock the patients list for the dropdown
    await page.route('**/api/patients', async route => {
      await route.fulfill({ json: [{ id: 1, name: 'John Doe' }] });
    });
    // Mock appointments list for the dropdown
    await page.route('**/api/appointments', async route => {
      await route.fulfill({ json: [{ id: 1, patient_id: 1, doctor_name: 'Dr. Smith' }] });
    });

    // Click the Generate Invoice button
    await page.click('button:has-text("Generate Invoice")');

    // Verify modal opens
    await expect(page.locator('h2:has-text("Generate Invoice")')).toBeVisible();
    await expect(page.locator('label:has-text("Patient")')).toBeVisible();
  });
});

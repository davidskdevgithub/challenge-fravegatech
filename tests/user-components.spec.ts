import { test, expect } from '@playwright/test';

test.describe('GitHub User Explorer', () => {
  test('should display user cards in the list', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://localhost:3000');
    
    // Check if the page title is correct using data-testid
    await expect(page.locator('[data-testid="page-title"]')).toHaveText('GitHub Users');
    
    // Check if user cards are displayed
    const userCards = page.locator('[data-testid="user-card"]');
    
    // Get the count of user cards and verify it's greater than 0
    const count = await userCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Check if the first user card has a non-empty username
    const firstUserName = userCards.first().locator('[data-testid="user-name"]');
    const username = await firstUserName.textContent();
    expect(username).toBeTruthy();
    expect(username?.length).toBeGreaterThan(0);
    
    // Check if user avatars are loaded - make sure count matches user cards
    const avatars = page.locator('[data-testid="user-avatar"]');
    await expect(avatars).toHaveCount(count);
  });
});
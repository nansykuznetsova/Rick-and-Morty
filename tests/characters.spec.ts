import { expect, test } from '@playwright/test';

import characters from './fixtures/characters.json' with { type: 'json' };

const API_URL = 'https://rickandmortyapi.com/api/character/';

test.describe('Characters list page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${API_URL}**`, async (route) => {
      await route.fulfill({ json: characters });
    });

    await page.goto('/Rick-and-Morty/');
  });

  test('выводит 5 персонажей', async ({ page }) => {
    const cards = page.locator('ul.character-list__cards > li');
    await expect(cards).toHaveCount(5);
  });

  test('имена персонажей совпадают с теми, которые указаны в фикстуре', async ({
    page
  }) => {
    const nameLinks = page.locator('.character-card__name-link');
    await expect(nameLinks).toHaveCount(characters.results.length);

    for (let i = 0; i < characters.results.length; i++) {
      await expect(nameLinks.nth(i)).toHaveText(characters.results[i].name);
    }
  });

  test('отрабатывает  фильтрация по имени персонажа', async ({ page }) => {
    const filteredName = 'Rick';
    const filteredFixture = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [characters.results[0]]
    };

    await page.route(`${API_URL}**`, async (route) => {
      const url = route.request().url();
      if (url.includes(`name=${filteredName}`)) {
        await route.fulfill({ json: filteredFixture });
      } else {
        await route.fulfill({ json: characters });
      }
    });

    const nameInput = page.getByPlaceholder('Filter by name...');
    await nameInput.fill(filteredName);

    const cards = page.locator('ul.character-list__cards > li');
    await expect(cards).toHaveCount(1);

    const nameLink = page.locator('.character-card__name-link');
    await expect(nameLink).toHaveText('Rick Sanchez');
  });
});

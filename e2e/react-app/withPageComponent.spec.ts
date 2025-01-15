import { test, expect } from "@playwright/test";
import messages from "../../src/messages/en.json";


test.describe("withPageComponent", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should render WithPageComponent example", async ({ page }) => {
    await expect(
      page.locator(`#helloworld`)
    ).toHaveText(messages.WithPageComponent.title);

  });
});

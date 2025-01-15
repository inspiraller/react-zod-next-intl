import { test, expect } from "@playwright/test";
import messages from "../../src/messages/en.json";

import { selectors } from "../__util/selectors";

const selInputName = {
  ...selectors.register.name,
};
const msgInputPlaceholder = {
  ...messages.Register,
};
test.describe("FormRegister Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the form fields correctly", async ({ page }) => {
    await expect(page.locator("legend")).toHaveText(msgInputPlaceholder.legend);
    await expect(
      page.locator(`input[name="${selInputName.username}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`input[name="${selInputName.email}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`input[name="${selInputName.password}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`input[name="${selInputName.confirmPassword}"]`)
    ).toBeVisible();

    const usernamePlaceholder = await page
      .locator(`input[name="${selInputName.username}"]`)
      .getAttribute("placeholder");

    expect(usernamePlaceholder).toEqual(msgInputPlaceholder.username);

    const emailPlaceholder = await page
      .locator(`input[name="${selInputName.email}"]`)
      .getAttribute("placeholder");
    expect(emailPlaceholder).toEqual(msgInputPlaceholder.email);

    const passwordPlaceholder = await page
      .locator(`input[name="${selInputName.password}"]`)
      .getAttribute("placeholder");
    expect(passwordPlaceholder).toEqual("");

    const confirmPlaceholder = await page
      .locator(`input[name="${selInputName.confirmPassword}"]`)
      .getAttribute("placeholder");
    expect(confirmPlaceholder).toEqual("");
  });
});

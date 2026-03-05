import { test, expect } from "@playwright/test";

// tests/auth.spec.ts
test("usuario puede registrarse", async ({ page }) => {
  await page.goto("/login");
  await page.fill('#email', "test@test.com");
  await page.fill('#password', "123456");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});

test("usuario puede ver paquetes", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".package-card")).toHaveCount(3);
});
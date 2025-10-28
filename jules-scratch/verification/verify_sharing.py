
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173/")
        page.click('canvas')
        page.wait_for_timeout(1000)
        page.click('canvas')
        page.wait_for_timeout(1000)
        # Click on the canvas to place the hiding spot
        page.mouse.click(400, 300)
        page.wait_for_timeout(1000)
        # Click the "Share" button
        page.mouse.click(400, 300) # Re-click to hit the button
        page.wait_for_timeout(1000)
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()

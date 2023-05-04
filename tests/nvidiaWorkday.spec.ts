import { test, expect, Page, Locator } from '@playwright/test';
import credentials from '../data/workday.json'

const nvidiaUrl = 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software%20Quality%20Assurance%20Engineer&locationHierarchy1=2fcb99c455831013ea52fb338f2932d8&locationHierarchy2=0c3f5f117e9a0101f63dc469c3010000'

test('nvidia auto apply', async ({ page }) => {
    //really long URL but it contains the query of the job site
    await page.goto(nvidiaUrl);
    // Sign in code will go here
    let job_count = await page.locator('[data-automation-id="jobFoundText"]').innerText();
    let first_job_date = await page.locator('[data-automation-id="postedOn"] >> dd').first().innerText();
    let job_req = await page.locator('[data-automation-id="subtitle"]').first().innerText()
    console.log(`${job_count} || ${first_job_date}`)
    if (job_req.includes('JR1966121')) {
        console.log('No new jobs');
    } else {
        console.log('New job found to apply too!!');
        test.fail(); // Kinda janky but this sends a notification to my email about a failed job, so it works
        // submit application code will go here
    }
});

async function realClick(page: Page, locator: Locator) {
    const box = await locator.boundingBox()
    if (box) {
        await page.mouse.move(
            box.x + box.width / 2, 
            box.y + box.height / 2
        )
        await page.mouse.down();
        await page.waitForTimeout(500);
        await page.mouse.up();
    }
}
async function realClick_string(page: Page, search: string) {
    const locator = await page.locator(search);
    await realClick(page, locator)
}
// Keeping this code for reuse at a later date
// Sign in code
// await page.click('[data-automation-id="utilityButtonSignIn"]');
// await page.type('[data-automation-id="email"]', credentials.username);
// await page.type('[data-automation-id="password"]', credentials.password);
// await realClick_string(page, '[data-automation-id="signInSubmitButton"]:has-text("Sign In")');
// await page.waitForSelector(`[id="accountSettingsButton"]:has-text("${credentials.username}")`)
// Application code
        // if (first_job_date === 'Posted Yesterday') {
        //     await page.locator('[data-automation-id="jobTitle"]').first().click();
        //     await page.click('[data-automation-id="adventureButton"]');
        //     await page.click('[data-automation-id="useMyLastApplication"]');
        //     await page.waitForTimeout(500);
        //     await page.locator('[data-automation-id="multiselectInputContainer"]').first().click();
        //     await page.waitForTimeout(500);
        //     await realClick_string(page, '[data-automation-id="promptOption"]:has-text("Website")');
        //     await page.waitForTimeout(500);
        //     await realClick_string(page, '[data-automation-id="promptOption"]:has-text("NVIDIA.COM")');
        //     await page.waitForTimeout(500);
        //     await page.click('[data-automation-id="bottom-navigation-next-button"]');
        //     await page.waitForTimeout(9000);// update to wait on a network response
        //     await page.click('[data-automation-id="bottom-navigation-next-button"]');
        // }
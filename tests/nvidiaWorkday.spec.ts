import { test, expect } from '@playwright/test';
import credentials from '../data/workday.json'

let nvidiaUrl = 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software%20Quality%20Assurance%20Engineer&locationHierarchy1=2fcb99c455831013ea52fb338f2932d8&locationHierarchy2=0c3f5f117e9a0101f63dc469c3010000'

test('nvidia auto apply', async ({ page }) => {
    //really long URL but it contains the query of the job site
    await page.goto(nvidiaUrl);
    await page.click('[data-automation-id="utilityButtonSignIn"]');
    await page.type('[data-automation-id="email"]', credentials.username)
    await page.type('[data-automation-id="password"]', credentials.password)
    await page.click('[data-automation-id="signInSubmitButton"]')
    await page.waitForLoadState('networkidle')
});
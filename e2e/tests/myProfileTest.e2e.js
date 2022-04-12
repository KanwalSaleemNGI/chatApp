import login from '../components/login';
import waitToNavigate from '../components/waitToNavigate';

describe('MyProfile', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  login();

  it('should have dashboard screen', async () => {
    await expect(element(by.id('dashboardView'))).toBeVisible();
    await element(by.id('myProfileButton')).tap();
    await waitToNavigate(3000);
  });
  it('should have my profile screen', async () => {
    await expect(element(by.id('myProfileView'))).toBeVisible();

    const firstName = 'aaa';
    const firstNameInput = element(by.id('firstNameInput'));
    await firstNameInput.clearText();
    await firstNameInput.typeText(firstName);

    const lastName = 'cccc';
    const lastNameInput = element(by.id('lastNameInput'));
    await lastNameInput.clearText();
    await lastNameInput.typeText(lastName);

    await element(by.id('myProfileView')).scroll(50, 'down');
    const phoneNumber = '03123456786';
    const phoneNumberInput = element(by.id('phoneNumberInput'));
    await phoneNumberInput.clearText();
    await phoneNumberInput.typeText(phoneNumber);
  });

  it('should press edit profile button', async () => {
    await element(by.id('myProfileView')).scrollTo('bottom');
    await element(by.id('editProfileButton')).tap();
  });
  it('should have alert and navigate to dashboard', async () => {
    await expect(
      element(by.text('Your profile updated successfully')),
    ).toBeVisible();
    await element(by.text('OK')).tap();
    await waitToNavigate(3000);
  });
});

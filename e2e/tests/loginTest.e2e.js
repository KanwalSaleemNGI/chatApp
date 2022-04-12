const waitToNavigate = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));

describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have login screen', async () => {
    await expect(element(by.id('loginView'))).toBeVisible();
  });

  const emailText = 'aaa@gmail.com';
  it('it should type email: aaa@gmail.com', async () => {
    const input = element(by.id('emailInput'));
    await input.typeText(emailText);
  });

  const passwordText = '123456';
  it('it should type password: 123456', async () => {
    const input = element(by.id('passwordInput'));
    await input.typeText(passwordText);
  });

  it('should press login button', async () => {
    await element(by.id('loginButton')).tap();
    await waitToNavigate(8000);
  });
});

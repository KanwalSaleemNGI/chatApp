import waitToNavigate from './waitToNavigate';

const login = () =>
  it('should have login screen', async () => {
    await expect(element(by.id('loginView'))).toBeVisible();

    const emailText = 'aaa@gmail.com';
    const emailInput = element(by.id('emailInput'));
    await emailInput.typeText(emailText);

    const passwordText = '123456';
    const passwordInput = element(by.id('passwordInput'));
    await passwordInput.typeText(passwordText);

    await element(by.id('loginButton')).tap();
    await waitToNavigate(5000);
  });

export default login;

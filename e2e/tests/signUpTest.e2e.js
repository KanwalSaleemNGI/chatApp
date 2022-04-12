const waitToNavigate = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));

describe('SignUp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have login screen', async () => {
    await expect(element(by.id('loginView'))).toBeVisible();
  });

  it('should press sign up button', async () => {
    await element(by.id('signUpButton')).tap();
    await waitToNavigate(5000);
  });

  it('should have sinup screen', async () => {
    await expect(element(by.id('signUpView'))).toBeVisible();
  });

  const firstName = 'Kanwal';
  it('it should type first name: kanwal', async () => {
    const input = element(by.id('firstNameInput'));
    await input.typeText(firstName);
  });
  const lastName = 'Saleem';
  it('it should type last name: Saleem', async () => {
    const input = element(by.id('lastNameInput'));
    await input.typeText(lastName);
  });

  const phoneNumnber = '03123456789';
  it('it should type phone number: 03123456789', async () => {
    const input = element(by.id('phoneNumberInput'));
    await input.typeText(phoneNumnber);
    await element(by.id('signUpView')).scrollTo('bottom');
  });

  const emailText = 'cyz@gmail.com';
  it('it should type email: cyz@gmail.com', async () => {
    const input = element(by.id('emailInput'));
    await input.typeText(emailText);
  });

  const passwordText = '123456';
  it('it should type password: 123456', async () => {
    const input = element(by.id('passwordInput'));
    await input.typeText(passwordText);
  });

  it('should press sign up button', async () => {
    await element(by.id('signUpButton')).tap();
    await waitToNavigate(8000);
  });
});

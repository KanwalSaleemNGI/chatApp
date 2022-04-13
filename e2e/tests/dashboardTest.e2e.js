import login from '../components/login';
import waitToNavigate from '../components/waitToNavigate';

describe('Dashboard', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {notifications: 'YES'},
    });
  });

  login();

  it('should have dashboard screen', async () => {
    await expect(element(by.id('dashboardView'))).toBeVisible();
  });

  it('should press logout button', async () => {
    await element(by.id('logoutButton')).tap();
    await waitToNavigate(3000);
  });
});

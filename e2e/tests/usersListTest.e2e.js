import login from '../components/login';
import waitToNavigate from '../components/waitToNavigate';

describe('MyChats', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  login();

  it('should have dashboard screen', async () => {
    await expect(element(by.id('dashboardView'))).toBeVisible();
    await element(by.id('myChatsButton')).tap();
    await waitToNavigate(3000);
  });
  it('should have userList screen', async () => {
    await expect(element(by.id('usersListView'))).toBeVisible();
    await waitToNavigate(3000);
  });

  it('should navigate to user chat', async () => {
    const userChatId = '115830410867337518269';
    await element(by.id(userChatId)).tap();
  });
});

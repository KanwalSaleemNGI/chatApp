import login from '../components/login';
import waitToNavigate from '../components/waitToNavigate';

describe('MyChatsSearch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  login();

  it('should have dashboard screen', async () => {
    await expect(element(by.id('dashboardView'))).toBeVisible();
    await element(by.id('myChatsButton')).tap();
    await waitToNavigate(3000);
  });
  it('should have user search ist screen', async () => {
    await expect(element(by.id('usersListView'))).toBeVisible();
    await waitToNavigate(3000);
  });

  it('should navigate to searched user chat', async () => {
    const searchText = 'ka';
    const searchInput = element(by.id('searchInput'));
    await searchInput.typeText(searchText);

    const userChatId = 'YnKLtGWOlyWIfrSLMZd2nDJ2GQN2';
    await element(by.id(userChatId)).tap();
    await waitToNavigate(3000);
  });
});

import usersList from '../components/usersList';
import waitToNavigate from '../components/waitToNavigate';

describe('UserChat', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {notifications: 'YES'},
    });
  });

  usersList();

  it('should have user chat screen', async () => {
    await expect(element(by.id('userChatView'))).toBeVisible();
  });

  it('should type message', async () => {
    const message = 'Hello';
    const messageInput = element(by.id('messageInput'));
    await messageInput.typeText(message);
  });

  it('should press send message button', async () => {
    await element(by.id('sendMessageButton')).tap();
  });
  waitToNavigate(300);
});

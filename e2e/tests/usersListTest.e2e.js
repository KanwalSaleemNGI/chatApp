import login from '../components/login';
import waitToNavigate from '../components/waitToNavigate';
import usersList from '../components/usersList';

describe('MyChats', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  usersList();
});

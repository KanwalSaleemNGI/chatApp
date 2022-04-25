import {useSelector} from 'react-redux';

const isConnectedSelector = state => state.network.isConnected;
const actionQueueSelector = state => state.network.actionQueue;

const useNetworkInfo = () => {
  const isConnected = useSelector(isConnectedSelector);
  const actionQueue = useSelector(actionQueueSelector);

  return {isConnected, actionQueue};
};

export default useNetworkInfo;

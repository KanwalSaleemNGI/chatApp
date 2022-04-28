import Actions from '../../constants/Actions';

export const getUser = userDetails => ({type: Actions.getUser, userDetails});

export const logout = () => ({type: Actions.logout});

export const enableLoader = () => ({type: Actions.enableLoader});

export const disableLoader = () => ({type: Actions.disableLoader});

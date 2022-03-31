export const logout = () => ({type: 'LOGOUT'});

export const getUser = userDetails => ({type: 'GETUSER', userDetails});

export const enableLoader = () => ({type: 'ENABLELOADER'});

export const disableLoader = () => ({type: 'DISABLELOADER'});

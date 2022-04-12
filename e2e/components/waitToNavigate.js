const waitToNavigate = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));

export default waitToNavigate;

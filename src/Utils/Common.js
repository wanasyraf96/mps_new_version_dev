// return the user data from the session storage
  export const getNOKP = () => {
    const userStr = sessionStorage.getItem('nokp');
    if (userStr) return userStr;
    else return null;
  }

  export const getUser = () => {
    const userStr = sessionStorage.getItem('username');
    if (userStr) return userStr;
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token');
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('nokp');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, username, nokp) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('nokp', nokp);
  }
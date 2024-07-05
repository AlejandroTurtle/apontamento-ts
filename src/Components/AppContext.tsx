// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const logout = () => {
  return axios.post(`${API_URL}/logout`).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem('user'); // Remova o token do local storage
    }
  });
};

export {logout}

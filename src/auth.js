import jwt from 'jsonwebtoken'

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const verifyToken = (token = getToken()) => {
  if (!token) {
    return Promise.reject(new Error('no token set'))
  }
  return fetch('http://localhost:3333/verifyToken', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status !== 200) {
      throw new Error('Token invalid');
    }
    return jwt.decode(token)
  })
}

export const login = (username, password) => {
  return fetch('http://localhost:3333/login',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => res.json())
    .then(res => {
      window.localStorage.setItem('token', res.token)
      return jwt.decode(res.token)
    })
}

export const logOut = () => {
  window.localStorage.removeItem('token');
  return Promise.resolve(true);
}

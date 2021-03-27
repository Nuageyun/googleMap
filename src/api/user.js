import axios from 'axios'

// user account
export const getUsers = query => axios.get('/static/users.json', { params: query })

// ownership
export const getOwnership = query => axios.get('/static/ownership.json', { params: query })

// game
export const getGameList = query => axios.get('/static/games.json', { params: query })

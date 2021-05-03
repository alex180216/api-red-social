const express = require('express')
const user = require('../components/user/network')
const auth = require('../components/auth/network')

const routes = (server) =>{
    server.use('/api/user', user) 
    server.use('/api/auth', auth)
}

module.exports = routes
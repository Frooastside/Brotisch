module.exports = {
  apps : [{
    name: 'Brotisch',
    script: 'server.js'
  }],

  deploy : {
    production : {
      ref  : 'origin/master',
      repo : 'git@github.com:Frooastside/Brotisch.git',
      path : '/root/Brotisch',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    }
  }
};

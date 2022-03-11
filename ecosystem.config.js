module.exports = {
  apps : [{
    name: 'Brotisch',
    script: 'server.js'
  }],

  deploy : {
    production : {
      user : 'root',
      host : '81.169.159.21',
      ref  : 'origin/main',
      repo : 'https://github.com/Frooastside/Brotisch',
      path : '/root/Brotisch',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

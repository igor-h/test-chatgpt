module.exports = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/mydatabase',
    jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
    jwtExpiration: process.env.JWT_EXPIRATION || '1d'
};
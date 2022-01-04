import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type:'postgres',
 host: process.env.dbHost,
 port: parseInt(<string>process.env.dbPort),
 username: process.env.dbUser,
 password: process.env.dbPass,
 database: process.env.dbName,
 synchronize: false,
 entities: ['dist/src/**/*.entity.js'],
 migrations: ['dist/src/migrations/*.js'],
 cli: {
   migrationsDir: 'src/migrations',
 },
      keepConnectionAlive: true,
      retryAttempts: 2,
      retryDelay: 1000,
    };
  }
}

//export default config;
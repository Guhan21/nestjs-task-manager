import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '	john.db.elephantsql.com',
    url: 'postgres://xlulneno:xqNLuuLaLU7cLWzcbaTvJIqAfu0aiHOd@john.db.elephantsql.com:5432/xlulneno',
    // port: 5432,
    // username: 'xlulneno',
    // password: 'xqNLuuLaLU7cLWzcbaTvJIqAfu0aiHOd',
    // database: 'xlulneno',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};

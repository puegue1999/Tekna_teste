require('dotenv').config();//instatiate environment variables

let CONFIG = {}

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'postgresql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '5432';
CONFIG.db_name = process.env.DB_NAME || 'tekna_db';
CONFIG.db_user = process.env.DB_USER || 'postgres';
CONFIG.db_password = process.env.DB_PASSWORD || 'postgres';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'tekna';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '60';

CONFIG.super_admin_roleId = process.env.super_admin_roleId || 1;

CONFIG.UPLOADS_PATH =your_uploads_path;

CONFIG.APPLICATION_ID = 3;
CONFIG.DEFAULT_DATE_fROMAT = 'yyyy-MM-dd HH:mm:ss';
module.exports = CONFIG;
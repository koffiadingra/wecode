<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'saucegraine' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'nNs-)i# sW..;=g.|{A01z$ %!gs,! 3;|r^~W5lCx38@!~9AS_-HJ@1@FINpZ}w' );
define( 'SECURE_AUTH_KEY',  'f+UYeP$&w<zwQf?hz7z_W=3eDO~z[xfy HcH=+Zt_%Rsyos;g*]2P 92$m,^23rF' );
define( 'LOGGED_IN_KEY',    ',6-[n,&@o>8liVirKGLVs%&3D//lU&q!@F4x?-JahRF.6Om -z(fDAY81_SDw9CM' );
define( 'NONCE_KEY',        'M{0HYH$GSU`RUyh%$jjKRF-5D|ah}`N5M-39yR,J7#@N~f6ay4C?!3{Ic=6cJFS/' );
define( 'AUTH_SALT',        'PH<gOZ)B.kK~/=ew_WaC7M/YnO6%_Dk0VjAa/T;W2tUbcY!^A~6wHRLUAlBrF{{=' );
define( 'SECURE_AUTH_SALT', '5`b2qYdieR_![Mo+MzNa^HDw_~J=*DHs%D+`y|xHI,I!z%+1YADkl 5eBH[+}QD`' );
define( 'LOGGED_IN_SALT',   'JwgHh{Xd8$>*&6.QL#dP]?tX}X7@-$_+kL(9n]gX?:;I#4+d45=+!&rp/Gj(}ag]' );
define( 'NONCE_SALT',       '.%?!~T]fdxR6q-wI2Pjkt%8[Ii@kBc=B1?h:G!!PBiGd7uuF/?]@<Ug!cMx;nvMR' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

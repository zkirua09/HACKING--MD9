const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWURJcUlwZFlwcy9kRXJ5cXVlUFpJVmlyK0duUTYybTZRYzN5c1RCaTVrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVVqOFloR2p4Z3R0UWNKRW5DVlZQRXpGbnQwSlh5S3hHMHRuakh0RWZ4dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQnR0UkxTSjVZY2VWMDBZdkxjUENxeElMeEJINXlyV09mRnBscFR0d1hNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6aDNOOHV0WjVZL0tzTm5hYUtWd2svOVA5YkJLYnZUNk1QWHhsNW82Y2w4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZJZCs1UjRPNmQxRU5YblYyeUl0eW1DV2VQSWphMWl6dTB0NFE1VTFOMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBWTE9BOFNRaDZxbkVyWCt5VVFQUnBQeDVQMlhCd0VYbUdCdkNZU1RrRlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0h0UHN2dTlzSDdyZGkwMUtFdnZKemlnZmxlNEN6SlltMzhEcnZDZ21YVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjV2a2Q1d1lsTFFIelFqRFFsbzhrakZoVUVaZEt3VThscVBlYnZWRFAwdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkprWldUOExPdzZrRkJtdDhpVlZRV2xkVXJqWlVUOVIwdDZhNit4Wm9Kb3NqOEtjc0t3YTRibmszVDdGQUFVNndDM2R1MGVyN0EyTCtoVGZHbWpNb2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAwLCJhZHZTZWNyZXRLZXkiOiJXKzlhT3FMbGVBQnJWVEhzTEk4bm1HOXhLOGl3WEY5SCtqNnd1anJHK3lFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoa05DOTctX1Q1NlZXSzZWREM0VHVnIiwicGhvbmVJZCI6ImU3ZTg1NmQwLWU3MjEtNDY3MC05YjhlLWFhYmRkZTMzY2JhZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJScEVWNXBPcDRwWWtUTFRoaE1JTytOZzF4RkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFFyMXJXUVluL2s4RUdRUjZKdlhsL0tNR1hjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJHNEFGVEE2IiwibWUiOnsiaWQiOiIyNDIwNjQ0MDYyMDM6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZi+8J2ZivCdmYnwnZmB8J2ZkPCdmL7wnZmE8J2ZkPCdmY4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05EN3hJNEJFUGU4ejdVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpnSlJhKzVlaEhUYnJoSTh0c3NBUU9xZ3FWeFVBVGNrQ0hyU0dmNmIyMDA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZjWlZXTXo5YzRmWXRDalRvN0NublRrN2QzU05INVp3eEJFNTBESDFLU0FHZ21FTnlGOW9ISjU2WEQyTGlPeDZycGEwUjJrNlhlS0pGWHY3K252RkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJndTMvTk9MSDFROUF1Yjl4eU9QMkRmMjlHdlRMV3Nza2l4V2JsUm9mVGpjZk8yclJjZXBLK0U3RW11WmQ1Mkh2UVBMUnlJMm5jcUMxRjcwMFltQTNqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MjA2NDQwNjIwMzoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlk0Q1VXdnVYb1IwMjY0U1BMYkxBRURxb0tsY1ZBRTNKQWg2MGhuK205dE4ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMwNjM5NDZ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Hacking-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Hacking_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

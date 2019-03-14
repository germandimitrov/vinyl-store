# Vinyl Store
## Installation
~~~~
  cd client
  npm i
  npm start
  cd server
  npm i
  run your MySql Server
  setup database settings inside server/ormconfig.json file
  create database named as in server/ormconfig.json
  npm start
~~~~

## General Usage:

Users can login and browse other users vinyl record collection.
They can view the other users contact information in order to contact them and buy a record. They can also rate other users.
Logged users can create/update/delete their records for sale.
They can update their profile information.

## Users Can:

- Register
- Login
- Create/Read/Update/Delete Record Their Own Records
- View Other Users Records
- View Other Users Profiles
- Rate Other Users
- Edit Their Own Profile
- Logout

## Admin Can:
- All The Above plus:
- Create/Read/Update/Delete Records On Any User
- Activate/Deactivate users with low rating

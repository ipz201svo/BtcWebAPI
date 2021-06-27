# BtcWebAPI

## Installation

## How to use

- To create a new user, send a POST request to /user/create with a body which has email and passport fields. In the successful case, you will receive a 200 Ok response with hashed password, salt, email and id.

![create screen](Screenshots\create.png)

- To login, send a POST request to /user/login with a body which has email and passport fields. In the successful case, you will receive a 200 Ok response with a JWT.

![login screen](Screenshots\login.png)

- To get a current BTC rate, send a GET request to /btcRate with a header which contain Authorization field with a value that is a JWT you have got while login.

![btcRate screen](Screenshots\btcRate.png)

## Documentation

### What is used

The API uses *Node.js* and a couple of libs: *express*, *node-fetch*, *passport* and *passport-jwt*.

### data.json

Data about registered users is stored here in `.json` format.

### domain.js

This file contains logic about storing and getting data.

`findUser(parameter, value): User`, where<br>
`parameter: string` - name of the field, that `User` class owns,<br>
`value` - the value of the parameter.<br>
Function tries to find user in the `data.json` according to the parameter and its value.

`getAllUsers(): Array<User>`<br>
Function gets all users from `data.json`.

`addUser(user): void`, where<br>
`user: User` - user you want to add.<br>
Function adds the user to `data.json`.

### utils.js

This file contains helper functions.

`validPassword(password, hash, salt): boolean`, where<br>
`password: string` - raw password, that user enters,<br>
`hash: string` - hashed password, that will be compared to one in the `data.json`, <br>
`salt: string` - salt from `data.json` to add to raw password and hash.<br>
Function hashes password with salt and compares it with the hash-parameter.

`genPassword(password): {salt, hash}`, where,<br>
`password: string` - raw password to hash,<br>
`salt: string` - generated salt to store,<br>
`hash: string` - hashed password with salt.<br>
Function that generates a pair of salt and hashed password based on raw password.

`issueJWT(user): {token, expires}`, where<br>
`user: User` - user to whom issue a JWT,<br>
`token: string` - generated token,<br>
`expires: string` - time span, when token expires.<br>
Function issues a JSON Web Token to authenticate the user.<br>

`validateEmail(email): boolean`, where<br>
`email: string` - email to check.<br>
Function checks whether the email is written correctly using regular expression.

### generateKeypair.js

The file contains a function, which generates two files with keys, which are used to cipher and decipher JWT.

`genKeyPair(): void`<br>
Function adds `id_rsa_priv.pem` and `id_rsa_pub.pem` files.
The first one is used to cipher a JWT using RS256 algorithm.
The other one is used to decipher.

> In order to simplify the API, I don't add these files to `.gitignore` file, but in real world, you should and you should generate your own key pair. To do it, write `node generateKeypair.js` in the terminal and these files with unique keys will be added.

### btc.js

The file contains function to fetch info about BTC rate from side API.

`getInfo(): {currency_trade, currency_base, buy}`, where<br>
`currency_trade: string` - a name of the currency to trade (BTC),<br>
`currency_base: string` - a name of the currency to sell (UAH),<br>
`buy: string` - a cost of the currency (in UAH).<br>
Function fetches the https://btc-trade.com.ua/api/ticker/btc_uah to get info.

### passport.js

The file contains logic to decipher JWT. It is used as a middleware in protected routes which require an authentication using JWT.




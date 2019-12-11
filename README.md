# Blockchain Vaccination Registry

[![Narration Video](http://img.youtube.com/vi/WDv_6H8Y9uU/0.jpg)](http://www.youtube.com/watch?v=WDv_6H8Y9uU "Narration")

This is a proof of concept that registers vaccionations as NFT Tokens to a certain public address, which would be the representation of a real person. Ideally each public address will be backed by a physical Identification Card.

This is just a proof of concept, without proper UX or security considerations.

## To execute

On one terminal:
* `npm i -g truffle`
* `truffle develop`
* `migrate`

On a second terminal:
* `cd client`
* `npm start`

## Notes on the contracts

Contracts based on the sample implementation from Enjin (https://github.com/enjin/erc-1155)

# Setup and start
    - npm install
    - npm start
    - For https install openssl
# Generate private key and csr
    - openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key
# Generate crt from csr and private key
    -  openssl x509 -signkey private.key -in mydomain.csr -req -days 365 -out primary.crt

https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs

https://blog.cloudboost.io/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e
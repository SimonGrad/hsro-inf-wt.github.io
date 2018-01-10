!/bin/bash

rm -f cors.{key,csr,crt}

FQDN=`hostname`

openssl genrsa -out cors.key 2048
openssl req -nodes -newkey rsa:2048 -keyout cors.key -out cors.csr -subj \
  "/C=DE/ST=BY/L=ROSENHEIM/O=HSRO/OU=AUTHORITY/CN=${FQDN}"
openssl x509 -req -days 1024 -in cors.csr -signkey cors.key -out cors.crt


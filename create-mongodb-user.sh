#!/bin/bash

# KONFIGURACJA
CONTAINER_NAME="mongodb"
DB_NAME="gillslab1"
DB_USER="gillslabUser"
DB_PASS="superTajneHaslo123"
ROOT_USER="root"
ROOT_PASS="superRootHaslo"

# TWORZENIE SKRYPTU DO KONTENERA
cat <<EOF > create-user.js
use $DB_NAME;
db.createUser({
  user: "$DB_USER",
  pwd: "$DB_PASS",
  roles: [ { role: "readWrite", db: "$DB_NAME" } ]
});
EOF

# KOPIOWANIE I URUCHOMIENIE W KONTENERZE
docker cp create-user.js $CONTAINER_NAME:/create-user.js
docker exec -i $CONTAINER_NAME mongosh -u "$ROOT_USER" -p "$ROOT_PASS" --authenticationDatabase admin /create-user.js

# SPRZĄTANIE
rm create-user.js
docker exec -it $CONTAINER_NAME rm /create-user.js

echo "✅ Użytkownik '$DB_USER' został utworzony w bazie '$DB_NAME'."


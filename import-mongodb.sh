#!/bin/bash

# KONFIGURACJA
CONTAINER_NAME="mongodb"
DB_NAME="gillslab1"
DB_USER="gillslabUser"
DB_PASS="superTajneHaslo123"
DUMP_LOCAL_PATH="./dump"
DUMP_CONTAINER_PATH="/dump"

# TWORZENIE SKRYPTU IMPORTUJĄCEGO DANE
cat <<EOF > import-data.sh
#!/bin/bash
mongorestore \\
  --username "$DB_USER" \\
  --password "$DB_PASS" \\
  --authenticationDatabase "$DB_NAME" \\
  --db "$DB_NAME" \\
  "$DUMP_CONTAINER_PATH/$DB_NAME"
EOF

# KOPIOWANIE DUMP I SKRYPTU
docker cp "$DUMP_LOCAL_PATH" $CONTAINER_NAME:$DUMP_CONTAINER_PATH
docker cp import-data.sh $CONTAINER_NAME:/import-data.sh
docker exec -it $CONTAINER_NAME bash -c "chmod +x /import-data.sh && /import-data.sh"

# SPRZĄTANIE
rm import-data.sh

echo "✅ Dane zaimportowane do bazy '$DB_NAME'."


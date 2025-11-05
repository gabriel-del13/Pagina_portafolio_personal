#!/bin/bash

BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/portfolio_backup_$DATE.sql"

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Hacer backup
docker-compose -f docker-compose.aws.yml exec -T db pg_dump -U portfolio_user portfolio > $BACKUP_FILE

# Comprimir
gzip $BACKUP_FILE

# Mantener solo los últimos 7 backups
find $BACKUP_DIR -name "portfolio_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE.gz"
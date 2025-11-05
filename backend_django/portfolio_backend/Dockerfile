FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    netcat-traditional \
    gosu \
    curl \
 && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Crear usuario no-root
RUN useradd -m -u 1000 appuser

# Crear carpetas necesarias y dar permisos
RUN mkdir -p /app/staticfiles /app/mediafiles /app/logs \
    && chown -R appuser:appuser /app

# Copiar requirements como root
COPY requirements.txt .

# Instalar dependencias como root
RUN pip install --no-cache-dir -r requirements.txt

# Copiar proyecto
COPY . .

# Dar permisos a appuser
RUN chown -R appuser:appuser /app

# Exponer puerto
EXPOSE 8000

# Script de entrada
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

# NO cambiar a USER aquí, lo haremos en el entrypoint
ENTRYPOINT ["/app/docker-entrypoint.sh"]
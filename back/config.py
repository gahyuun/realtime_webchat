import os

REDIS_CHANNEL = "chat"
REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = os.getenv('REDIS_PORT', 6379)
SERVER_PORT = 8080

import asyncio
import aiohttp
from aiohttp import web
import redis.asyncio as redis
import json

REDIS_PORT = 6379
REDIS_HOST = 'localhost'
REDIS_CHANNEL = "chat"
count = 0
clients = {}


async def handle_receive_message(ws, redis_client,id):
    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            data = json.loads(msg.data)
            content = data.get("content")
            user_id = data.get("user_id")
            await redis_client.publish(REDIS_CHANNEL, json.dumps({"user_id": user_id, "content": content}))


async def handle_send_message(pubsub, ws):
    while True:
        try:
            message = await pubsub.get_message(ignore_subscribe_messages=True)
            if message is not None:
                message_data = json.loads(message["data"].decode())
                user_id = message_data["user_id"]
                content = message_data["content"]
                await ws.send_str(json.dumps({"user_id": user_id, "content": content}))
        except asyncio.TimeoutError:
            pass


async def handle_websocket(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    redis_client = await redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(REDIS_CHANNEL)

    user_id = request.match_info['id']
    clients[user_id] = ws

    receive_message = asyncio.create_task(handle_receive_message(ws, redis_client,user_id))
    send_message = asyncio.create_task(handle_send_message(pubsub, ws))
    await asyncio.gather(receive_message, send_message)
    return ws


async def main():
    app = web.Application()
    app.add_routes([web.get("/ws/{id}", handle_websocket)])
    return app


if __name__ == "__main__":
    web.run_app(main(), host="0.0.0.0", port=8080)

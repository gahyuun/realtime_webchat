import asyncio
import aiohttp
from aiohttp import web
import redis.asyncio as redis
import json



REDIS_PORT = 6379
REDIS_HOST = 'localhost'
REDIS_CHANNEL = "chat"
count=0
clients = []

async def handle_message(ws,user_id,redis_client,clients):
    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            data = json.loads(msg.data)
            content = data.get("content")
        for client in clients:
            if not client.closed:
                await client.send_str(
                    json.dumps(
                        {
                            "username": "sender~",
                            "content": content,
                        }
                    )
                )
            else:
                clients.remove(client)


async def handle_websocket(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    redis_client = await redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(REDIS_CHANNEL)

    global count
    count += 1
    user_id = str(count)
    clients.append(ws)

    await ws.send_str(user_id)
    print("메세지 보내기 성공")

    await redis_client.publish(REDIS_CHANNEL,json.dumps({"sender": user_id, "content": "Join"}))


    receive_message = asyncio.create_task(handle_message(ws, user_id, redis_client,clients))
    # send_message = asyncio.create_task(send_message_to_client(ws, user_id, pubsub))
    #
    # await asyncio.gather(receive_message, send_message)
    await receive_message
    return ws

async def main():
    app = web.Application()
    app.add_routes([web.get("/ws", handle_websocket)])
    return app


if __name__ == "__main__":
    web.run_app(main(), host="0.0.0.0", port=8080)

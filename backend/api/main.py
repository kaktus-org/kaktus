import uvicorn
from fastapi import FastAPI

from .routers import users

app = FastAPI()

app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "yurr"}

def start():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)

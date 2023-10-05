from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

fake_users = {1: "Harley", 2: "Lewis"}

@router.get("/")
async def read_users():
    return "All users here.."

@router.get("/{user_id}")
async def read_user(user_id: str):
    user_id_int = int(user_id)
    if user_id_int not in fake_users:
        raise HTTPException(status_code=404, detail="User not found")
    return f"Name is {fake_users[user_id_int]}"

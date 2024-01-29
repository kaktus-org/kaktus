from sqlalchemy.orm import Session
from db.models.roles import Roles


def create_role(db: Session, role_name: str):
    db_role = Roles(name=role_name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


def get_role(db: Session, role_id: int):
    return db.query(Roles).filter(Roles.id == role_id).first()


def get_roles(db: Session, limit: int = 100):
    return db.query(Roles).limit(limit).all()

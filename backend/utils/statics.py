from typing import Any


class StaticClass(type):
    def __call__(cls, *args: Any, **kwargs: Any) -> Any:
        raise TypeError(f"{cls.__name__} class may not be instantiated")

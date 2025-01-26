from typing import List
from abc import ABC, abstractmethod


class VectorSeacher(ABC):
    @abstractmethod
    def __init__(self, path: str):
        self.path = path

    @abstractmethod
    def __len__(self) -> int:
        pass

    @abstractmethod
    def __contains__(self, id: int) -> bool:
        pass

    @abstractmethod
    def get_ids(self) -> List[int]:
        pass

    @abstractmethod
    def query(self, vectors: List[float], k: int = 1) -> List[int]:
        pass

    @abstractmethod
    def save(self, path: str) -> None:
        pass

    @abstractmethod
    def load(self, path: str) -> None:
        pass

    @abstractmethod
    def get_vector(self, id: int) -> List[float]:
        pass

    @abstractmethod
    def add_item(self, id: int, vector: List[float]) -> int:
        pass

    @abstractmethod
    def remove_item(self, id: int) -> None:
        pass

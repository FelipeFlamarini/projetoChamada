from typing import List, Optional
from utils.libs.voyager_vector_searcher import VoyagerVectorSearcher


class StudentsVectorSearcherRepository:
    VECTOR_PATH: str = "vectors/students_vector.voy"
    _index: Optional[VoyagerVectorSearcher] = None

    @classmethod
    def _get_index(cls) -> VoyagerVectorSearcher:
        if cls._index is None:
            cls._index = VoyagerVectorSearcher(path=cls.VECTOR_PATH)
        return cls._index

    @classmethod
    def get_ids(cls) -> List[int]:
        return cls._get_index().get_ids()

    @classmethod
    def query(cls, vectors: List[float], k: int = 1) -> List:
        return cls._get_index().query(vectors, k)

    @classmethod
    def save(cls) -> bool:
        cls._get_index().save()

    @classmethod
    def load(cls) -> bool:
        cls._get_index().load()

    @classmethod
    def get_vector(cls, student_ra: int) -> List[float]:
        return cls._get_index().get_vector(student_ra)

    @classmethod
    def add_item(cls, vectors: List[float], student_ra: int) -> bool:
        return cls._get_index().add_item(vectors, student_ra)

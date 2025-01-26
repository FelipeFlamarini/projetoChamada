from typing import List

from voyager import Index, Space
import numpy as np

from utils.abstract_classes.vector_searcher import VectorSeacher
from utils import exceptions


class VoyagerVectorSearcher(VectorSeacher):
    def __init__(
        self,
        path: str,
        space: Space = Space.Cosine,  # depends on DeepFace model
        num_dimensions: int = 512,  # depends on DeepFace model
    ):
        super().__init__(path)
        self._index = Index(space, num_dimensions)

    def __len__(self) -> int:
        return len(self._index)

    def __contains__(self, student_ra: int) -> bool:
        return student_ra in self._index

    def get_ids(self):
        return self._index.ids

    def query(self, vectors: List[float], k: int = 1) -> List[int]:
        return self._index.query(np.array(vectors), k)

    def save(self):
        self._index.save(self.path)

    def load(self):
        self._index = Index.load(self.path)

    def get_vector(self, student_ra: int) -> List[float]:
        try:
            return self._index.get_vector(student_ra)
        except KeyError:
            raise exceptions.VectorNotFound("Vector not found")

    def add_item(self, vectors: List[float], student_ra: int) -> int:
        return self._index.add_item(np.array(vectors), student_ra)

    def remove_item(self, student_ra: int):
        self._index.mark_deleted(student_ra)

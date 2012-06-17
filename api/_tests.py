import unittest
import _birthdayloop

class TestMain(unittest.TestCase):
    def test_correct_iteration_count(self):
        _birthdayloop.main

class TestRange(unittest.TestCase):
    def test_correct_iteration_count(self):
        _birthdayloop._do_range

    def test_inputs_are_not_modified(self):
        pass

class TestWildYear(unittest.TestCase):
    def test_correct_iteration_count(self):
        _birthdayloop._range(mock_query_result = []

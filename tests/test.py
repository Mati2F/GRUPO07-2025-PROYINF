import unittest
import requests

host = 'http://localhost:8000'

class Login:
    # Clae que define Login para testear
    def __init__(self, email, password):
        self.email = email
        self.password = password
    
    def login_response(self):
        data = {"email": self.email, "password": self.password}
        response = requests.post(host + '/login', json=data)
        return response.ok

class Borradores:
    # Clae que define Borradores para testear
    def __init__(self, id):
        self.id = id

    def get_response(self):
        url = host + f"/draft/{self.id}"
        response = requests.get(url)
        return response.ok


class TestUsers(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        print("conectado")
        return super().setUpClass()
    
    def setUp(self):
        self.user1 = Login("user@example.com", "12345")
        self.user2 = Login("user@usm.cl", "12345")
        self.user3 = Login("user@example.com", "perro")
        self.borradores1 = Borradores(7)
        self.borradores2 = Borradores(120)
        return super().setUp()
    
    def test_postUsers(self):
        self.assertTrue(self.user1.login_response())
        self.assertFalse(self.user2.login_response())
        self.assertFalse(self.user3.login_response())

    def test_getBorradores(self):
        self.assertTrue(self.borradores1.get_response())
        self.assertFalse(self.borradores2.get_response())

    def tearDown(self):
        del self.user1, self.user2, self.user3
        return super().tearDown()
    
    @classmethod
    def tearDownClass(cls):
        print("desconectado")
        return super().tearDownClass()


if __name__ == '__main__':
    unittest.main()
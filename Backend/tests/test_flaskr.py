import pytest, json  
from app import app

def test_avatars():
    response = app.test_client().get('/avatars')
    res = json.loads(response.data.decode('utf-8')).get("Avatars")
    assert response.status_code == 200
    assert len(res) == 6


import pytest, json  
from Backend.app import app

def test_avatars():
    response = app.test_client().get('/avatars')
    res = json.loads(response.data.decode('utf-8')).get("Avatars")
    assert response.status_code == 200
    assert len(res) == 6

def test_hangmanPrompts():
    response = app.test_client().get('/hangmanPrompts')
    res = json.loads(response.data.decode('utf-8')).get("HangmanPrompts")
    assert response.status_code == 200
    assert len(res) == 100

def test_pictionaryPrompts():
    response = app.test_client().get('/pictionaryPrompts')
    res = json.loads(response.data.decode('utf-8')).get("PictionaryPrompts")
    assert response.status_code == 200
    assert len(res) == 47


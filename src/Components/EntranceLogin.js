import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo.png';
import Home from '../Home.png';
import axios from 'axios';

const EntranceLogin =  () => {
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    await axios.post('http://localhost:7000/entrance/login',{
      email: formData.get('email'),
      password: formData.get('password')
    }).then(res => {
      if(typeof res.data === typeof ''){
        alert(res.data)
      } else {
        const token = res.data.token;
        sessionStorage.setItem('token', token);
        history.push('/entry')
      }
    })
  }
  return (
    <div>
      <div>
        <img src= {Logo} alt= 'imageLogo'/>
        <p>Войти в систему</p>
      </div>
      <img src= {Home} alt= 'imageHome'/>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Войти в систему</h1>
          <label>Login:</label>
          <input type= 'email' id='email' name='email'/>
          <label>Password:</label>
          <input type= 'password' id='password' name='password'/>
          <button>Войти</button>
          <Link to='/register'><p>Зарегистрироваться</p></Link>
        </form>
      </div>
    </div>
  );
}

export default EntranceLogin;
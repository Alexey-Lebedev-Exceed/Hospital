import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo.png';
import Home from '../Home.png';
import axios from 'axios';

const EntranceRegister = () => {
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    await axios.post('http://localhost:7000/entrance/register',{
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
        <p>Зарегистрироваться в системе</p>
      </div>
      <img src= {Home} alt= 'imageHome'/>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Регистрация</h1>
          <p>Login:</p>
          <input type= 'email' id='email' name='email'/>
          <p>Password:</p>
          <input type= 'password' id='password' name='password'/>
          <p>Repeate password:</p>
          <input type= 'password' id='repeate-password' name='repeate-password'/>
          <button>Зарегистрироваться</button>
          <Link to='/login'><p>Авторизоваться</p></Link>
        </form>
      </div>
    </div>
  );
}

export default EntranceRegister;
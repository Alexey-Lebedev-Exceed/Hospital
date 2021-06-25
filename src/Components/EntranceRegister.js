import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.png';
import Home from '../Home.png'

const EntranceRegister = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('repeate-password'));
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
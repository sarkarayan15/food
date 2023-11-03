import React,{useState} from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Cart from '../Screens/Cart';
import Model from '../Model';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky" style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li className='nav-item'>
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className='nav-item'>
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}
            </ul>
            
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-1' onClick={() => {setCartView(true)}}>
                  my cart {"  "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                {cartView ? <Model onClose={() => setCartView(false)}><Cart/></Model> : null}
                <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>logout</div>
              </div>
            }
          </div>

        </div>
      </nav>
    </div>
  )
}
import React from "react";
import NavStyles from "./Nav.module.css"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux"
import {LOGOUT} from "../../redux/const/actionsTypes"

function Nav(props) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const firstName = localStorage.getItem("firstName");
        setFirstName(firstName);
    }, [])

    const [authenticated,
        setAuthenticated] = useState(false)

    useEffect(() => {
        if (props.auth.authData) {
            setAuthenticated(true);
            setSuccess(true)

        } else {
            setAuthenticated(false)
        }
    }, [props.auth])

    function handleLogOut(e) {
        e.preventDefault()

        dispatch({type: LOGOUT})
    }
    return (
        <nav className={NavStyles.mainNav}>
            <div>
                <h3>InnFinder</h3>
            </div>
            <div>
                {authenticated ?
                
            
                <div className={NavStyles.rightSideNav}>
                <h3> Welcome Back  {firstName}</h3> 
                {/*success && <div>Welcome, {firstName}</div>*/}

                 <i class="fa-solid fa-user"></i> 
                 
                <div>
                    <span className="d-blcok">Account</span>
                    <div className={NavStyles.container2}>
                        
                         <Link className={`d-block ${NavStyles.linkBTN}`} to="/account/profile">Profile</Link>
                         <span className={NavStyles.or}>or</span>
                         <form onClick={handleLogOut}>
                         <Link className={NavStyles.linkBTN} to ="/account/login">Logout</Link>

                         </form>
                     </div>
                 
                </div>
                </div>
                 : 
                 <div className={NavStyles.rightSideNav}>
                 <i class="fa-solid fa-user"></i>
                 <div>
                     <span className="d-blcok">Account</span>
                     <div className={NavStyles.container2}>
                         <Link className={`d-block ${NavStyles.linkBTN}`} to="/account/login">Login</Link>
                         <span className={NavStyles.or}>or</span>
                         <Link className={NavStyles.linkBTN} to="account/signup">Signup</Link>
                     </div>
                 
                 </div>
             </div>
                }
              
            </div>

        </nav>
    )
}

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(Nav);

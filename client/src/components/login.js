import '../styles/login.css'


const Login = (prop)=>{

    return (        
        <div className="login-page">
            <h1 className="login-header"> CampusCuisine </h1>
            <div className='partition'></div>
            <form className='form' >
                <div >
                    <input className="user-inp" type='username' placeholder='username'  />
                </div>
               <div>
                    <input className="pass-inp" type='password' placeholder='password'  />
               </div>
               <div>
                <button className="sub-button">Login</button>
               </div>
                
            </form>
            <div className="question">Don't have an account? <a href="/MainSignup">Signup</a> </div>
        </div>
    )

}

export default Login


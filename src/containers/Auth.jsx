import React from "react";
import { Redirect } from 'react-router-dom';

export default function Auth(props) {

  const {
    user,
    signInWithGoogle,
  } = props.firebaseAuth;
  // console.log(user)
  if (user) {
    return (
      <Redirect to='/passwords' />
    )
  }
  return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-lg-4 col-md-6">
              <div className="">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title mb-3 border-bottom" style={{
                      fontSize: '24px'
                    }}>
                      Password manager
                    </h1>
                    <p>Please login or register first!</p>
                    <button 
                      className="btn btn-block btn-light mb-3" 
                      onClick={signInWithGoogle}
                      data-testid='sign-with-google'
                    > 
                      Sign in with Google
                    </button>
                  </div>
                  {/* {
                    user 
                      ? <p>Hello, {user.displayName}</p>
                      : <p>Please sign in.</p>
                  }
                  {
                    user
                      ? <button onClick={signOut}>Sign out</button>
                      : <button onClick={signInWithGoogle}>Sign in with Google</button>
                  } */}
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}

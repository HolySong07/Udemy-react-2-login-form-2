import React, { useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/authContext';
import Input from '../UI/input/Input';

// создается за основной функцией, под import
// сюда данные будут переданы автоматически
const emailReducer = (state, action) => { 
	if (action.type === "USER_INPUT") {
		return {value: action.val, isValid: action.val.includes('@')}
	}

	if (action.type === "INPUT_BLUR") {
		return {value: state.value, isValid: state.value.includes('@')}
	}
	return {value: "", isValid: false}
}


//тут проходит валидация
const passwordReducer = (state, action) => { 
	if (action.type === "USER_INPUT") {
		return {value: action.val, isValid: action.val.trim() > 6}
	}

	if (action.type === "INPUT_BLUR") {
		return {value: state.value, isValid: state.value.trim()  > 6}
	}
	return {value: "", isValid: false}
}



const Login = (props) => {
	const outhCtx = useContext(AuthContext);

  	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: false}, )
	//{value: "", isValid: false} - начальное состояние что установлено для emailState

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: false}, )

	// деструктуризация
	const {isValid: emailIsValid} = emailState;
	const {isValid: passwordIsValid} = passwordState;

	const emailInputFef = useRef();
	const passwordInputFef = useRef();

    useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
       setFormIsValid(
		emailIsValid && passwordIsValid
       );
     }, 500);

     return () => {
       console.log('CLEANUP');
      clearTimeout(identifier);
   };
   }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (e) => {
    dispatchEmail({type: "USER_INPUT", val: e.target.value}); // записываем данные с инпута при изменении value
  };

  const validateEmailHandler = () => {
	dispatchEmail({type: "INPUT_BLUR"})
  };

  

  const passwordChangeHandler = (e) => {
   
	dispatchPassword({type: "USER_INPUT", val: e.target.value}); // записываем данные с инпута при изменении value

    setFormIsValid(
		emailState.isValid && e.target.value.trim().length > 6
    );
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
  };

 


  const submitHandler = (event) => {
    event.preventDefault();
	if (formIsValid) {
		outhCtx.onLogin(emailState.value, passwordState.value);
	} else if  (!emailIsValid) {
		emailInputFef.current.focus();
	} else if (!passwordIsValid){
		passwordInputFef.current.focus();
	}
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
		<Input 
			label="E-Mail"
			id="email"
			type="email"
			ref={emailInputFef}
			isValid={emailIsValid}
			onBlur={validateEmailHandler}
			value={emailState.value}
			onChange={emailChangeHandler}
		/>

		<Input 
			label="Password"
			id="password"
			type="password"
			ref={passwordInputFef}
			isValid={passwordIsValid}
			value={passwordState.value}
			onChange={passwordChangeHandler}
			onBlur={validatePasswordHandler}
		/>

       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

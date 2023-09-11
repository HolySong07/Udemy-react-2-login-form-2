import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './components/Context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
);

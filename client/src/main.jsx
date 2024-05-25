import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistedStore } from './app/store.js'
import { Provider } from 'react-redux';
import './index.css'
import persistStore from 'redux-persist/es/persistStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <App />
      <Toaster/>
    </PersistGate>
  </Provider>
)


import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import withReduxEnhancer from 'addon-redux/enhancer'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      withReduxEnhancer
    )
  )
)

sagaMiddleware.run(rootSaga)

export default store

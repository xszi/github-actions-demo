import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { UserState } from './reducers/user'
import { SystemState } from './reducers/system'

export interface StoreState {
    user: UserState,
    system: SystemState
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store
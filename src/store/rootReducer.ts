import { combineReducers } from 'redux';
import cardsReducer from './entities/cards/reducer';

const rootReducer = combineReducers({
  cards: cardsReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;

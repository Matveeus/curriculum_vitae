import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { State } from '../store';

const useTypedSelector: TypedUseSelectorHook<State> = useSelector;

export { useTypedSelector };

import { useDispatch } from 'react-redux';
import type { Dispatch } from '../store';

const useTypedDispatch: () => Dispatch = useDispatch;

export { useTypedDispatch };

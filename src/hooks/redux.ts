import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';

/**
 * Abstract the useSelector and useDispatch hooks to avoid typing state parameter everytime
 * See docs: https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-state-type
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

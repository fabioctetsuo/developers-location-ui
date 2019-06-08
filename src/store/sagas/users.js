import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { ActionCreators as UserActions } from '../ducks/users';
import { ActionCreators as ModalActions } from '../ducks/modal';

export function* getUser({ payload: { user, cordinates } }) {
  try {
    const { data } = yield call(api.get, `/users/${user}`);
    const duplicated = yield select(state => state.users.data.find(({ id }) => id === data.id));
    if (duplicated) {
      yield put(UserActions.addUserFailure('Usuário duplicado'));
      toast.warn('Usuário duplicado', {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else {
      const userData = {
        id: data.id,
        avatar: data.avatar_url,
        name: data.name,
        login: data.login,
        cordinates,
      };
      yield put(UserActions.addUserSuccess(userData));
      toast.info('Usuário adicionado com sucesso!', {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
  } catch (e) {
    yield put(UserActions.addUserFailure('Erro ao adicionar Usuário!'));
    toast.error('Erro ao adicionar Usuário!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  } finally {
    yield put(ModalActions.hideModal());
  }
}

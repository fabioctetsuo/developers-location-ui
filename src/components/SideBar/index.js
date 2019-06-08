import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators as UserActions } from '../../store/ducks/users';

import './styles.css';

const SideBar = ({ users, removeUser }) => (
  <div className="sidebar">
    {!users.data.length && <p>Nenhum usuário adicionado</p>}
    <ul>
      {users.data.map(user => (
        <li key={user.id}>
          <div>
            <img src={user.avatar} alt="teste" />
            <div className="user-info">
              <h2>{user.name}</h2>
              <h3>{user.login}</h3>
            </div>
            <button type="button" onClick={() => removeUser(user.id)}>
              <i className="fa fa-fw fa-times-circle remove" />
            </button>
            <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-fw fa-angle-right go-to-page" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

SideBar.propTypes = {
  users: PropTypes.shape({}).isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);

import React, { Fragment } from 'react';
import AddUser from '../../components/AddUser';
import Map from '../../components/Map';
import SideBar from '../../components/SideBar';
import './styles.css';

const Main = () => (
  <Fragment>
    <Map />
    <SideBar />
    <AddUser />
  </Fragment>
);

export default Main;

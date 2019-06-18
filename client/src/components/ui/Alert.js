import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AlertStyled = styled.div`
  margin-top: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  background: #ffbc42;
  border: 2px solid #ffbc42;
  border-radius: 5px;
`;

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => <AlertStyled key={alert.id}>{alert.msg}</AlertStyled>);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

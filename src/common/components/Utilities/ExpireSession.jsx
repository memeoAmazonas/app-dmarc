import React from 'react';
import IdleTimer from 'react-idle-timer';

import { Auth } from 'aws-amplify';
import { SESSION_TIMEOUT } from 'common/constants';

const ExpireSession = ({ history, logoutUser }) => {
  const idleTimerRef = React.useRef(null);
  const onHidle = async () => {
    await Auth.signOut();
    logoutUser();
    history.push('/');
  }
  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={SESSION_TIMEOUT}
        onIdle={onHidle}
      />
    </div>
  );
};

export default ExpireSession;

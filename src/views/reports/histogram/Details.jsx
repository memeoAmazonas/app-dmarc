import React from 'react';
import Histogram from 'common/components/Histogram/Histogram';
import GetSizeWindowSize from 'common/utils/SizeWindows';

const Details = (props) => {
  const size = GetSizeWindowSize();
  const [init, setInit] = React.useState(0);
  const onClick = (t) => {
    if (t === 0) {
      if (init !== 0) {
        setInit(init - 7)
      }
    } else {
      setInit(init + 7)
    }
  }
  return (
    <div>
      {size.width}
      <button onClick={() => onClick(0)}>restar</button>
      <button onClick={() => onClick(1)}>sumar</button>
      <Histogram style={{ width: '100%', height: 400, maxWidth: 1280 }} init={init} final={init + 7} />
    </div>
  );
}

export default Details;

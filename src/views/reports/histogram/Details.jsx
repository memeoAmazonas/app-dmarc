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
  const maxs = 200000000;
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const data = () => {
    const response = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 90; i++) {
      response.push([i.toString(), getRandomInt(0, maxs), getRandomInt(0, maxs)])
    }
    return response;
  }
  return (
    <div>
      {size.width}
      <button onClick={() => onClick(0)}>restar</button>
      <button onClick={() => onClick(1)}>sumar</button>
      <Histogram style={{ width: '100%', height: 400, maxWidth: 1280 }} data={data} />
    </div>
  );
}

export default Details;

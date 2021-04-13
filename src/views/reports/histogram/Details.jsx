import React from 'react';
import Histogram from 'common/components/Histogram/Histogram';
import GetSizeWindowSize from 'common/utils/SizeWindows';
import ScrollDrag from 'common/components/Scroll/ScrollDrag';

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
  const difference = (scrollX, clientX) => ((clientX + scrollX) - clientX) > 50
  const calculate = (info) => {
    const { scrollX, clientX } = info;
    console.log(info);
    if (scrollX > 0 && init > 0 && difference(scrollX * -1, clientX)) {
      setInit(init - 7)
    }
    if (scrollX <= 0 && init <= 90) {
      setInit(init + 7)
    }
  }
  return (
    <div>
      {size.width}
      <ScrollDrag
        onMove={(info) => calculate(info)}
      >
        <Histogram
          style={{
            width: '100%', height: 400, maxWidth: 1280, cursor: ' move',
          }}
          data={data().slice(init, init + 7)}
        />
      </ScrollDrag>

    </div>
  );
}

export default Details;

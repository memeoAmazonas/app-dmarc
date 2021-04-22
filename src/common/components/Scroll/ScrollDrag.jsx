import React from 'react';

const ScrollDrag = ({ children = null, onMove = null }) => {
  const ref = React.createRef();
  const [move, setMove] = React.useState(false);
  const [info, setInfo] = React.useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  })
  const onMouseDown = (e) => {
    setMove(true);
    setInfo({
      ...info,
      isScrolling: true,
      clientX: e.clientX,
    });
  };

  const onMouseUp = () => {
    setMove(false)
    setInfo({ ...info, scrollX: 0, isScrolling: false });
  };

  const onMouseMove = (e) => {
    const { clientX, scrollX } = info;
    if (onMove) {
      onMove(info);
    }
    if (info.isScrolling) {
      ref.current.scrollLeft = scrollX + e.clientX - clientX;
      setInfo({ ...info, scrollX: scrollX + e.clientX - clientX, clientX: e.clientX });
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={move ? onMouseMove : null}
    >
      {children}
    </div>
  );
}

export default ScrollDrag;

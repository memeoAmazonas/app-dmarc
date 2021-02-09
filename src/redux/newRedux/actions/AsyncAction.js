export default (type, payload) => (dispacth) => {
  dispacth({ type, payload });
};

module.exports = function loop(func, interval) {
  let inter = setInterval(func, interval);
  return {
    stop: (_) => clearInterval(inter),
  };
};

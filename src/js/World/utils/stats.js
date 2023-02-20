import Stats from 'three/examples/jsm/libs/stats.module';

const stats = () => {
  const s = Stats();
  document.body.appendChild(s.dom);
  return s;
}

export { stats };
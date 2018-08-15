export default func => {
  try {
    func();
  } catch (err) {
    console.log(err);
  }
}

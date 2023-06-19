var lottieAnimation;

var la = {};

function lottieAnimate(e) {
  // console.log(e);
  var
    data = e.target ? $(e.target.element).data() : e,
    key = data.nitroTrigger.key;
  // console.log(e, key);
  if (!la.hasOwnProperty(key)) {
    if (CONFIG.dev) { console.log('Invalid animation key: ', key); }
    return false;
  }
  la[key].goToAndPlay(0, true);

  // e.target.destroy();
  // switch (key) {
  //   case 'tapinarofBadge':
  //     la[key].goToAndPlay(0, true);
  //     break;
  //   default:
  //     break;
  // }
}
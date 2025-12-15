document.addEventListener('DOMContentLoaded', function () {
  var iframe = document.getElementById('bannerIframe');
  var video = document.getElementById('bannerVideoLocal');
  if (!iframe) return;
  var isFile = location.protocol === 'file:';
  if (isFile) {
    iframe.style.display = 'none';
    if (video) video.style.display = 'block';
    return;
  }
  var loaded = false;
  iframe.addEventListener('load', function () { loaded = true; });
  setTimeout(function () {
    if (!loaded && video) {
      iframe.style.display = 'none';
      video.style.display = 'block';
    }
  }, 3000);
});

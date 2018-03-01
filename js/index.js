import draggability from "./draggability.js"

MobileDragDrop.polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
});

document.addEventListener('DOMContentLoaded', () => draggability(), false);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./service-worker.js')
           .then(function() {
             console.log('Service Worker Registered');
           });
  navigator.serviceWorker.onmessage = function (evt) {
    var message = JSON.parse(evt.data);

    var isRefresh = message.type === 'refresh';
    var isAsset = message.url.includes('asset');
    var lastETag = localStorage.currentETag;

    var isNew =  lastETag !== message.eTag;
    if (isRefresh && isAsset && isNew) {
      if (lastETag) {
        notice.innerHTML = "New version available. Please reload page.";
      }
      localStorage.currentETag = message.eTag;
    }
  }

  var notice = document.querySelector('#update-notice');
}

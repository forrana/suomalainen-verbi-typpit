import draggability from "./draggability.js"

MobileDragDrop.polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
});

document.addEventListener('DOMContentLoaded', () => draggability(), false);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//            .register('./service-worker.js')
//            .then(function() { console.log('Service Worker Registered'); });
// }

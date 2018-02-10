import draggability from "./draggability.js"

MobileDragDrop.polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
});

document.addEventListener('DOMContentLoaded', () => draggability(), false);

import AlarmManager from "./alarm.js"

function draggability () {
  var dragged;

  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault(); // allows us to drop
      event.stopPropagation(); // stop it here to prevent it bubble up
      event.dataTransfer.dropEffect = 'link'; // we have to set it for firefox to be happy

  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      event.preventDefault();
      event.stopPropagation(); // stop it here to prevent it bubble up

      if ( event.target.classList.contains("dropzone") ) {
          event.target.style.background = "purple";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      event.stopPropagation(); // stop it here to prevent it bubble up
      if ( event.target.classList.contains("dropzone") ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("dragexit", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      event.stopPropagation(); // stop it here to prevent it bubble up
      if ( event.target.classList.contains("dropzone") ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      event.stopPropagation(); // stop it here to prevent it bubble up
      // move dragged elem to the selected drop target

      if ( event.target.classList.contains("dropzone") ) {
          event.target.style.background = "";
          if ( event.target.getAttribute('word-type') != dragged.wordType ) {
            AlarmManager.starAlarm(event.target)
            return
          }
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
      }

  }, false);
}

export default draggability

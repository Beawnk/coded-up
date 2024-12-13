<template>
    <div>
        <slot></slot>
        <div class='console-underscore' id='console'>|</div> 
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

function consoleText(className) {
  var visible = true;
  var con = document.querySelector('#console');
  var letterCount = 1;
  var target = document.querySelector(className);
  const words = target.innerText.split(''); // Get the innerText and split it into an array of characters
  target.innerText = ''; // Clear the target text initially

  const typingInterval = window.setInterval(function() {
    if (letterCount <= words.length) {
      target.innerText = words.slice(0, letterCount).join('');
      letterCount++;
    } else {
      clearInterval(typingInterval); // Stop the interval once the text is fully written
      con.className = 'console-underscore hidden'; // Hide the underscore
    }
  }, 200);

  window.setInterval(function() {
    if (letterCount <= words.length) {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
    } else {
        clearInterval(typingInterval); // Stop the interval once the text is fully written
        con.className = 'console-underscore hidden';
    }
  }, 400);
}

onMounted(() => {
  consoleText('.target-text'); // Call the function with the class name of the target element
});
</script>

<style lang="scss">
.console-underscore {
  display: inline-block;
  position: relative;
  top: -0.14em;
  left: 2px;
  font-size: var(--title-medium);
}

.target-text {
    width: fit-content;
    display: inline-block;
}

.hidden {
  visibility: hidden;
}
</style>
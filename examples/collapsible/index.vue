<script setup lang="ts">
import { ReadMore } from '@rui/core/components/collapsible';
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <ReadMore
      class="p-5"
      :trigger-props="{
        class: 'text-hcc',
      }"
    >
      <template #default>
        <p>
          Tale of Immortal is an open-world sandbox game based on Chinese mythology and cultivation.
          You will grow to become immortal, conquer the beasts from the Classic of Mountains and
          Season, make your choices carefully and grasp your own destiny.<br />Live the mythology<br />With
          a background based around ancient Chinese myths and stories, players will have a variety
          of interactive options with scenes and in-game NPCs, which will affect the storyline of
          the game and transform the game world.<br />Become Immortal<br />The theme of the game
          combines the immortal cultivation and the unique cultural background of The Classics of
          Mountain and Sea.<br />Players will experience the journey from a mortal to a strong,
          god-like being.<br />A word from the dev team:<br />Our studio hopes that in this game,
          players will express the theme of "Always stick to your heart, dare to fight against
          difficulties; make choices carefully and grasp your own destiny."
        </p>
      </template>
    </ReadMore>
  </div>
</template>

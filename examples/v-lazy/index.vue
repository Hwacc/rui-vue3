<script lang="ts" setup></script>

<template>
  <div class="container flex items-center gap-4">
    <img
      v-lazy="'http://iph.href.lu/100x100?text=Loaded1'"
      width="100"
      height="100"
    >
    <img
      v-lazy="'http://iph.href.lu/100x100?text=Loaded2'"
      width="100"
      height="100"
      no-cache
    >
    <img
      v-lazy="{
        src: 'http://iph.href.lu/100x100?text=Loaded3',
        loading: 'http://iph.href.lu/100x100?text=Loading&bg=000088',
        error: 'http://iph.href.lu/100x100?text=Error&bg=aa0000',
      }"
      width="100"
      height="100"
    >
    <img
      v-lazy="{
        src: 'error',
        loading: 'http://iph.href.lu/100x100?text=Loading&bg=000088',
        error: 'http://iph.href.lu/100x100?text=Error&bg=aa0000',
      }"
      width="100"
      height="100"
    >
    <div
      v-lazy:background-image="{
        src: 'http://iph.href.lu/100x100?text=Loaded4',
        loading: 'http://iph.href.lu/100x100?text=Loading&bg=000088',
        error: 'http://iph.href.lu/100x100?text=Error&bg=aa0000',
      }"
      class="w-25 h-25"
    />
    <div
      v-lazy:background-image="{
        src: 'error',
        loading: 'http://iph.href.lu/100x100?text=Loading&bg=000088',
        error: 'http://iph.href.lu/100x100?text=Error&bg=aa0000',
      }"
      class="w-25 h-25"
    />
  </div>
</template>

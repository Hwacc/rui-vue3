<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/core/components/tags-input';
import { ref } from 'vue';

const modelValue = ref(['Apple', 'Banana']);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="test-block">tags: {{ modelValue }}</div>
    <TagsInput v-model="modelValue" add-on-blur>
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="Fruits..." />
    </TagsInput>
    <TagsInput v-model="modelValue" size="sm">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="Fruits..." />
    </TagsInput>
    <TagsInput v-model="modelValue" size="lg">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="Fruits..." />
    </TagsInput>
  </div>
</template>

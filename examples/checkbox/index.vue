<script lang="ts" setup>
import { Checkbox, CheckboxGroup } from '@/components/checkbox';
import { ref } from 'vue';

const checkboxState = ref(false);
const checkboxGroupState = ref(['test2']);
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">Checkbox status: {{ checkboxState ? 'checked' : 'unchecked' }}</p>
    <div class="flex gap-4 items-center">
      <Checkbox v-model="checkboxState" />
      <Checkbox v-model="checkboxState" label="Checkbox" />
      <Checkbox model-value="indeterminate" label="Indeterminate" />
      <Checkbox v-model="checkboxState" label="Disabled" disabled />
    </div>
    <p class="test-block">Checkbox Group: {{ checkboxGroupState }}</p>
    <div class="flex gap-4 items-center">
      <CheckboxGroup class="flex items-center gap-2" v-model:collection="checkboxGroupState">
        <Checkbox label="1" name="test1" />
        <Checkbox label="2" name="test2" />
        <Checkbox label="3" name="test3" />
        <Checkbox label="4" name="test4" />
        <Checkbox label="5" name="test5" />
      </CheckboxGroup>
    </div>
    <div class="flex gap-4 items-center">
      <CheckboxGroup class="flex gap-4 items-center" v-model:collection="checkboxGroupState">
        <Checkbox :primary="true" label="Primary" />
        <Checkbox label="2" name="test2" />
        <Checkbox label="3" name="test3" />
        <Checkbox label="4" name="test4" />
      </CheckboxGroup>
    </div>
  </div>
</template>

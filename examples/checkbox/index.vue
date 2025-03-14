<script lang="ts" setup>
import { Checkbox, CheckboxGroup, CheckboxGroupRoot } from '@/components/checkbox';
import { ref } from 'vue';

const checkboxState = ref(false);
const checkboxGroupState = ref<string[]>(['test4']);
const checkboxGroupTreeState = ref<string[]>(['1-1', '1-2-1', '1-2-2', '1-3']);
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">Checkbox status: {{ checkboxState ? 'checked' : 'unchecked' }}</p>
    <div class="flex gap-4 items-center">
      <Checkbox v-model:checked="checkboxState" />
      <Checkbox v-model:checked="checkboxState" label="Checkbox" />
      <Checkbox checked="indeterminate" label="Indeterminate" />
      <Checkbox v-model:checked="checkboxState" label="Disabled" disabled />
    </div>
    <p class="test-block">Checkbox Group: {{ checkboxGroupState.join(', ') }}</p>
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
        <Checkbox primary label="Primary" />
        <Checkbox label="2" name="test2" />
        <Checkbox label="3" name="test3" />
        <Checkbox label="4" name="test4" />
      </CheckboxGroup>
    </div>
    <p class="test-block">Checkbox Group Tree: {{ checkboxGroupTreeState.join(', ') }}</p>
    <div class="flex gap-4 items-center">
      <CheckboxGroupRoot v-model:collection="checkboxGroupTreeState">
        <CheckboxGroup class="flex flex-col gap-2">
          <Checkbox primary label="Check All" name="check-all" />
          <CheckboxGroup class="flex items-center gap-2">
            <Checkbox primary label="1" name="1" />
            <div>
              <Checkbox label="1-1" name="1-1" />
              <CheckboxGroup class="flex gap-2" include-primary-name>
                <Checkbox primary label="1-2" name="1-2" />
                <div class="flex flex-col gap-2">
                  <Checkbox label="1-2-1" name="1-2-1" />
                  <Checkbox label="1-2-2" name="1-2-2" />
                </div>
              </CheckboxGroup>
              <Checkbox label="1-3" name="1-3" />
            </div>
          </CheckboxGroup>
          <CheckboxGroup class="flex items-center gap-2">
            <Checkbox primary label="2" name="2" />
            <div class="flex flex-col gap-2">
              <Checkbox label="2-1" name="2-1" />
              <Checkbox label="2-2" name="2-2" />
            </div>
          </CheckboxGroup>
        </CheckboxGroup>
      </CheckboxGroupRoot>
    </div>
  </div>
</template>

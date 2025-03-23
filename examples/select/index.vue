<script setup lang="tsx">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/select';
import { ref } from 'vue';

const singleSelected = ref<string | null>(null);
const multiSelected = ref<string[]>([]);
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Select v-model="singleSelected">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem v-for="i in 50" :key="`apple-${i}`" :value="`apple-${i}`">
              {{ `Apple-${i}` }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select v-model="multiSelected" multiple>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem v-for="i in 50" :key="`apple-${i}`" :value="`apple-${i}`">
              {{ `Apple-${i}` }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

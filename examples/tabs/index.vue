<script lang="ts" setup>
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@rui/core/components/tabs'
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">
      Tabs status:
    </p>
    <div class="flex gap-4">
      <Tabs default-value="account" class="w-[400px]">
        <TabsList class="w-full">
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">
            Password
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="account">
          Account Content
        </TabsContent>
        <TabsContent value="password">
          Password Content
        </TabsContent>
      </Tabs>
      <Tabs default-value="tab10" class="w-[400px]">
        <TabsList class="w-full">
          <TabsTrigger v-for="i in 15" :key="`tab${i}`" :value="`tab${i}`">
            {{ `tab ${i}` }}
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent v-for="i in 15" :key="`tab${i}`" :value="`tab${i}`">
          <div
            class="flex items-center justify-center"
            :style="{
              height: `${(i + 1) * 10}px`,
            }"
          >
            {{ `content ${i}` }}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

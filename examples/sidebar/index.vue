<script setup lang="ts">
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger
} from '@/core/components/sidebar'
</script>

<template>
  <div class="container">
    <SidebarProvider>
      <Sidebar layout="fixed">
        App sidebar
        <SidebarTrigger>Toggle sidebar</SidebarTrigger>
      </Sidebar>
      <SidebarInset>
        App content
        <SidebarTrigger>Toggle sidebar</SidebarTrigger>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger
} from '@/core/components/sidebar'
</script>

<template>
  <div>
    <div class="container">
      <SidebarProvider>
        <Sidebar variant="sidebar" collapsible="icon">
          App sidebar
          <SidebarTrigger>Toggle sidebar</SidebarTrigger>
        </Sidebar>
        <div>
          App content
          <SidebarTrigger>Toggle sidebar</SidebarTrigger>
        </div>
      </SidebarProvider>
      <div class="container">
        <SidebarProvider>
          <Sidebar layout="fixed">
            App sidebar Fixed
            <SidebarTrigger>Toggle sidebar</SidebarTrigger>
          </Sidebar>
          <div>
            App content
            <SidebarTrigger>Toggle sidebar</SidebarTrigger>
          </div>
        </SidebarProvider>
      </div>
    </div>
  </div>
</template>

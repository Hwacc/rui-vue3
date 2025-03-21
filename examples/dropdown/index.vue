<script setup lang="tsx">
import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem
} from '@/components/dropdown-menu';
import { Plus } from 'lucide-vue-next';
import { reactive } from 'vue';

const checkboxData = reactive({
  showStatusBar: false,
  showActivityBar: true,
  showPanel: false,
});
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Open Dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button type="icon" tooltip="Add">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button> Open a Checkbox Menu </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model="checkboxData.showStatusBar">
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model="checkboxData.showActivityBar" disabled>
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model="checkboxData.showPanel">
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

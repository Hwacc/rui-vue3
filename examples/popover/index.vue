<script setup lang="tsx">
import { Button } from '@rui/core/components/button'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@rui/core/components/popover'
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Popover>
        <PopoverTrigger
          trigger="click"
          mode="mouse-only"
        >
          <Button as="div">
            Trigger
          </Button>
        </PopoverTrigger>
        <PopoverContent class="flex flex-col items-center">
          <p>popper content</p>
          <Button>Im a Button in Content</Button>
          <PopoverArrow />
        </PopoverContent>
      </Popover>

      <Popover modal>
        <PopoverTrigger
          trigger="click"
          mode="mouse-only"
        >
          <Button as="div">
            Right Trigger
          </Button>
        </PopoverTrigger>
        <PopoverContent
          class="flex flex-col items-center"
          side="bottom"
          align="start"
        >
          <p>popper content</p>
          <Button>Im a Button in Content</Button>
          <PopoverArrow />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger
          trigger="hover"
          mode="mouse-only"
        >
          <Button as="div">
            Hover Trigger
          </Button>
        </PopoverTrigger>
        <PopoverContent
          class="flex flex-col items-center"
          side="right"
          align="start"
        >
          <div>
            Hover Content
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>

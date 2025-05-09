<script setup lang="tsx">
import { Slider, type FloatingTooltipOptions } from '@rui/add-ons/components/slider';
import { Switch } from '@rui/core/components/switch';
import { Button } from '@rui/core/components/button';
import { reactive, ref } from 'vue';

const sliderState = ref(30);
const sliderSwitcherState = ref(false);
const sliderOpts = reactive<FloatingTooltipOptions>({
  placement: 'top',
  content: undefined,
  shift: {
    boundary: undefined,
  },
});
const sliderTeleportOpts = reactive<FloatingTooltipOptions>({
  placement: 'top',
  teleport: true,
  content: () => (
    <div class='flex items-center gap-2' key={new Date().getTime()}>
      <Switch v-model={sliderSwitcherState.value} />
      <span>Tooltip content</span>
    </div>
  ),
  shift: {
    boundary: undefined,
  },
});
const sliderVerticalOpts = reactive<FloatingTooltipOptions>({
  placement: 'left',
  content: undefined,
  shift: {
    boundary: undefined,
  },
});

const tSliderPropsChange = () => {
  sliderOpts.placement = 'bottom';
  sliderVerticalOpts.placement = 'right';
};
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block gap-2">
      Slider: {{ sliderState }}
      <Switch v-model="sliderSwitcherState" />
      <Button @click="tSliderPropsChange">Slider Props Change</Button>
    </p>
    <div class="w-full flex gap-4">
      <div class="flex-1 border border-hbb rounded p-2 flex flex-col gap-10">
        <div>
          <p class="pb-2">Normal Tooltip:</p>
          <Slider
            v-model="sliderState"
            tooltip="always"
            tooltip-placement="top"
          />
        </div>
        <div>
          <p class="pb-2">Floating Tooltip:</p>
          <Slider
            v-model="sliderState"
            :contained="true"
            tooltip="always"
            tooltip-placement="bottom"
            :floating-tooltip="sliderOpts"
          >
          </Slider>
        </div>
        <div>
          <p class="pb-2">Teleport Floating Tooltip With Component:</p>
          <Slider
            v-model="sliderState"
            :contained="true"
            tooltip="always"
            :floating-tooltip="sliderTeleportOpts"
          >
          </Slider>
        </div>
        <div>
          <p class="pb-2">With Custom Marks:</p>
          <Slider
            v-model="sliderState"
            :contained="true"
            tooltip="always"
            :interval="10"
            :marks="true"
            :floating-tooltip="sliderOpts"
            size="custom"
            :dotSize="20"
          >
            <template #dot>
              <div class="w-full h-full rounded-full bg-rz-green" ref="floatingReferenceRef"></div>
            </template>
            <template #mark="{ pos }">
              <div
                :class="['absolute size-2.5 rounded-full border-2 border-hbb bg-h00 z-2 top-[50%]']"
                :style="{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }"
              >
                <div></div>
              </div>
            </template>
          </Slider>
        </div>
      </div>
      <div class="flex-1 border border-hbb rounded p-2 flex flex gap-10">
        <div class="flex">
          <p class="pr-2" style="writing-mode: vertical-rl">Normal Tooltip:</p>
          <Slider
            v-model="sliderState"
            :height="200"
            :contained="true"
            direction="ttb"
            tooltip="always"
            tooltip-placement="left"
          >
          </Slider>
        </div>
        <div class="flex">
          <p class="pr-2" style="writing-mode: vertical-rl">Floating Tooltip:</p>
          <Slider
            v-model="sliderState"
            :contained="true"
            :height="200"
            direction="ttb"
            tooltip="always"
            :floating-tooltip="sliderVerticalOpts"
          >
          </Slider>
        </div>
      </div>
    </div>
  </div>
</template>

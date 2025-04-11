<script lang="ts">
export interface HotkeyProps extends PrimitiveProps {
  hotkey: string | string[]
  class?: HTMLAttributes['class']
  innerClass?: HTMLAttributes['class']
  size?: HotkeyVariants['size']
  disabled?: boolean
  readonly?: boolean
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import { Primitive, PrimitiveProps } from 'reka-ui'
import {
  computed,
  HTMLAttributes,
  nextTick,
  reactive,
  ref,
  watchEffect
} from 'vue'
import { hotkeyVariants, HotkeyVariants } from '.'
import { cn } from '@/core/lib/utils'
import { inputInnerVariants, inputVariants } from '../input'
import { CodesMap, isAssistCode, isDeleteCode, isMainCode } from './keycode'
import { isEmpty, without } from 'lodash-es'

const {
  class: propsClass,
  innerClass,
  disabled,
  readonly,
  unstyled
} = defineProps<HotkeyProps>()

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [e: Event]
  'blur': [e: Event]
}>()

const isFocus = ref(false)
const inputState = computed(() => {
  if (disabled) return 'disabled'
  if (readonly) return 'readonly'
  return isFocus.value ? 'focused' : 'blur'
})

const onFocus = (event: Event) => {
  isFocus.value = true
  emits('focus', event)
}
const onBlur = (event: Event) => {
  isFocus.value = false
  emits('blur', event)
}

const curHotkey = ref('')
const placeholder = ref<string | null>(null)

const keydownRecord = reactive({
  mainCode: '',
  assistCodes: [] as string[]
})
const judgeKeyArr = ref([] as string[])
const resultCodeArr = ref([] as string[])

const onKeydown = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const { keyCode, code, repeat } = event
  if (!repeat && isDeleteCode(code)) {
    // ESC || backspace
    // curHotkey = '';
    return false
  }
  // 消除repeat
  if (repeat) return false
  // keyCode 出现大于等于229的情况 代表该hotkey被占用, 无法识别keydown, 但是在keyup中可以捕获
  if (keyCode >= 229) return false
  // 如果记录了 mainKey return
  if (keydownRecord.mainCode === code) return false
  // 如果记录了 assist key return
  if (keydownRecord.assistCodes.some((c) => c === code)) return false

  // 记录下过滤后的 code 信息
  if (isMainCode(code)) {
    keydownRecord.mainCode = code
  } else if (isAssistCode(code)) {
    keydownRecord.assistCodes.push(code)
  }

  judgeKeyArr.value = [...judgeKeyArr.value, code]

  // 处理输入框显示
  handleSelectionArchor()
  placeholder.value = null
  const assistStr = keydownRecord.assistCodes.reduce((acc, c) => {
    return acc === '' ? CodesMap[c].name : acc + ' + ' + CodesMap[c].name
  }, '')

  curHotkey.value = keydownRecord.mainCode
    ? `${
        isEmpty(assistStr)
          ? CodesMap[keydownRecord.mainCode].name
          : `${assistStr} + ${CodesMap[keydownRecord.mainCode].name}`
      }`
    : assistStr

  console.log('----keydown----curHotkey', curHotkey.value)
}

const keyupSet = ref<Set<string>>(new Set())
const onKeyUp = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const { code } = event

  if (isDeleteCode(code)) {
    // ESC || backspace
    handleResetData()
    // this.$emit('on-cancel', [], 'ESC');
    return false
  }

  // 因为热键冲突的原因, keydown无法捕获到主键(mainCode), 但在keyup中可以捕获到
  // 所以记录一份keyup set用于补充主键
  keyupSet.value.add(code)

  // 依次清空judge array, 从而触发watch
  if (judgeKeyArr.value.indexOf(code) > -1) {
    judgeKeyArr.value.splice(judgeKeyArr.value.indexOf(code), 1)
  }
  return false
}

/**
 * 将光标移至最后
 */
const handleSelectionArchor = () => {
  nextTick(() => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    // @ts-ignore
    range?.setStart(range.startContainer, range.startContainer.length)
    // @ts-ignore
    range?.setEnd(range.startContainer, range.startContainer.length)
    selection?.removeAllRanges()
    range && selection?.addRange(range)
  })
}

const handleResetData = () => {
  keydownRecord.mainCode = ''
  keydownRecord.assistCodes = []
  keyupSet.value.clear()
  judgeKeyArr.value = []
  resultCodeArr.value = []
}

watchEffect(() => {
  if (judgeKeyArr.value.length === 0 && inputState.value === 'focused') {
    console.log('----keydown----watchEffect', curHotkey.value)
    // keydown未捕获到maincode
    if (!keydownRecord.mainCode) {
      // 在keyup Set中找一个主键
      let keyupMainCode = null
      keyupSet.value.forEach((c) => {
        isMainCode(c) && (keyupMainCode = c)
      })
      // 仍然没找到主键, 还原设置
      if (!keyupMainCode) {
        // curHotkey.value = this.hotkey
        keydownRecord.mainCode = ''
        keydownRecord.assistCodes = []
        keyupSet.value.clear()
        return
      }
      // 否则, 重新记录keydown中的mainCode
      keydownRecord.mainCode = keyupMainCode
    }

    resultCodeArr.value = []
    if (isEmpty(keydownRecord.assistCodes)) {
      // keydown未捕获assistCode, 给一个默认值
      resultCodeArr.value = keydownRecord.assistCodes = [
        'ControlLeft',
        'ShiftLeft'
      ]
    } else {
      // 如果有, 需要重排 assist code 顺序
      if (
        keydownRecord.assistCodes.indexOf('ControlLeft') > -1 ||
        keydownRecord.assistCodes.indexOf('ControlRight') > -1
      ) {
        resultCodeArr.value.push('ControlLeft')
      }
      if (
        keydownRecord.assistCodes.indexOf('AltLeft') > -1 ||
        keydownRecord.assistCodes.indexOf('AltRight') > -1
      ) {
        resultCodeArr.value.push('AltLeft')
      }
      if (
        keydownRecord.assistCodes.indexOf('ShiftLeft') > -1 ||
        keydownRecord.assistCodes.indexOf('ShiftRight') > -1
      ) {
        resultCodeArr.value.push('ShiftLeft')
      }
      resultCodeArr.value = resultCodeArr.value.concat(
        without(
          keydownRecord.assistCodes,
          'ControlLeft',
          'ControlRight',
          'AltLeft',
          'AltRight',
          'ShiftLeft',
          'ShiftRight'
        )
      )
    }
    resultCodeArr.value.push(keydownRecord.mainCode)
    console.log('----result code', resultCodeArr.value)
    // this.$emit('on-change', this.keyArr, this.hotkeyName)
    // this.handleClickOutside()
  }
})

const classNames = computed(() => {
  return cn(
    inputVariants({ unstyled }),
    hotkeyVariants({ unstyled }),
    propsClass
  )
})
const innerClassName = computed(() => {
  return cn(inputInnerVariants({ unstyled }), innerClass)
})
</script>

<template>
  <Primitive :class="classNames" :data-state="inputState">
    <span
      ref="hotkeySpan"
      :class="innerClassName"
      :contenteditable="!disabled"
      :spellcheck="false"
      :data-state="inputState"
      :readonly="readonly ? true : undefined"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      @keyup="onKeyUp"
    >
      {{ curHotkey }}
    </span>
  </Primitive>
</template>

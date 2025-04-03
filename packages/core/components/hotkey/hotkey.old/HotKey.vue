<!--
 * @Author: razer.hua
 * @Date: 2019-10-21 16:32:42
 * @Description:
 -->
<template>
  <div :class="wrapCls" :disabled="disabled">
    <div v-click-outside="handleClickOutside" :class="contentCls" @click="handleClick">
      <span
        ref="hotkeySpan"
        :key="inputTimespan"
        v-title.click="curHotkey"
        :class="[`${prefix}-span`, { placeholder: !isEmpty(placeholder) }]"
        :contenteditable="!disabled"
        :spellcheck="false"
        @keydown="handleOnKeyDown"
        @keyup="handleOnKeyUp"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @input="handleOnInput"
      >
        {{ contentText }}
      </span>
    </div>
    <!-- <input
      :ref="`keyInput${randomTip}`"
      :disabled="disabled"
      @keydown="handleOnKeyDown"
      @keyup="handleOnKeyUp"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    /> -->
  </div>
</template>

<script>
import 'styles/components/hotkey.scss';
import { directive as clickOutside } from 'v-click-outside-x';
import { CodesMap, isDeleteCode, isAssistCode, isMainCode } from './keycode';
import isEmpty from 'lodash/isEmpty';
import without from 'lodash/without';

const prefix = 'hotkey';

export default {
  name: 'HotKey',
  directives: { clickOutside },
  props: {
    hotkey: {
      type: String | Array,
      default: 'Hotkey has not been set'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let placeholder = null;
    let curHotkey = '';
    if (isEmpty(this.hotkey)) {
      placeholder = this.$t('common_hotkey_not_set');
    } else {
      curHotkey = this.hotkey;
    }
    return {
      /**
       * 记录keydown, 不会记录重复的keydown值
       */
      keyDownObj: {
        mainCode: null,
        assistCodes: []
      },
      /**
       * 记录keyup, keyup是无序的只需要排重, 做二次验证和补充keydown中没有获取到的keycode
       */
      keyUpSet: new Set(),
      /**
       * 记录keydown, 同时在keyup中splice每个keydown的code, 当该数组为空时, 代表全部keyup事件完成
       * 存在keydown未记录而keyup有记录的code, 所以该数组只用于判断全部keyup是否触发
       */
      judgeKeyArr: [],
      /**
       * 处理keyDownArr和keyUpSet合并后的返回值
       */
      resultCodeArr: [],

      curHotkey,
      focused: false,
      placeholder,
      errorMessageRemover: null,
      IMELocked: false,
      inputTimespan: new Date().getTime() // 通过改变key的值强制刷新span节点
    };
  },

  computed: {
    prefix() {
      return prefix;
    },
    isEmpty() {
      return isEmpty;
    },
    wrapCls() {
      return [`${prefix}-wrap`];
    },
    contentCls() {
      return [prefix, { focus: this.focused }];
    },
    keyArr() {
      return this.resultCodeArr.map((_code) => {
        return {
          keyCode: CodesMap[_code].keyCode,
          keyName: CodesMap[_code].name
        };
      });
    },
    hotkeyName() {
      return this.keyArr.reduce((acc, item) => {
        return acc === '' ? item.keyName : acc + ' + ' + item.keyName;
      }, '');
    },
    contentText() {
      return this.placeholder || this.curHotkey;
    }
  },

  watch: {
    hotkey(val) {
      if (typeof val === 'string') {
        this.curHotkey = val;
      } else {
        this.curHotkey = val
          .map((item) => {
            let name = '';
            for (const _code of CodesMap) {
              if (_code.keyCode === item) {
                name = _code.name;
                break;
              }
            }
            return name;
          })
          .join(' + ');
      }
      if (val.length > 0) {
        this.placeholder = null;
      } else {
        this.placeholder = this.focused
          ? this.$t('common_press_hotkey')
          : this.$t('common_hotkey_not_set');
      }
    },

    judgeKeyArr(arr) {
      // 所有按键up
      if (arr.length === 0 && this.focused) {
        if (this.IMELocked) {
          // 如果IME是输入状态 直接返回
          this.IMELocked = false;
          return;
        }
        // keydown未捕获到maincode
        if (!this.keyDownObj.mainCode) {
          // 在keyup Set中找一个主键
          let keyupMainCode = null;
          this.keyUpSet.forEach((_code) => {
            isMainCode(_code) && (keyupMainCode = _code);
          });

          // 仍然没找到主键, 还原设置
          if (!keyupMainCode) {
            this.curHotkey = this.hotkey;
            this.keyDownObj = { mainCode: null, assistCodes: [] };
            this.keyUpSet.clear();
            return;
          }

          // 否则, 重新记录keydown中的mainCode
          this.keyDownObj.mainCode = keyupMainCode;
        }

        this.resultCodeArr = [];
        if (isEmpty(this.keyDownObj.assistCodes)) {
          // keydown未捕获assistCode, 给一个默认值
          this.resultCodeArr = this.keyDownObj.assistCodes = ['ControlLeft', 'ShiftLeft'];
        } else {
          // 如果有, 需要重排 assist code 顺序
          if (
            this.keyDownObj.assistCodes.indexOf('ControlLeft') > -1 ||
            this.keyDownObj.assistCodes.indexOf('ControlRight') > -1
          ) {
            this.resultCodeArr.push('ControlLeft');
          }
          if (
            this.keyDownObj.assistCodes.indexOf('AltLeft') > -1 ||
            this.keyDownObj.assistCodes.indexOf('AltRight') > -1
          ) {
            this.resultCodeArr.push('AltLeft');
          }
          if (
            this.keyDownObj.assistCodes.indexOf('ShiftLeft') > -1 ||
            this.keyDownObj.assistCodes.indexOf('ShiftRight') > -1
          ) {
            this.resultCodeArr.push('ShiftLeft');
          }
          this.resultCodeArr = this.resultCodeArr.concat(
            without(
              this.keyDownObj.assistCodes,
              'ControlLeft',
              'ControlRight',
              'AltLeft',
              'AltRight',
              'ShiftLeft',
              'ShiftRight'
            )
          );
        }
        this.resultCodeArr.push(this.keyDownObj.mainCode);
        this.$emit('on-change', this.keyArr, this.hotkeyName);
        this.handleClickOutside();
      }
    }
  },

  methods: {
    handleResetData() {
      this.keyDownObj = { mainCode: null, assistCodes: [] };
      this.keyUpSet.clear();
      this.judgeKeyArr = [];
      this.resultCodeArr = [];
    },

    handleClick(e) {
      if (this.disabled) return;
      if (isEmpty(this.hotkey)) {
        this.placeholder = this.$t('common_press_hotkey');
      }
      this.$refs.hotkeySpan.focus();
      this.focused = true;
      this.handleSelectionArchor();
      this.handleResetData();
      this.$emit('on-focus');
    },

    handleClickOutside() {
      if (isEmpty(this.hotkey)) {
        this.placeholder = this.$t('common_hotkey_not_set');
        this.curHotkey = '';
      } else {
        this.placeholder = null;
        this.curHotkey = this.hotkey;
      }
      this.$refs.hotkeySpan.blur();
      this.focused = false;
      this.handleResetData();
      this.$emit('on-blur');
    },

    handleOnInput(e) {
      this.IMELocked = true;
      this.inputTimespan = new Date().getTime();
      this.handleClickOutside();
      this.$Message.closeAll();
      this.$Message.error(this.$t('common_hotkey_do_not_use_ime'));
      return false;
    },

    handleOnKeyDown(e) {
      e.preventDefault();
      e.stopPropagation();
      const { key, keyCode, code, repeat } = e;
      if (!repeat && isDeleteCode(code)) {
        // ESC || backspace
        this.curHotkey = '';
        return false;
      }
      // 消除repeat
      if (repeat) return false;
      // keyCode 出现大于等于229的情况 代表该hotkey被占用, 无法识别keydown, 但是在keyup中可以捕获
      if (keyCode >= 229) return false;
      // 如果记录了 mainKey return
      if (this.keyDownObj.mainCode === code) return false;
      // 如果记录了 assist key return
      if (this.keyDownObj.assistCodes.some((_code) => _code === code)) return false;

      // 记录下过滤后的 code 信息
      if (isMainCode(code)) {
        this.keyDownObj.mainCode = code;
      } else if (isAssistCode(code)) {
        this.keyDownObj.assistCodes.push(code);
      }

      // 这里用一个Array来记录下过滤后keydown的code,
      // 对应的, 在keyup后会校验这个数组, 用来判断此次的按键组合是否合法
      this.judgeKeyArr.push(code);

      // 处理输入框显示
      this.handleSelectionArchor();
      this.placeholder = null;

      const assistStr = this.keyDownObj.assistCodes.reduce((acc, _code) => {
        return acc === '' ? CodesMap[_code].name : acc + ' + ' + CodesMap[_code].name;
      }, '');

      this.curHotkey = this.keyDownObj.mainCode
        ? `${
            isEmpty(assistStr)
              ? CodesMap[this.keyDownObj.mainCode].name
              : `${assistStr} + ${CodesMap[this.keyDownObj.mainCode].name}`
          }`
        : assistStr;
      console.log('----keydown----curHotkey', this.curHotkey);
    },

    handleOnKeyUp(e) {
      e.preventDefault();
      e.stopPropagation();

      const { code } = e;

      if (isDeleteCode(code)) {
        // ESC || backspace
        this.handleResetData();
        this.$emit('on-cancel', [], 'ESC');
        return false;
      }

      // 因为热键冲突的原因, keydown无法捕获到主键(mainCode), 但在keyup中可以捕获到
      // 所以记录一份keyup set用于补充主键
      this.keyUpSet.add(code);

      // 依次清空judge array, 从而触发watch
      if (this.judgeKeyArr.indexOf(code) > -1) {
        this.judgeKeyArr.splice(this.judgeKeyArr.indexOf(code), 1);
      }
      return false;
    },

    /**
     * 将光标移至最后
     */
    handleSelectionArchor() {
      this.$nextTick(() => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.setStart(range.startContainer, range.startContainer.length);
        range.setEnd(range.startContainer, range.startContainer.length);
        selection.removeAllRanges();
        selection.addRange(range);
      });
    },

    handleInputFocus(e) {
      /** 关闭热键触发功能，防止修改热键时触发已经注册过的热键 */
      this.$store.dispatch('setEnableHotkeyEvent', false);
      return true;
    },
    handleInputBlur(e) {
      /** 开启热键触发功能 */
      this.$store.dispatch('setEnableHotkeyEvent', true);
      return true;
    }
  }
};
</script>

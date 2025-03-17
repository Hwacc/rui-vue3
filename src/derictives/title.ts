import { DirectiveBinding } from 'vue';
import { computePosition, flip, shift, offset, hide } from '@floating-ui/vue';
import { cva } from 'class-variance-authority';

const titleTipVariants = cva(
  [
    'fixed',
    'text-xs',
    'px-[.25rem]',
    'py-[.125rem]',
    'rounded',
    'break-words',
    'border',
    'z-9999',
  ],
  {
    variants: {
      theme: {
        default: ['bg-hee', 'text-black', 'border-black', 'max-w-[31.25rem]'],
        dark: ['bg-h44', 'text-hee', 'border-none'],
      },
      hidden: {
        true: 'hidden',
      },
      visible: {
        true: 'visible animate-fade animate-duration-200',
        false: 'invisible',
      },
      size: {
        big: ['px-[.5rem]', 'py-[.3125rem]'],
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
);

class TitleTooltip {
  titleTipNode: HTMLDivElement;
  titleTipTextNode: Text;
  showTimer: number = 0;

  constructor() {
    this.titleTipNode = document.createElement('div');
    this.titleTipNode.className = titleTipVariants();
    this.titleTipTextNode = document.createTextNode('');
    this.titleTipNode.appendChild(this.titleTipTextNode);
    document.body.appendChild(this.titleTipNode);
    document.addEventListener('scroll', () => {
      if (this.showTimer) {
        this.onMouseLeave();
      }
    });
  }

  async onMouseEnter(el: Element, binding: DirectiveBinding) {
    this.showTimer && clearTimeout(this.showTimer);
    this.showTimer = setTimeout(async () => {
      try {
        this.titleTipNode.removeChild(this.titleTipTextNode);
        this.titleTipTextNode = document.createTextNode(binding.value);
        this.titleTipNode.appendChild(this.titleTipTextNode);
        const getClassName = (hidden: boolean = false, visible: boolean = false) => {
          return titleTipVariants({
            theme: (binding.arg as 'default' | 'dark') || 'default',
            size: binding.modifiers.big ? 'big' : undefined,
            hidden,
            visible,
          });
        };
        this.titleTipNode.className = getClassName(false);
        const { x, y, middlewareData } = await computePosition(el, this.titleTipNode, {
          placement: 'bottom',
          middleware: [flip(), shift(), offset(4), hide()],
        });
        if (!middlewareData.hide?.referenceHidden) {
          Object.assign(this.titleTipNode.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
          this.titleTipNode.className = getClassName(false, true);
        } else {
          this.titleTipNode.className = getClassName(true);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500) as unknown as number;
  }
  
  onMouseLeave() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = 0;
    }
    this.titleTipNode.className = titleTipVariants({
      visible: false,
      hidden: true,
    });
  }
}

let instance: TitleTooltip;
if (window) {
  instance = new TitleTooltip();
}

export const vTitle = (el: Element, binding: DirectiveBinding) => {
  el.addEventListener('mouseenter', () => instance.onMouseEnter(el, binding));
  el.addEventListener('mouseleave', () => instance.onMouseLeave());
};

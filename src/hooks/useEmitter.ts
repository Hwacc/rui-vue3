import { createContext } from 'radix-vue';
import { getCurrentInstance } from 'vue';

export const useEmitter = () => {
  const [injectEmitterContext, provideEmitterContext] = createContext('EmitterContext');

  const broadcast = (componentName: string, event: string, payload?: any) => {
    const instance = getCurrentInstance();

    if (instance) {
      instance.children.forEach((child: any) => {
        if (child.type.name === componentName) {
          child.emit(event, payload);
        }
      })
    }

  }
  // provideEmitterContext({
  //   dispatch: (componentName: string) => {
  //   },
  //   broadcast: (event: string, data?: any) => {
  //     window.dispatchEvent(new CustomEvent(event, { detail: data }));
  //   },
  // })

  return {
    broadcast,
    dispatch,
  };
};

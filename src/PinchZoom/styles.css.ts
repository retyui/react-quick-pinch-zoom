import { Props } from './types';

export const styleRoot = 'kvfysmfp';
export const styleChild = 'ufhsfnkm';

export const styles = ({ overflow }: Pick<Props, 'overflow'>) =>
  `.${styleRoot}{overflow:${
    overflow ? 'visible' : 'hidden'
  };touch-action:none}.${styleChild}{transform-origin: 0 0}`;

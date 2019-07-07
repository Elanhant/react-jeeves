import { ScrollableBoxProps } from '../components/ScrollableBox';

export default function useDefaultLipClassNames(): Pick<
  ScrollableBoxProps,
  'topLipClassName' | 'bottomLipClassName'
> {
  return {
    topLipClassName: (visible: boolean) => getLipClassName('top', visible),
    bottomLipClassName: (visible: boolean) =>
      getLipClassName('bottom', visible),
  };
}

function getLipClassName(position: 'top' | 'bottom', visible: boolean): string {
  return concatClassNames([
    'react-scrollable-box__lip',
    `react-scrollable-box__lip--${position === 'top' ? 'top' : 'bottom'}`,
    visible && 'react-scrollable-box__lip--visible',
  ]);
}

type ClassName = string | false | null | undefined;

function concatClassNames(classNames: ClassName[]): string {
  return classNames.filter(isValid).join(' ');
}

function isValid(className: ClassName): boolean {
  return !!className;
}

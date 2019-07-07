import { ScrollableBoxProps } from '../components/ScrollableBox';

export default function useDefaultLipClassNames(): Pick<
  ScrollableBoxProps,
  'topLipClassName' | 'bottomLipClassName'
> {
  return {
    topLipClassName: (hasOverflow: boolean) =>
      getLipClassName('top', hasOverflow),
    bottomLipClassName: (hasOverflow: boolean) =>
      getLipClassName('bottom', hasOverflow),
  };
}

function getLipClassName(
  position: 'top' | 'bottom',
  hasOverflow: boolean,
): string {
  return concatClassNames([
    'react-scrollable-box__lip',
    `react-scrollable-box__lip--${position === 'top' ? 'top' : 'bottom'}`,
    hasOverflow && 'react-scrollable-box__lip--hasOverflow',
  ]);
}

type ClassName = string | false | null | undefined;

function concatClassNames(classNames: ClassName[]): string {
  return classNames.filter(isValid).join(' ');
}

function isValid(className: ClassName): boolean {
  return !!className;
}

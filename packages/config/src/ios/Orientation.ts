import { ConfigPlugin, ExpoConfig } from '../Config.types';
import { withInfoPlist } from '../plugins/withPlist';
import { InfoPlist, InterfaceOrientation } from './IosConfig.types';

export function getOrientation(config: ExpoConfig) {
  if (config.orientation) {
    return config.orientation;
  }

  return null;
}

export const PORTRAIT_ORIENTATIONS: InterfaceOrientation[] = [
  'UIInterfaceOrientationPortrait',
  'UIInterfaceOrientationPortraitUpsideDown',
];

export const LANDSCAPE_ORIENTATIONS: InterfaceOrientation[] = [
  'UIInterfaceOrientationLandscapeLeft',
  'UIInterfaceOrientationLandscapeRight',
];

function getUISupportedInterfaceOrientations(orientation: string | null): InterfaceOrientation[] {
  if (orientation === 'portrait') {
    return PORTRAIT_ORIENTATIONS;
  } else if (orientation === 'landscape') {
    return LANDSCAPE_ORIENTATIONS;
  } else {
    return [...PORTRAIT_ORIENTATIONS, ...LANDSCAPE_ORIENTATIONS];
  }
}

export const withOrientation: ConfigPlugin = config => withInfoPlist(config, setOrientation);

export function setOrientation(
  config: ExpoConfig,
  { UISupportedInterfaceOrientations, ...infoPlist }: InfoPlist
): InfoPlist {
  const orientation = getOrientation(config);

  return {
    ...infoPlist,
    UISupportedInterfaceOrientations: getUISupportedInterfaceOrientations(orientation),
  };
}
